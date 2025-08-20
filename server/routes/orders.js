import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Influencer from '../models/Influencer.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      contactInfo,
      paymentMethod,
      referralCode
    } = req.body;

    let subtotal = 0;
    let deliveryFee = 0;
    let influencer = null;
    let commissionAmount = 0;

    // Validate and calculate order totals
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`
        });
      }

      if (product.stock.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      deliveryFee += product.delivery.fee || 0;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });

      // Update product stock
      product.stock.quantity -= item.quantity;
      product.sales.totalSold += item.quantity;
      product.sales.revenue += itemTotal;
      await product.save();
    }

    // Handle referral code
    if (referralCode) {
      influencer = await Influencer.findOne({
        referralCode,
        status: 'approved'
      });

      if (influencer) {
        commissionAmount = (subtotal * influencer.commissionRate) / 100;
      }
    }

    const totalAmount = subtotal + deliveryFee;

    // Create order
    const order = await Order.create({
      buyer: req.user._id,
      seller: orderItems[0].product.seller, // Assuming single seller for now
      items: orderItems,
      subtotal,
      deliveryFee,
      totalAmount,
      influencer: influencer?._id,
      referralCode,
      commissionAmount,
      deliveryAddress,
      contactInfo,
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending'
      }
    });

    // Update influencer metrics if applicable
    if (influencer) {
      const commission = influencer.updateMetrics(subtotal, true);
      await influencer.save();
    }

    await order.populate([
      { path: 'items.product', select: 'name price images' },
      { path: 'buyer', select: 'firstName lastName email phone' },
      { path: 'seller', select: 'firstName lastName phone' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { buyer: req.user._id };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('items.product', 'name price images')
      .populate('seller', 'firstName lastName phone')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name price images')
      .populate('buyer', 'firstName lastName email phone')
      .populate('seller', 'firstName lastName phone')
      .populate('influencer', 'referralCode user');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user is authorized to view this order
    if (order.buyer._id.toString() !== req.user._id.toString() && 
        order.seller._id.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Seller/Admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (order.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    // Update status
    order.status = status;
    
    // Add to status history
    order.statusHistory.push({
      status,
      note,
      updatedBy: req.user._id,
      timestamp: new Date()
    });

    // Handle specific status updates
    if (status === 'delivered') {
      order.delivery.actualDate = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (order.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Update order
    order.status = 'cancelled';
    order.cancellation = {
      reason,
      cancelledBy: req.user._id,
      cancelledAt: new Date()
    };

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          'stock.quantity': item.quantity,
          'sales.totalSold': -item.quantity,
          'sales.revenue': -item.total
        }
      });
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
