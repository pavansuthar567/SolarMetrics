const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
  },
  project_id: {
    type: ObjectId,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
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
