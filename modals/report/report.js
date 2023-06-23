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
  electricity_output_2: {
    type: Number,
    // required: true,
  },
  electricity_output_3: {
    type: Number,
    // required: true,
  },
  electricity_output_4: {
    type: Number,
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const reportModal = mongoose.model("report", reportSchema);
module.exports = reportModal;
