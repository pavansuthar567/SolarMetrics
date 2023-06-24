const productModal = require("../../modals/product/product");
const projectModal = require("../../modals/project/project");
const { getErrorSendData, getSuccessSendData } = require("../common");

module.exports = {
  CREATE_PROJECT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { user_id } = data || {};

    try {
      data.user_id = new ObjectId(user_id);
      data.created_at = new Date();
      data.updated_at = new Date();

      const project = await projectModal.create(data);
      sendData = getSuccessSendData(project, "Project created successfully");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  UPDATE_PROJECT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { project_id, user_id } = data || {};

    try {
      const cond = {
        _id: new ObjectId(project_id),
        user_id: new ObjectId(user_id),
      };
      const project = await projectModal.findOne(cond);
      if (!project) {
        sendData.msg = `Project does not exist`;
        return callback(sendData);
      }

      data.updated_at = new Date();
      await projectModal.updateOne(cond, data);
      const updatedProject = await projectModal.findOne(cond);

      sendData = getSuccessSendData(
        updatedProject,
        "Project updated successfully"
      );
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  DELETE_PROJECT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { project_id, user_id } = data || {};

    try {
      const cond = {
        _id: new ObjectId(project_id),
        user_id: new ObjectId(user_id),
      };
      const project = await projectModal.findOne(cond);
      if (!project) {
        sendData.msg = `Project does not exist`;
        return callback(sendData);
      }

      const res = await projectModal.deleteOne(cond);
      if (res && res.deletedCount === 1) {
        await productModal.deleteMany({ project_id: new ObjectId(project_id) });
      }

      sendData = getSuccessSendData({}, "Project deleted successfully");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  GET_PROJECT: async function (data, callback) {
    let sendData = getErrorSendData();
    const { project_id, user_id } = data || {};

    try {
      const cond = {
        _id: new ObjectId(project_id),
        user_id: new ObjectId(user_id),
      };
      let project = await projectModal
        .findOne(cond)
        .select("-user_id") // Exclude the user_id field from the query result
        .exec();

      if (!project) {
        sendData.msg = "Project does not exist";
        return callback(sendData);
      }

      // for (let i = 0; i < 10; i++) {
      //   console.log("i", i);
      //   let product = {
      //     title: `Product Test - ${i + 30}`,
      //     lat: 21.178888 + (i + 30) / 1500,
      //     lng: 72.836888 + (i + 30) / 1500,
      //     power_peak_in_watt: 320 + i * 10,
      //     orientation: i % 4,
      //     area_sm: 45 + i / 10,
      //     inclination: 20 + i / 10,
      //     is_default: false,
      //   };
      //   product.user_id = new ObjectId(user_id);
      //   product.project_id = new ObjectId(project_id);
      //   product.created_at = new Date();
      //   product.updated_at = new Date();
      //   product.is_default = false;
      //   console.log("product", product);
      //   await productModal.create(product);
      // }
      sendData = getSuccessSendData(project, "Project Details");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },

  GET_PROJECT_LIST: async function (data, callback) {
    let sendData = getErrorSendData();
    const { user_id } = data || {};

    try {
      const cond = { user_id: new ObjectId(user_id) };
      const projects = await projectModal
        .find(cond)
        .select("-user_id") // Exclude the user_id field from the query result
        .exec();

      sendData = getSuccessSendData(projects || [], "Project List");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },
};
