const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  country_code: {
    type: String,
  },
  location: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

const userModal = mongoose.model("user", userSchema);
module.exports = userModal;
