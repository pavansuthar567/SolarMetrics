const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
  },
  product_id: {
    type: ObjectId,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

const productModal = mongoose.model("product", productSchema);
module.exports = productModal;
