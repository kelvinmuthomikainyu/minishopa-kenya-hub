import express from 'express';
import Influencer from '../models/Influencer.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Apply to become an influencer
// @route   POST /api/influencers/apply
// @access  Public
router.post('/apply', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      socialPlatform,
      followersCount,
      contentNiche,
      experience
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user account
      const [firstName, ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ') || firstName;
      
      user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: Math.random().toString(36).substring(2, 15), // Temporary password
        role: 'buyer'
      });
    }

    // Check if user already has influencer application
    const existingInfluencer = await Influencer.findOne({ user: user._id });
    
    if (existingInfluencer) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to become an influencer'
      });
    }

    // Create influencer application
    const influencer = await Influencer.create({
      user: user._id,
      socialMedia: {
        primaryPlatform: socialPlatform,
        followersCount
      },
      contentNiche,
      experience,
      status: 'pending'
    });

    await influencer.populate('user', 'firstName lastName email phone');

    res.status(201).json({
      success: true,
      message: 'Influencer application submitted successfully',
      data: { influencer }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get influencer dashboard data
// @route   GET /api/influencers/dashboard
// @access  Private (Influencer)
router.get('/dashboard', protect, async (req, res) => {
  try {
    const influencer = await Influencer.findOne({ user: req.user._id })
      .populate('user', 'firstName lastName email');

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: 'Influencer profile not found'
      });
    }

    if (influencer.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'Influencer account not approved yet'
      });
    }

    // Get recent orders with this influencer's referral code
    const recentOrders = await Order.find({
      influencer: influencer._id,
      status: { $in: ['delivered', 'completed'] }
    })
      .populate('items.product', 'name price')
      .populate('buyer', 'firstName lastName')
      .sort('-createdAt')
      .limit(10);

    // Calculate current month stats
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const currentMonthOrders = await Order.find({
      influencer: influencer._id,
      createdAt: { $gte: currentMonth },
      status: { $in: ['delivered', 'completed'] }
    });

    const currentMonthStats = {
      sales: currentMonthOrders.length,
      earnings: currentMonthOrders.reduce((total, order) => total + order.commissionAmount, 0)
    };

    res.json({
      success: true,
      data: {
        influencer,
        recentOrders,
        currentMonthStats,
        metrics: influencer.metrics
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Track referral click
// @route   POST /api/influencers/track-click/:referralCode
// @access  Public
router.post('/track-click/:referralCode', async (req, res) => {
  try {
    const influencer = await Influencer.findOne({
      referralCode: req.params.referralCode,
      status: 'approved'
    });

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: 'Invalid referral code'
      });
    }

    // Track the click
    influencer.trackClick();
    await influencer.save();

    res.json({
      success: true,
      message: 'Click tracked successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get all influencer applications (Admin)
// @route   GET /api/influencers/applications
// @access  Private (Admin)
router.get('/applications', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const influencers = await Influencer.find(query)
      .populate('user', 'firstName lastName email phone')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Influencer.countDocuments(query);

    res.json({
      success: true,
      data: {
        influencers,
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

// @desc    Approve/Reject influencer application
// @route   PUT /api/influencers/:id/status
// @access  Private (Admin)
router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be approved or rejected'
      });
    }

    const updateData = { status };
    
    if (status === 'approved') {
      updateData.approvalDate = new Date();
    } else if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const influencer = await Influencer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'firstName lastName email');

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: 'Influencer not found'
      });
    }

    res.json({
      success: true,
      message: `Influencer application ${status}`,
      data: { influencer }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get influencer by referral code
// @route   GET /api/influencers/referral/:code
// @access  Public
router.get('/referral/:code', async (req, res) => {
  try {
    const influencer = await Influencer.findOne({
      referralCode: req.params.code,
      status: 'approved'
    }).populate('user', 'firstName lastName');

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: 'Invalid referral code'
      });
    }

    res.json({
      success: true,
      data: {
        influencer: {
          id: influencer._id,
          referralCode: influencer.referralCode,
          name: influencer.user.fullName,
          commissionRate: influencer.commissionRate
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

export default router;
