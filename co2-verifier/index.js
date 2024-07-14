const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const port = 3000;

// Function to execute the curl command
const executeCurlCommand = async () => {
  try {
    const response = await axios.post(
      'https://co2-verifier.aflabs.org/verifier/web/Co2Api/prepareResponse',
      {
        attestationType: "0x436f324170690000000000000000000000000000000000000000000000000000",
        sourceId: "0x5745420000000000000000000000000000000000000000000000000000000000",
        requestBody: {
          money: "0",
          money_unit: "",
          passengers: "4",
          distance: "100",
          url_param: "passenger_flight-route_type_domestic-aircraft_type_na-distance_na-class_na-rf_excluded-distance_uplift_included"
        }
      },
      {
        headers: {
          'accept': 'application/json',
          'X-API-KEY': '123456',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error executing curl command:', error);
  }
};

// Schedule the task to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Executing curl command...');
  executeCurlCommand();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
