const { body, validationResult, header } = require("express-validator");

module.exports = {
  BindUrl: function () {
    // User Login
    app.post(
      "/api/login",
      body("email").not().isEmpty().trim(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password length should be greater than 5"), //password validation
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            //calling controller function
            var data = await req.body;
            userController.LOGIN(data, function (respData) {
              res.status(respData.status).send(respData);
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Log Out
    app.get(
      "/api/logout",
      header("authorization").not().isEmpty().trim(),
      async function (req, res) {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            //calling controller function

            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                var sendData = {};
                sendData.user_data = respData.data;
                sendData.token = req.headers.authorization.split(" ")[1];

                userController.LOGOUT(sendData, function (respData) {
                  res.status(respData.status).send(respData);
                });
              }
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Sign Up
    app.post(
      "/api/signup",
      body("name").not().isEmpty().trim(),
      body("email").not().isEmpty().trim(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password length should be greater than 5"), //password validation
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            //calling controller function
            let data = req.body;
            userController.CREATE(data, function (respData) {
              res.status(respData.status).send(respData);
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Update
    app.put(
      "/api/profile",
      header("authorization").not().isEmpty().trim(),
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                //calling controller function
                let data = req.body;
                data.userData = respData.data;
                userController.UPDATE(data, function (respData) {
                  res.status(respData.status).send(respData);
                });
              }
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Get Single
    app.get(
      "/api/profile",
      header("authorization").not().isEmpty().trim(),
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                //calling controller function
                let data = {};
                data.userData = respData.data;
                userController.GET_SINGLE(data, function (respData) {
                  res.status(respData.status).send(respData);
                });
              }
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Forgot Password
    app.get(
      "/api/forgot_password",
      body("email").not().isEmpty().trim(),
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            //calling controller function
            let data = req.body;
            data.userData = respData.data;
            userController.FORGOT_PASSWORD(data, function (respData) {
              res.status(respData.status).send(respData);
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Get Single
    app.get(
      "/api/reset_password",
      header("authorization").not().isEmpty().trim(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password length should be greater than 5"), //password validation
      body("confirm_password")
        .isLength({ min: 5 })
        .withMessage("Confirm password length should be greater than 5"), //password validation
      async (req, res) => {
        try {
          // Finds the validation errors in this request and wraps them in an object with handy functions
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                //calling controller function
                let data = req.body;
                data.userData = respData.data;
                userController.RESET_PASSWORD(data, function (respData) {
                  res.status(respData.status).send(respData);
                });
              }
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // User Delete
    // app.delete(
    //     "/api/users/delete/:user_id",
    //     header('authorization').not().isEmpty().trim(),
    //     param('user_id').not().isEmpty().trim().isLength({
    //         min: 24
    //     }).withMessage("please valid user_id"),
    //     async (req, res) => {
    //         try {
    //             // Finds the validation errors in this request and wraps them in an object with handy functions
    //             const errors = validationResult(req);
    //             if (!errors.isEmpty()) {
    //                 var respData = commonController.errorValidationResponse(errors);
    //                 res.status(respData.status).send(respData);
    //             } else {
    //                 apiJwtController.DECODE(req, function (respData) {
    //                     if (respData.status !== 200) {
    //                         res.status(respData.status).send(respData);
    //                     } else {
    //                         //calling controller function
    //                         let data = {};
    //                         data.userData = respData.data
    //                         data.user_id = req.params.user_id // id of the user to be deleted
    //                         userController.DELETE(data, function (respData) {
    //                             res.status(respData.status).send(respData);
    //                         });
    //                     }
    //                 })
    //             }
    //         } catch (err) {
    //             var respData = commonController.errorValidationResponse(err);
    //             res.status(respData.status).send(respData);
    //         }
    //     }
    // );
  },
};
