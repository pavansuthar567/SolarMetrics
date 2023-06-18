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
  // Power peak in watts (W)
  power_peak_in_watt: {
    type: Number,
    required: true,
  },
  // Orientation using cardinal directions (North = 0, East = 1, South = 2, West = 3)
  orientation: {
    type: Number,
    required: true,
  },
  // Inclination or tilt angle in degrees (°)
  inclination: {
    type: Number,
    required: true,
  },
  // Area in square meters (m²)
  area_sm: {
    type: Number,
    required: true,
  },
  // Latitude in degrees (°)
  lat: {
    type: Number,
    required: true,
    unique: true,
  },
  // Longitude in degrees (°)
  lng: {
    type: Number,
    required: true,
    unique: true,
  },
  is_default: {
    type: Boolean,
    default: false,
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
