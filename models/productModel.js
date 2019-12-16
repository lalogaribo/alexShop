const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must provide a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Product name should be less than 50 characters'],
    minlength: [10, 'Product name should be 10 characters minimum']
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price']
  },
  slug: String,
  quantity: {
    type: Number,
    default: 1
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Product must have a brief summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'Product must have a cover image']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
