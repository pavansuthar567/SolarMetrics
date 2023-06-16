//include all module which require global
express = require("express");
bodyParser = require("body-parser");
path = require("path");
app = (module.exports = express());
http = (module.exports = require("http").Server(app));
mongoose = (module.exports = require("mongoose"));
cors = (module.exports = require("cors"));
cookieParser = (module.exports = require("cookie-parser"));
env = (module.exports = process.env);
_ = (module.exports = require("underscore"));
jwt = (module.exports = require("jsonwebtoken"));
multer = module.exports = require('multer');
md5 = (module.exports = require("md5"));
moment = (module.exports = require("moment"));
nodemailer = module.exports = require('nodemailer');
ejs = module.exports = require('ejs');
ObjectId = module.exports = mongoose.mongo.ObjectId;
fs = require("fs");


app.set('view engine', 'ejs');

require("dotenv").config();
app.use(cors());

const PORT = env.PORT || 3000;
console.log("PORT >> ", PORT);
app.use(cookieParser());

app.set("public", path.join(__dirname, "client"));
app.use(express.static(path.resolve(__dirname, "client")));

//for set url
app.use(express.static(path.join(__dirname, "images")));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Website you wish to allow to connect

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    ); // Request methods you wish to allow

    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,token"
    ); // Request headers you wish to allow

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    next(); // Pass to next layer of middleware
});

http.listen(PORT);

//var MONGO_URL = config.MONGO_URL;
mongoose.connect(env.MONGO_URL);
mongoose.pluralize(null);

console.log('MONGO_URL', env.MONGO_URL);

//all url settings
require("./setting/url_setting.js");

//all controller settings
require("./setting/controllers_setting.js");

// //all scheduled function
// require("./setting/schedule.js");
