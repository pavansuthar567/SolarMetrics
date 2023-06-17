//define all controller
commonController = module.exports = require("../controllers/common");
apiJwtController = module.exports = require("../controllers/jwt");

//APIs Controller
userController = module.exports = require("../controllers/user/user.js");
projectController = module.exports = require("../controllers/project/project");
productController = module.exports = require("../controllers/product/product");
