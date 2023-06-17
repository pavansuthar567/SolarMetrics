const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user_id: {
    type: ObjectId,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

const projectModal = mongoose.model("project", projectSchema);
module.exports = projectModal;
