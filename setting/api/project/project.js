const { body, validationResult, header, param } = require("express-validator");

module.exports = {
  BindUrl: function () {
    // Project Create
    app.post(
      "/api/projects",
      header("authorization").not().isEmpty().trim(),
      body("title").not().isEmpty().trim(),
      body("description").optional().trim(),
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
                projectController.CREATE_PROJECT(data, function (respData) {
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

    // Project Update
    app.put(
      "/api/projects/:project_id",
      header("authorization").not().isEmpty().trim(),
      param("project_id")
        .not()
        .isEmpty()
        .trim()
        .isLength({
          min: 24,
        })
        .withMessage("Please provide a valid project_id"),
      body("title").not().isEmpty().trim(),
      body("description").optional().trim(),
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
                projectController.UPDATE_PROJECT(data, function (respData) {
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

    // Project Delete
    app.delete(
      "/api/projects/:project_id",
      header("authorization").not().isEmpty().trim(),
      param("project_id")
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
                data.project_id = req.params.project_id;
                projectController.DELETE_PROJECT(data, function (respData) {
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

    // Get Project
    app.get(
      "/api/projects/:project_id",
      header("authorization").not().isEmpty().trim(),
      param("project_id")
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
                data.project_id = req.params.project_id;
                projectController.GET_PROJECT(data, function (respData) {
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

    // Get Project List
    app.get(
      "/api/projects",
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
                projectController.GET_PROJECT_LIST(data, function (respData) {
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
