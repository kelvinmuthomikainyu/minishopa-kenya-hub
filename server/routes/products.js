import express from 'express';
import Product from '../models/Product.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      location,
      minPrice,
      maxPrice,
      search,
      sort = '-createdAt',
      isOrganic,
      isFeatured
    } = req.query;

    // Build query
    const query = { status: 'active' };

    if (category) query.category = category;
    if (location) {
      query.$or = [
        { 'location.county': new RegExp(location, 'i') },
        { 'location.town': new RegExp(location, 'i') }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }
    if (isOrganic === 'true') query.isOrganic = true;
    if (isFeatured === 'true') query.isFeatured = true;

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('seller', 'firstName lastName location')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
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

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('seller', 'firstName lastName phone location avatar');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Seller/Admin)
router.post('/', protect, authorize('seller', 'admin'), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      seller: req.user._id
    };

    const product = await Product.create(productData);
    await product.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Owner/Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership or admin role
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('category', 'name slug');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Owner/Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership or admin role
    if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get products by seller
// @route   GET /api/products/seller/:sellerId
// @access  Public
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    const products = await Product.find({
      seller: req.params.sellerId,
      status: 'active'
    })
      .populate('category', 'name slug')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments({
      seller: req.params.sellerId,
      status: 'active'
    });

    res.json({
      success: true,
      data: {
        products,
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

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({
      isFeatured: true,
      status: 'active'
    })
      .populate('category', 'name slug')
      .populate('seller', 'firstName lastName location')
      .sort('-createdAt')
      .limit(Number(limit));

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
