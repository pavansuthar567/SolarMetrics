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

reportApiUrlHandler = module.exports = require("./api/report/report.js");
reportApiUrlHandler.BindUrl();

/*
 *  --- END ----
 */

urlHanlder = module.exports = require("../setting/url.js");
urlHanlder.BindUrl();
