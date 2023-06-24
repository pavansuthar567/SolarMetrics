const { validationResult, header } = require("express-validator");
const { isMongoId } = require("../../../controllers/common");

module.exports = {
  BindUrl: function () {
    // Get Reports
    app.get(
      "/api/projects/:project_id/reports/:product_id",
      header("authorization").not().isEmpty().trim(),
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
                data.project_id = req.params.project_id;
                data.product_id = req.params.product_id;
                reportController.GET_REPORTS(data, function (respData) {
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
