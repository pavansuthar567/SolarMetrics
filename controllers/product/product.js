const productModal = require("../../modals/product/product");
const { getErrorSendData, getSuccessSendData } = require("../common");

module.exports = {
  CREATE_PRODUCT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { user_id, project_id } = data || {};

    try {
      data.user_id = new ObjectId(user_id);
      data.project_id = new ObjectId(project_id);
      data.created_at = new Date();
      data.updated_at = new Date();

      const product = await productModal.create(data);
      sendData = getSuccessSendData(product, "Product created successfully");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  UPDATE_PRODUCT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { product_id, user_id } = data || {};

    try {
      const cond = {
        _id: new ObjectId(product_id),
        user_id: new ObjectId(user_id),
      };
      const product = await productModal.findOne(cond);
      if (!product) {
        sendData.msg = `Product does not exist`;
        return callback(sendData);
      }

      data.updated_at = new Date();
      await productModal.updateOne(cond, data);
      const updatedProduct = await productModal.findOne(cond);

      sendData = getSuccessSendData(
        updatedProduct,
        "Product updated successfully"
      );
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  DELETE_PRODUCT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { product_id, user_id } = data || {};

    try {
      const cond = {
        _id: new ObjectId(product_id),
        user_id: new ObjectId(user_id),
      };
      const product = await productModal.findOne(cond);
      if (!product) {
        sendData.msg = `Product does not exist`;
        return callback(sendData);
      }

      await productModal.deleteOne(cond);

      sendData = getSuccessSendData({}, "Product deleted successfully");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  GET_PRODUCT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { product_id, user_id } = data || {};

    try {
      const cond = {
        _id: new ObjectId(product_id),
        user_id: new ObjectId(user_id),
      };
      let product = await productModal
        .findOne(cond)
        .select("-user_id") // Exclude the user_id field from the query result
        .exec();

      if (!product) {
        sendData.msg = "Product does not exist";
        return callback(sendData);
      }

      sendData = getSuccessSendData(product, "Product Details");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  GET_PRODUCT_LIST: async function (data, callback) {
    let sendData = getErrorSendData();
    const { user_id } = data || {};

    try {
      const cond = { user_id: new ObjectId(user_id) };
      const products = await productModal
        .find(cond)
        .select("-user_id") // Exclude the user_id field from the query result
        .exec();
      sendData = getSuccessSendData(products, "Product List");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },
};
