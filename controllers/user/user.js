const loginTokenModal = require("../../modals/login_token/login_token");
const userModal = require("../../modals/user/user");
const {
  getSendData,
  getDateTimeString,
  addTimeToDate,
  isEmail,
  getErrorSendData,
  getSuccessSendData,
} = require("../common");

module.exports = {
  LOGIN: async function (data, callback) {
    let sendData = getSendData(); //response data
    sendData.err = 1;
    sendData.status = 400;
    const { email, password } = data || {};

    try {
      if (!isEmail(email)) {
        sendData.msg = "Please enter valid email address";
        return callback(sendData);
      }

      const cond = {
        email,
        password: md5(password),
      };

      let user = await userModal.findOne(cond);
      if (!user) {
        sendData.msg = "Invalid email or password";
        return callback(sendData);
      }

      const { _id, name } = user || {};
      const expireDate = addTimeToDate(new Date(), 24, "hours");
      const payload = {
        _id,
        name,
        email,
      };

      const resData = {
        Userdata: payload,
        Token: jwt.sign(payload, env.SECRET_KEY, { expiresIn: "24h" }),
        TokenType: "Bearer",
        TokenExpire: getDateTimeString(expireDate),
      };

      const tokenData = {
        user_id: _id,
        token: resData.Token,
      };
      await loginTokenModal.create(tokenData);

      sendData = getSuccessSendData(resData, "Login successful");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  LOGOUT: async function (data, callback) {
    let sendData = getErrorSendData(); //response data

    const { user_data, token } = data || {};
    let { _id } = user_data || {};

    try {
      _id = new ObjectId(_id);
      const user = await userModal.findOne({ _id });
      if (!user) {
        sendData = "User does not exist";
        return callback(sendData);
      }

      const delete_login_token = {
        user_id: _id,
        token,
      };
      await loginTokenModal.deleteOne(delete_login_token);

      sendData = getSuccessSendData({}, "You are logout");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  CREATE: async function (data, callback) {
    let sendData = getSendData(); //response data
    const { email, password } = data || {};
    sendData.err = 1;
    sendData.status = 400;

    try {
      if (!isEmail(email)) {
        sendData.msg = "Please enter valid email address";
        return callback(sendData);
      }

      data.password = md5(password);
      data.created_at = new Date();
      data.updated_at = new Date();

      const user = await userModal.create(data);
      sendData.err = 0;
      sendData.data = user;
      sendData.status = 200;
      sendData.msg = `User created successfully`;
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  UPDATE: async function (data, callback) {
    let sendData = getErrorSendData(); //response data
    const { userData, email } = data || {};
    const { _id: user_id } = userData || {};

    try {
      const cond = { _id: new ObjectId(user_id) };
      const user = await userModal.findOne(cond);
      if (!user) {
        sendData.msg = `User does not exist`;
        return callback(sendData);
      }

      if (!isEmail(email)) {
        sendData.msg = "Please enter valid email address";
        return callback(sendData);
      }

      data.updated_at = new Date();
      await userModal.updateOne(cond, data);
      const newUser = await userModal.findOne(cond);
      let updated = newUser ? JSON.parse(JSON.stringify(newUser)) : {};
      delete updated.password;

      sendData = getSuccessSendData(updated, "User updated successfully");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  GET_SINGLE: async function (data, callback) {
    let sendData = getErrorSendData(); //response data
    const { userData } = data || {};
    const { _id: user_id } = userData || {};

    try {
      const userId = new ObjectId(user_id);
      const user = await userModal.findOne({ _id: userId });
      if (!user) {
        sendData.msg = "User does not exist";
        return callback(sendData);
      }

      let userData = JSON.parse(JSON.stringify(user));
      delete userData.password;
      sendData = getSuccessSendData(userData, "User Profile");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  FORGOT_PASSWORD: async function (data, callback) {
    let sendData = getErrorSendData(); //response data
    const { email } = data || {};

    try {
      if (!isEmail(email)) {
        sendData.msg = "Please enter valid email address";
        return callback(sendData);
      }

      const user = await userModal.findOne({ email });
      if (!user) {
        sendData.msg = "User does not exist";
        return callback(sendData);
      }

      /// Send Email to the user with the link to reset the password with the token

      let userData = JSON.parse(JSON.stringify(user));
      delete userData.password;
      sendData = getSuccessSendData(userData, "User Profile");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  RESET_PASSWORD: async function (data, callback) {
    let sendData = getErrorSendData(); //response data
    const { password, confirm_password, userData } = data || {};
    const { _id: user_id } = userData || {};

    try {
      const userId = new ObjectId(user_id);
      const user = await userModal.findOne({ _id: userId });
      if (!user) {
        sendData.msg = "User does not exist";
        return callback(sendData);
      }

      if (password !== confirm_password) {
        sendData.msg = "Password and confirm password should be the same";
        return callback(sendData);
      }

      /// Delete all user token and reset the password

      let userData = JSON.parse(JSON.stringify(user));
      delete userData.password;
      sendData = getSuccessSendData(userData, "User Profile");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  // GET_LIST: async function (data, callback) {
  //   let sendData = getSendData(); //response data
  //   sendData.err = 1;

  //   const cond = [
  //     {
  //       $sort: { username: -1 },
  //     },
  //     {
  //       $facet: {
  //         active: [
  //           {
  //             $match: {
  //               deleted: false,
  //               is_active: true,
  //             },
  //           },
  //         ],
  //         inactive: [
  //           {
  //             $match: {
  //               deleted: false,
  //               is_active: false,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ];

  //   await userModal
  //     .aggregate(cond)
  //     .then((data) => {
  //       sendData.data = data;
  //       sendData.err = 0;
  //       sendData.msg = `Users List`;
  //     })
  //     .catch((err) => {
  //       sendData.msg = `Could not get users list, please try again later`;
  //     });
  //   callback(sendData);
  // },
};
