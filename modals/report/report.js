const reportSchema = new mongoose.Schema({
  project_id: {
    type: ObjectId,
    required: true,
  },
  product_id: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  electricity_output: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const reportModal = mongoose.model("report", reportSchema);
module.exports = reportModal;
