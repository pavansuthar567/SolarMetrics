const { body, validationResult, header, param } = require("express-validator");

module.exports = {
  BindUrl: function () {
    // Product Create
    app.post(
      "/api/products",
      header("authorization").not().isEmpty().trim(),
      body("title").not().isEmpty().trim(),
      body("lat").not().isEmpty().trim().isNumeric(),
      body("lng").not().isEmpty().trim().isNumeric(),
      body("project_id")
        .not()
        .isEmpty()
        .trim()
        .isLength({
          min: 24,
        })
        .withMessage("Please provide a valid project_id"),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                let data = req.body;
                data.user_id = respData.data._id;
                productController.CREATE_PRODUCT(data, function (respData) {
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

    // Product Update
    app.put(
      "/api/products/:product_id",
      header("authorization").not().isEmpty().trim(),
      param("product_id")
        .not()
        .isEmpty()
        .trim()
        .isLength({
          min: 24,
        })
        .withMessage("Please provide a valid product_id"),
      body("project_id")
        .not()
        .isEmpty()
        .trim()
        .isLength({
          min: 24,
        })
        .withMessage("Please provide a valid project_id"),
      body("title").not().isEmpty().trim(),
      body("lat").not().isEmpty().trim().isNumeric(),
      body("lng").not().isEmpty().trim().isNumeric(),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                let data = req.body;
                data.user_id = respData.data._id;
                data.product_id = req.params.product_id;
                productController.UPDATE_PRODUCT(data, function (respData) {
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

    // Product Delete
    app.delete(
      "/api/products/:product_id",
      header("authorization").not().isEmpty().trim(),
      param("product_id")
        .not()
        .isEmpty()
        .trim()
        .isLength({
          min: 24,
        })
        .withMessage("Please provide a valid product_id"),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                let data = req.body;
                data.user_id = respData.data._id;
                data.product_id = req.params.product_id;
                productController.DELETE_PRODUCT(data, function (respData) {
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

    // Get Product
    app.get(
      "/api/products/:product_id",
      header("authorization").not().isEmpty().trim(),
      param("product_id")
        .not()
        .isEmpty()
        .trim()
        .isLength({
          min: 24,
        })
        .withMessage("Please provide a valid product_id"),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                let data = req.body;
                data.user_id = respData.data._id;
                data.product_id = req.params.product_id;
                productController.GET_PRODUCT(data, function (respData) {
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

    // Get Product List
    app.get(
      "/api/products",
      header("authorization").not().isEmpty().trim(),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            apiJwtController.DECODE(req, function (respData) {
              if (respData.status !== 200) {
                res.status(respData.status).send(respData);
              } else {
                let data = req.body;
                data.user_id = respData.data._id;
                productController.GET_PRODUCT_LIST(data, function (respData) {
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
  },
};
