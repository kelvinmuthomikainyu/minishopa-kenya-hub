import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  subcategory: {
    type: String,
    trim: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller is required']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  stock: {
    quantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative']
    },
    unit: {
      type: String,
      enum: ['kg', 'g', 'pieces', 'liters', 'ml', 'bundles', 'sacks'],
      required: [true, 'Stock unit is required']
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    }
  },
  specifications: {
    weight: String,
    dimensions: String,
    color: String,
    brand: String,
    origin: String,
    harvestDate: Date,
    expiryDate: Date
  },
  location: {
    county: {
      type: String,
      required: [true, 'County is required']
    },
    town: {
      type: String,
      required: [true, 'Town is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  delivery: {
    available: {
      type: Boolean,
      default: true
    },
    fee: {
      type: Number,
      default: 0
    },
    estimatedDays: {
      type: Number,
      default: 1
    },
    freeDeliveryThreshold: Number
  },
  tags: [String],
  isOrganic: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out_of_stock', 'discontinued'],
    default: 'active'
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  sales: {
    totalSold: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    }
  },
  seo: {
    slug: {
      type: String,
      unique: true
    },
    metaTitle: String,
    metaDescription: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for low stock status
productSchema.virtual('isLowStock').get(function() {
  return this.stock.quantity <= this.stock.lowStockThreshold;
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ seller: 1, status: 1 });
productSchema.index({ 'location.county': 1, 'location.town': 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: -1, createdAt: -1 });

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + this._id.toString().slice(-6);
  }
  next();
});

export default mongoose.model('Product', productSchema);
