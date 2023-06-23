// Import required modules
const schedule = require("node-schedule");
const Report = require("../modals/report/report");
const Project = require("../modals/project/project");
const axios = require("axios");

// OpenWeatherMap API key
const weatherApiKey = env.WEATHER_API_KEY;

// Solar product parameters
// area => // Area in square meters
// latitude => // Latitude of the solar panel location
// longitude => // Longitude of the solar panel location
// powerPeak => // Power peak in watts
// orientation => // Orientation (N/E/S/W)
// inclination => // Inclination/tilt in degrees

function calculateDynamicPeakPower(basePeakPower, weatherData) {
  // Adjust the base peak power based on weather conditions and hour of the day
  const { clouds } = weatherData;
  const cloudCover = clouds.all;

  // Example adjustment factors based on cloud cover
  const cloudCoverFactor = 1 - cloudCover / 100;
  // Calculate the dynamic peak power by multiplying the base peak power with the adjustment factors
  const dynamicPeakPower = basePeakPower * cloudCoverFactor;

  return dynamicPeakPower;
}

// Function to calculate electricity output
function getElectricityOutput(weatherData, product) {
  const { main, wind, clouds } = weatherData || {};
  const { power_peak_in_watt, orientation, inclination, area_sm } = product;

  const temperature = main.temp; // Temperature in Kelvin
  const windSpeed = wind.speed; // Wind speed in meters per second
  const cloudCover = clouds.all / 100; // Cloud cover percentage

  // Calculate electricity output based on temperature
  const temperatureCoefficient = 0.05; // Adjust this coefficient based on your specific requirements
  const temperatureOutput =
    temperature >= 273.15 ? temperatureCoefficient * temperature : 0;

  // Calculate electricity output based on wind speed
  const windCoefficient = 0.1; // Adjust this coefficient based on your specific requirements
  const windOutput = windSpeed > 0 ? windCoefficient * windSpeed : 0;

  // Calculate electricity output based on weather conditions (cloud cover)
  const solarIrradiance = 1367 * (1 - cloudCover);

  // Calculate electricity output based on other product parameters
  const orientationCoefficient = 0.02; // Adjust this coefficient based on your specific requirements
  const orientationOutput = orientationCoefficient * orientation;

  const inclinationCoefficient = 0.03; // Adjust this coefficient based on your specific requirements
  const inclinationOutput = inclinationCoefficient * inclination;

  const areaCoefficient = 0.01; // Adjust this coefficient based on your specific requirements
  const areaOutput = areaCoefficient * area_sm;

  // Calculate the dynamic peak power based on the current hour
  // const currentHour = new Date().getHours();
  // const dynamicPeakPower = power_peak_in_watt * (currentHour / 24);
  const dynamicPeakPower = calculateDynamicPeakPower(
    power_peak_in_watt,
    weatherData
  );

  // Adjust the electricity output based on the product's power peak and other factors
  electricityOutput =
    (dynamicPeakPower + temperatureOutput + windOutput) *
      solarIrradiance *
      area_sm *
      Math.cos((orientation * Math.PI) / 180) *
      Math.cos((inclination * Math.PI) / 180) +
    orientationOutput +
    inclinationOutput +
    areaOutput;

  return electricityOutput;
}

// Function to fetch weather data and calculate electricity output for all active projects' products
async function fetchWeatherDataAndCalculateOutput() {
  try {
    const query = [
      {
        $match: {
          is_active: true,
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "_id",
          foreignField: "project_id",
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          products: 1,
        },
      },
    ];

    const projects = await Project.aggregate(query);
    for (const project of projects) {
      const { products } = project || {};

      for (const product of products) {
        // Fetch weather data for the product's location
        const weatherData = await fetchWeatherData(product.lat, product.lng);

        const { sunrise, sunset } = weatherData.sys || {};
        const currentTime = new Date();
        const sunriseTime = new Date(sunrise * 1000);
        const sunsetTime = new Date(sunset * 1000);
        if (!(currentTime > sunriseTime && currentTime < sunsetTime)) continue;

        // Calculate electricity output
        const electricityOutput = getElectricityOutput(weatherData, product);
        // const electricityOutput2 = getElectricityOutput2(weatherData, product);
        // const electricityOutput3 = getElectricityOutput3(weatherData, product);
        // const electricityOutput4 = getElectricityOutput4(weatherData, product);

        console.log("electricityOutput", electricityOutput);
        // console.log("electricityOutput2", electricityOutput2);
        // console.log("electricityOutput3", electricityOutput3);
        // console.log("electricityOutput4", electricityOutput4);

        // Create a new report document
        const report = new Report({
          project_id: project._id,
          product_id: product._id,
          date: new Date(),
          electricity_output: electricityOutput,
          // electricity_output_2: electricityOutput2,
          // electricity_output_3: electricityOutput3,
          // electricity_output_4: electricityOutput4,
        });

        // Save the report to the database
        await report.save();
      }
    }

    console.log(
      "Weather data fetched, output calculated and report saved successfully."
    );
  } catch (error) {
    console.error("Error fetching weather data and calculating output:", error);
  }
}

// Function to fetch weather data based on latitude and longitude
const fetchWeatherData = async (lat, lng) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}`;
    const response = await axios.get(url);
    const weatherData = response.data;
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};

// Schedule the function to fetch weather data and calculate output every hour
// schedule.scheduleJob("*/20 * * * * *", fetchWeatherDataAndCalculateOutput); // Every 10 Seconds
// schedule.scheduleJob("0 * * * *", fetchWeatherDataAndCalculateOutput);
