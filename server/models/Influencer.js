import mongoose from 'mongoose';

const influencerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  referralCode: {
    type: String,
    unique: true,
    required: [true, 'Referral code is required']
  },
  socialMedia: {
    primaryPlatform: {
      type: String,
      enum: ['instagram', 'facebook', 'twitter', 'youtube', 'tiktok'],
      required: [true, 'Primary platform is required']
    },
    username: String,
    profileUrl: String,
    followersCount: {
      type: String,
      enum: ['1k-5k', '5k-10k', '10k-50k', '50k-100k', '100k+'],
      required: [true, 'Followers count range is required']
    }
  },
  contentNiche: {
    type: String,
    enum: ['lifestyle', 'food', 'health', 'business', 'family', 'agriculture', 'general'],
    required: [true, 'Content niche is required']
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'experienced', 'professional']
  },
  commissionRate: {
    type: Number,
    default: 15, // 15% commission
    min: 0,
    max: 50
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  approvalDate: Date,
  rejectionReason: String,
  
  // Performance metrics
  metrics: {
    totalEarnings: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    },
    totalClicks: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    }
  },
  
  // Monthly performance tracking
  monthlyStats: [{
    month: {
      type: Date,
      required: true
    },
    earnings: {
      type: Number,
      default: 0
    },
    sales: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    newCustomers: {
      type: Number,
      default: 0
    }
  }],
  
  // Payment information
  paymentInfo: {
    method: {
      type: String,
      enum: ['mpesa', 'bank_transfer'],
      default: 'mpesa'
    },
    mpesaNumber: String,
    bankDetails: {
      bankName: String,
      accountNumber: String,
      accountName: String
    }
  },
  
  // Payout tracking
  payouts: [{
    amount: {
      type: Number,
      required: true
    },
    period: {
      from: Date,
      to: Date
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    processedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for current month earnings
influencerSchema.virtual('currentMonthEarnings').get(function() {
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);
  
  const monthStat = this.monthlyStats.find(stat => 
    stat.month.getTime() === currentMonth.getTime()
  );
  
  return monthStat ? monthStat.earnings : 0;
});

// Generate unique referral code
influencerSchema.pre('save', function(next) {
  if (this.isNew && !this.referralCode) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    this.referralCode = `MSA-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

// Update metrics method
influencerSchema.methods.updateMetrics = function(saleAmount, isNewCustomer = false) {
  const commission = (saleAmount * this.commissionRate) / 100;
  
  this.metrics.totalEarnings += commission;
  this.metrics.totalSales += 1;
  this.metrics.averageOrderValue = this.metrics.totalEarnings / this.metrics.totalSales;
  
  if (this.metrics.totalClicks > 0) {
    this.metrics.conversionRate = (this.metrics.totalSales / this.metrics.totalClicks) * 100;
  }
  
  // Update monthly stats
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);
  
  let monthStat = this.monthlyStats.find(stat => 
    stat.month.getTime() === currentMonth.getTime()
  );
  
  if (!monthStat) {
    monthStat = {
      month: currentMonth,
      earnings: 0,
      sales: 0,
      clicks: 0,
      newCustomers: 0
    };
    this.monthlyStats.push(monthStat);
  }
  
  monthStat.earnings += commission;
  monthStat.sales += 1;
  if (isNewCustomer) {
    monthStat.newCustomers += 1;
  }
  
  return commission;
};

// Track click method
influencerSchema.methods.trackClick = function() {
  this.metrics.totalClicks += 1;
  
  if (this.metrics.totalSales > 0) {
    this.metrics.conversionRate = (this.metrics.totalSales / this.metrics.totalClicks) * 100;
  }
  
  // Update monthly clicks
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);
  
  let monthStat = this.monthlyStats.find(stat => 
    stat.month.getTime() === currentMonth.getTime()
  );
  
  if (!monthStat) {
    monthStat = {
      month: currentMonth,
      earnings: 0,
      sales: 0,
      clicks: 0,
      newCustomers: 0
    };
    this.monthlyStats.push(monthStat);
  }
  
  monthStat.clicks += 1;
};

// Indexes
influencerSchema.index({ user: 1 });
influencerSchema.index({ status: 1 });
influencerSchema.index({ 'socialMedia.primaryPlatform': 1 });

export default mongoose.model('Influencer', influencerSchema);
