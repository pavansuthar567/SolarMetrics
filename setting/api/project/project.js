const { body, validationResult, header } = require("express-validator");

module.exports = {
  BindUrl: function () {
    // Create Project
    app.post(
      "/api/projects",
      body("title").not().isEmpty().trim(),
      body("description").optional().trim(),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            let data = req.body;
            projectApiController.CREATE(data, function (respData) {
              res.status(respData.status).send(respData);
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // Update Project
    app.put(
      "/api/projects/:project_id",
      body("title").not().isEmpty().trim(),
      body("description").optional().trim(),
      body("user_id").not().isEmpty().trim(),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            var respData = commonController.errorValidationResponse(errors);
            res.status(respData.status).send(respData);
          } else {
            let data = req.body;
            data.project_id = req.params.project_id;
            projectApiController.UPDATE(data, function (respData) {
              res.status(respData.status).send(respData);
            });
          }
        } catch (err) {
          var respData = commonController.errorValidationResponse(err);
          res.status(respData.status).send(respData);
        }
      }
    );

    // Get Project Details
    app.get("/api/projects/:project_id", async (req, res) => {
      try {
        let data = {};
        data.project_id = req.params.project_id;
        projectApiController.GET_SINGLE(data, function (respData) {
          res.status(respData.status).send(respData);
        });
      } catch (err) {
        var respData = commonController.errorValidationResponse(err);
        res.status(respData.status).send(respData);
      }
    });

    // Delete Project
    app.delete("/api/projects/:project_id", async (req, res) => {
      try {
        let data = {};
        data.project_id = req.params.project_id;
        projectApiController.DELETE(data, function (respData) {
          res.status(respData.status).send(respData);
        });
      } catch (err) {
        var respData = commonController.errorValidationResponse(err);
        res.status(respData.status).send(respData);
      }
    });

    // Get All Projects
    app.get("/api/projects", async (req, res) => {
      try {
        projectApiController.GET_LIST(function (respData) {
          res.status(respData.status).send(respData);
        });
      } catch (err) {
        var respData = commonController.errorValidationResponse(err);
        res.status(respData.status).send(respData);
      }
    });
  },
};
