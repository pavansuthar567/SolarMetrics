async function calculateElectricityOutput(weatherData, product) {
  const { main, wind, clouds, sys } = weatherData;
  const { temp } = main;
  const { speed: windSpeed } = wind;
  const { all: cloudCover } = clouds;
  const { sunrise, sunset } = sys;

  const { power_peak_in_watt, orientation, inclination, area } = product;

  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  const daylightDuration = (sunsetTime - sunriseTime) / (1000 * 3600); // Duration of daylight in hours

  let totalElectricityOutput = 0;

  // Fetch new weather data for each hour during the sunshine
  for (let hour = 0; hour < daylightDuration; hour++) {
    const currentHour = sunriseTime.getHours() + hour;

    // Fetch the latest weather data for the current hour
    const latestWeatherData = await fetchWeatherData(); // Implement your logic to fetch the latest weather data

    const {
      main: latestMain,
      wind: latestWind,
      clouds: latestClouds,
    } = latestWeatherData;
    const { temp: latestTemp } = latestMain;
    const { speed: latestWindSpeed } = latestWind;
    const { all: latestCloudCover } = latestClouds;

    // Calculate the dynamic peak power based on the hour of the day
    const dynamicPeakPower = calculateDynamicPeakPower(
      power_peak_in_watt,
      currentHour
    );

    const cloudCoverFactor = 1 - latestCloudCover / 100;
    const temperatureFactor = latestTemp > 273.15 ? latestTemp / 273.15 : 0; // Adjust temperature factor based on your specific requirements
    const windFactor = latestWindSpeed > 0 ? latestWindSpeed : 0; // Adjust wind factor based on your specific requirements

    // Calculate the electricity output for the current hour using the latest weather data
    const electricityOutput =
      dynamicPeakPower *
      area *
      orientationFactor(orientation, currentHour) *
      inclinationFactor(inclination) *
      cloudCoverFactor *
      temperatureFactor *
      windFactor;

    totalElectricityOutput += electricityOutput;
  }

  return totalElectricityOutput;
}

// Rest of the code remains the same as in the previous function
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
  const electricityOutput =
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
