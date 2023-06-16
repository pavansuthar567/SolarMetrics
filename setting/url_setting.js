/*
 *	APIs URL Handalder
 * 	--- START ----
 */

userApiUrlHandler = module.exports = require("./api/user/user.js");
userApiUrlHandler.BindUrl();

projectApiUrlHandler = module.exports = require("./api/project/project.js");
projectApiUrlHandler.BindUrl();

productApiUrlHandler = module.exports = require("./api/product/product.js");
productApiUrlHandler.BindUrl();

/*
 *  --- END ----
 */

urlHanlder = module.exports = require("../setting/url.js");
urlHanlder.BindUrl();
