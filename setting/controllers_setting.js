//define all controller
commonController = module.exports = require("../controllers/common");
apiJwtController = module.exports = require("../controllers/jwt");

//APIs Controller
userApiController = module.exports = require("../controllers/user/user.js");
projectApiController =
  module.exports = require("../controllers/project/project");
productApiController =
  module.exports = require("../controllers/product/product");
