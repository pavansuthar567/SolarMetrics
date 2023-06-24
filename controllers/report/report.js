const moment = require("moment/moment");
const reportModal = require("../../modals/report/report");
const {
  getErrorSendData,
  getSuccessSendData,
  groupBy,
  addDaysToDate,
} = require("../common");

const addMissingDates = (data) => {
  // Find the minimum and maximum dates
  const dates = data.map((item) => new Date(item.date));
  const minDate = new Date(Math.min(...dates)).toISOString().split("T")[0];
  const maxDate = new Date(Math.max(...dates)).toISOString().split("T")[0];

  // Generate an array of all dates between min and max date
  const dateRange = [];
  let currentDate = new Date(minDate);
  while (currentDate <= new Date(maxDate)) {
    dateRange.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Create a map to store the data for each date
  const resultMap = new Map();
  data.forEach((item) => {
    const date = item.date;
    resultMap.set(date, item);
  });

  // Add missing dates with electricity_output set to 0
  dateRange.forEach((date) => {
    if (!resultMap.has(date)) {
      resultMap.set(date, {
        date: date,
        electricity_output: 0,
        project_created_at: data[0].project_created_at,
      });
    }
  });

  // Return the array of data sorted by date
  return Array.from(resultMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
};

module.exports = {
  GET_REPORTS: async function (data, callback) {
    let sendData = getErrorSendData();
    let { user_id, project_id, product_id } = data || {};

    try {
      user_id = new ObjectId(user_id);
      project_id = new ObjectId(project_id);
      product_id = new ObjectId(product_id);

      const query = [
        {
          $match: {
            user_id,
            project_id,
            product_id,
          },
        },
        {
          $lookup: {
            from: "project",
            localField: "project_id",
            foreignField: "_id",
            as: "project",
          },
        },
        {
          $project: {
            _id: 0,
            date: 1,
            electricity_output: 1,
            project_created_at: { $arrayElemAt: ["$project.created_at", 0] },
          },
        },
      ];

      let reports = await reportModal.aggregate(query);

      reports = reports.map((x) => {
        x.date = moment(x.date).format("YYYY-MM-DD");
        x.project_created_at = moment(x.project_created_at).format(
          "YYYY-MM-DD"
        );
        return x;
      });

      if (reports.length === 0) {
        sendData = getSuccessSendData([], "Report List");
        return callback(sendData);
      }

      reports = addMissingDates(reports);

      // reports.sort((a, b) => {
      //   if (new Date(a.date) < new Date(b.date)) return -1;
      //   else if (new Date(a.date) > new Date(b.date)) return 1;
      //   else return 0;
      // });

      let projectCreationDate = null;
      let finalData = [];
      projectCreationDate = reports[0].project_created_at;
      finalData = [
        {
          start_date: new Date(projectCreationDate),
          end_date: addDaysToDate(new Date(projectCreationDate), 30),
          data: [],
        },
      ];

      reports.forEach((x) => {
        const itemIndex = finalData.findIndex(
          (y) =>
            y.start_date <= new Date(x.date) && y.end_date > new Date(x.date)
        );
        if (itemIndex === -1) {
          const lastItem = finalData[finalData.length - 1];
          finalData.push({
            start_date: lastItem.end_date,
            end_date: addDaysToDate(new Date(lastItem.end_date), 30),
            data: [x],
          });
        } else {
          finalData[itemIndex].data.push(x);
        }
      });

      finalData = finalData.map((x) => {
        x.data = groupBy(x.data, "date", "date", "data");
        x.data = x.data.map((y) => {
          y.electricity_output =
            parseInt(y.data.reduce((sum, x) => sum + x.electricity_output, 0)) /
            1000;
          y.date = moment(y.date).format("DD/MM");
          delete y.data;
          return y;
        });
        const startDate = moment(x.start_date).format("YYYY/MM/DD");
        const endDate = moment(x.end_date).format("YYYY/MM/DD");
        x.start_date = startDate;
        x.end_date = endDate;
        x.title = `${startDate}-${endDate}`;
        x._id = `${startDate}-${endDate}`;
        return x;
      });

      sendData = getSuccessSendData(finalData || [], "Report List");
    } catch (err) {
      sendData = getErrorSendData(err);
    }
    callback(sendData);
  },
};
