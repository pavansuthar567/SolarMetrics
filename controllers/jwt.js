const loginTokenModal = require('../modals/login_token/login_token.js');
const { getSendData } = require('./common.js');

module.exports = {
    /*
        API Name: register
    */
    DECODE: async function (req, callback) {

        let sendData = getSendData(); //response data
        sendData.status = 401;
        sendData.msg = 'token Expired';

        if (!req.headers.authorization) {
            sendData.status = 406;
            sendData.msg = 'No access token provided';
            // callback(sendData);
        } else {
            try {
                console.log('env.SECRET_KEY', env.SECRET_KEY)
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, env.SECRET_KEY);

                console.log('decoded', decoded)

                if (decoded) {
                    var condition = {
                        user_id: decoded._id,
                        token: token
                    }
                    var tokenData = await loginTokenModal.find(condition)

                    console.log('tokenData', tokenData)

                    if (tokenData.length > 0) {
                        if (typeof decoded._id != "undefined") {
                            sendData.status = 200;
                            sendData.data = decoded;
                            sendData.msg = "";
                            // callback(sendData);
                        } else {
                            sendData.msg = 'Access token invalid';
                            // callback(sendData);
                        }
                    } else {
                        // callback(sendData);
                    }
                } else {
                    // callback(sendData);
                }
            } catch (error) {
                // callback(sendData);
            }
        }
        callback(sendData);
    },
}
