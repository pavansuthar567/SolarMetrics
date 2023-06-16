loginTokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
    expires: "1d",
  },
});

const loginTokenModal = mongoose.model("login_token", loginTokenSchema);
module.exports = loginTokenModal;
