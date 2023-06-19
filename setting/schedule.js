const cron = require("node-cron");
const axios = require("axios");
const nodemailer = require("nodemailer");

// OpenWeatherMap API key
const weatherApiKey = env.WEATHER_API_KEY;
console.log("weatherApiKey", weatherApiKey);
// Solar product parameters
const powerPeak = 5000; // Power peak in watts
const orientation = "S"; // Orientation (N/E/S/W)
const inclination = 30; // Inclination/tilt in degrees
const area = 20; // Area in square meters
const longitude = 12.345; // Longitude of the solar panel location

// Function to calculate electricity generation
const calculateElectricityGeneration = (weatherData) => {
  // Extract relevant weather data from the response
  const { sunrise, sunset, weather } = weatherData;

  // Perform calculations based on weather data and product parameters
  // You can customize this section to calculate electricity generation according to your specific formula

  const electricityGeneration = // Your calculation here based on weather and product parameters
    powerPeak *
    area *
    getSunlightDuration(sunrise, sunset) *
    getWeatherFactor(weather);

  return electricityGeneration;
};

// Function to get sunlight duration in hours
const getSunlightDuration = (sunrise, sunset) => {
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  const duration = (sunsetTime - sunriseTime) / (1000 * 3600);
  return duration;
};

// Function to get weather factor based on weather conditions
const getWeatherFactor = (weather) => {
  // You can define your own logic here to calculate the weather factor based on weather conditions
  // For simplicity, let's assume a fixed factor of 0.8 for all weather conditions
  return 0.8;
};

// Function to send email with the electricity output report
const sendEmail = async (report) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     // user: "codewhizlabs@gmail.com",
    //     // pass: "codewhizlabs@100",
    //     // user: "pavan.suthar567@gmail.com",
    //     // pass: "Pavan@2613",
    //     user: "codewhizlabs@gmail.com",
    //     pass: "0E9008C34E43BE8DCA1665DDB792C7F787AFBF34665306E2F4A6D5A61CBED8AFA6CC46D6EA750B5BA59E76B79E18CE29",
    //   },
    // });

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.elasticemail.com",
    //   port: 2525,
    //   secure: true, // Use SSL/TLS
    //   auth: {
    //     user: "codewhizlabs@gmail.com",
    //     pass: "9D54A97B917B96700EA76C16382BCEB11420",
    //   },
    //   tls: {
    //     ciphers: "TLSv1.2",
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "camden.rodriguez@ethereal.email",
        pass: "R43sjrKdgJfKhF6KCr",
      },
    });

    const mailOptions = {
      from: "codewhizlabs@gmail.com",
      to: "pavan.suthar567@gmail.com",
      subject: "Electricity Output Report",
      text: "Attached is the electricity output report.",
      attachments: [
        {
          filename: "electricity_output_report.txt",
          content: report,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to fetch weather data from the API
const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`
    );
    const weatherData = response.data;

    const electricityGeneration = calculateElectricityGeneration(weatherData);

    // Store electricity generation data or perform any other required operations

    console.log("Electricity Generation:", electricityGeneration);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};

// Schedule the fetchWeatherData function to run every hour
cron.schedule("0 * * * *", fetchWeatherData);

// check daily if any project has completed 30 days cycle, prepare and send the electricity output report
// Schedule the task to run every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  // Your task logic goes here
  console.log("Cron job running every day");
  // Generate the electricity output report
  const report = "Your electricity output report"; // Customize the report content

  // Send the report via email
  await sendEmail(report);
});

setTimeout(async () => {
  const report = "Your electricity output report"; // Customize the report content

  await sendEmail(report);
}, 2000);
