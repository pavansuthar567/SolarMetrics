const { param, body, header } = require("express-validator");

const getParamContainer = (id, containerId) => {
  return containerId === "param"
    ? param(id)
    : containerId === "body"
    ? body(id)
    : header(id);
};

module.exports = {
  errorValidationResponse: function (data) {
    console.log("data", data);
    var sendData = {
      status: 406,
      err: 1,
      data: data,
      msg: "Please Enter All Fields",
    };
    return sendData;
  },
  isMongoId: function (id, containerId) {
    const container = getParamContainer(id, containerId);
    return container
      .not()
      .isEmpty()
      .trim()
      .isLength({
        min: 24,
      })
      .withMessage(`Please provide a valid ${id}`);
  },
  isString: function (id, containerId) {
    const container = getParamContainer(id, containerId);
    return container.not().isEmpty().trim();
  },
  isNumber: function (id, containerId) {
    const container = getParamContainer(id, containerId);
    return container.not().isEmpty().trim().isNumeric();
  },
  getSendData: () => {
    return {
      status: 200,
      err: 0,
      data: {},
      msg: "",
    };
  },
  getDateTimeString: (date = new Date()) => {
    const z = {
      Y: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
    };
    const dateTimeString =
      z.Y +
      "-" +
      (z.M > 9 ? z.M : "0" + z.M) +
      "-" +
      (z.d > 9 ? z.d : "0" + z.d) +
      " " +
      (z.h > 9 ? z.h : "0" + z.h) +
      ":" +
      (z.m > 9 ? z.m : "0" + z.m) +
      ":" +
      (z.s > 9 ? z.s : "0" + z.s);
    return dateTimeString;
  },
  addTimeToDate: function (date, val, type) {
    if (!date || typeof date !== "object") return new Date();
    let d = new Date(date);
    if (type === "years") return new Date(d.setFullYear(d.getFullYear() + val));
    else if (type === "months") return new Date(d.setMonth(d.getMonth() + val));
    else if (type === "days") return new Date(d.setDate(d.getDate() + val));
    else if (type === "hours") return new Date(d.setHours(d.getHours() + val));
    else if (type === "minutes")
      return new Date(d.setMinutes(d.getMinutes() + val));
    else if (type === "seconds")
      return new Date(d.setSeconds(d.getSeconds() + val));
  },
  addDaysToDate: function (date, days) {
    if (!date || typeof date !== "object") return new Date();
    let d = new Date(date);
    return new Date(d.setDate(d.getDate() + days));
  },
  groupBy: (collection, iteratee, idKey, itemsKey) => {
    const groupResult = _.groupBy(collection, iteratee);
    return Object.keys(groupResult).map((key) => {
      return { [idKey]: key, [itemsKey]: groupResult[key] };
    });
  },
  getSuccessSendData: (data = {}, msg = "") => {
    return {
      status: 200,
      err: 0,
      data,
      msg,
    };
  },
  getErrorSendData: (err = {}, status = 400, data = {}, msg = "") => {
    let sendData = {
      status,
      err: 1,
      data,
      msg,
    };
    if (err.code === 11000) {
      sendData.msg = `${Object.keys(err.keyValue)[0]} already in use.`;
    } else {
      sendData.msg =
        err.message || msg || "Something went wrong, please try again later";
    }
    return sendData;
  },
  isEmail: function (email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },

  sendEmail: async (receiver_email, fileName, filePath) => {
    console.log("__sendEmail>>>>>");
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "",
          pass: "",
        },
      });

      const mailOptions = {
        from: "",
        to: receiver_email,
        subject: "Monthly Electricity Output Report",
        text: "Please find attached the monthly electricity output report.",
        attachments: [
          {
            filename: fileName,
            path: filePath,
          },
        ],
      };

      const sendMailPromise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log("13", err);
            reject(err);
          } else {
            console.log("email sent: " + info.response);
            resolve(info);
          }
        });
      });

      await sendMailPromise;
      return true;
    } catch (err) {
      console.log("err", err);
      return false;
    }
  },
};
