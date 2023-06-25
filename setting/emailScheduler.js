// Import required modules
const schedule = require("node-schedule");
const ExcelJS = require("exceljs");
const Report = require("../modals/report/report");
const Project = require("../modals/project/project");
const Product = require("../modals/product/product");
const { sendEmail, groupBy } = require("../controllers/common");
const userModal = require("../modals/user/user");

// Function to generate and send the Excel report
async function generateAndSendReport(project) {
  try {
    const products = await Product.find({ project_id: project._id });

    if (products.length === 0) {
      console.log("No products found for the project:", project.title);
      return;
    }

    const user = await userModal.findOne({
      _id: new ObjectId(project.user_id),
    });

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Electricity Output Report");

    // Add headers to the worksheet
    worksheet.addRow(["Product Title", "Date", "Electricity Output"]);

    // Add data rows to the worksheet
    for (const product of products) {
      const reports = await Report.find({
        project_id: project._id,
        product_id: product._id,
      });

      console.log("reports", reports);
      const dateWiseReport = groupBy(reports, "date", "date", "data");
      console.log("dateWiseReport", dateWiseReport);

      for (const report of reports) {
        worksheet.addRow([
          product.title,
          report.date,
          report.electricity_output,
        ]);
      }
    }
    const fileName = `${String(project.title).replaceAll(
      " ",
      "_"
    )}_${moment().format("YYYY_MM_DD")}_report.xlsx`;

    // Generate the Excel file
    const path = `../setting/${fileName}`;
    const filePath = require("path").join(__dirname, path);
    console.log("filePath", filePath);
    await workbook.xlsx.writeFile(filePath);
    console.log("Excel report generated successfully.");

    // Send the Excel file via email
    const receiver_email = user.email;
    await sendEmail(receiver_email, fileName, filePath);
    console.log("Report sent successfully.");

    // Delete the generated Excel file
    fs.unlinkSync(filePath);
    console.log("Excel file deleted successfully.");
  } catch (error) {
    console.error("Error generating and sending report:", error);
  }
}

// Function to check for projects that completed 30 days and generate/send reports
async function checkAndSendReports() {
  try {
    const projects = await Project.find({
      created_at: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    for (const project of projects) {
      await generateAndSendReport(project);
    }
  } catch (error) {
    console.error("Error checking and sending reports:", error);
  }
}

// check daily if any project has completed 30 days cycle, prepare and send the electricity output report
// Schedule the task to run every day at 12:00 AM
// Schedule the function to check and send reports every night
// schedule.scheduleJob("0 0 * * *", checkAndSendReports);
// checkAndSendReports();
// console.log('moment().format("YYYY-MM-DD")', moment().format("YYYY_MM_DD"));
