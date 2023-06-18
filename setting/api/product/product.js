const { body, validationResult, header } = require("express-validator");
const {
  isMongoId,
  isString,
  isNumber,
} = require("../../../controllers/common");

module.exports = {
  BindUrl: function () {
    // Product Create
    app.post(
      "/api/projects/:project_id/products",
      isString("authorization", "header"),
      isString("title", "body"),
      isNumber("lat", "body"),
      isNumber("lng", "body"),
      isNumber("power_peak_in_watt", "body"),
      isNumber("orientation", "body"),
      isNumber("inclination", "body"),
      isNumber("area_sm", "body"),
      isMongoId("project_id", "param"),
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
                data.project_id = req.params.project_id;
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
      "/api/projects/:project_id/products/:product_id",
      isString("authorization", "header"),
      isString("title", "body"),
      isNumber("lat", "body"),
      isNumber("lng", "body"),
      isNumber("power_peak_in_watt", "body"),
      isNumber("orientation", "body"),
      isNumber("inclination", "body"),
      isNumber("area_sm", "body"),
      isMongoId("project_id", "param"),
      isMongoId("product_id", "param"),
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
      "/api/projects/:project_id/products/:product_id",
      isString("authorization", "header"),
      isMongoId("project_id", "param"),
      isMongoId("product_id", "param"),
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
      "/api/projects/:project_id/products/:product_id",
      isString("authorization", "header"),
      isMongoId("project_id", "param"),
      isMongoId("product_id", "param"),
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
      "/api/projects/:project_id/products",
      isString("authorization", "header"),
      isMongoId("project_id", "param"),
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
                data.project_id = req.params.project_id;
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
