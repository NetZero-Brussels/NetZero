const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Define the payloads
const payloads = [
  {
    attestationType: "0x436f324170690000000000000000000000000000000000000000000000000000",
    sourceId: "0x5745420000000000000000000000000000000000000000000000000000000000",
    requestBody: {
      money: "500",
      money_unit: "usd",
      passengers: "0",
      distance: "0",
      distance_unit: "",
      url_param: "passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na"
    }
  },
  {
    attestationType: "0x436f324170690000000000000000000000000000000000000000000000000000",
    sourceId: "0x5745420000000000000000000000000000000000000000000000000000000000",
    requestBody: {
      money: "500",
      money_unit: "usd",
      passengers: "0",
      distance: "0",
      distance_unit: "",
      url_param: "passenger_train-route_type_national_rail-fuel_source_na"
    }
  },
  {
    attestationType: "0x436f324170690000000000000000000000000000000000000000000000000000",
    sourceId: "0x5745420000000000000000000000000000000000000000000000000000000000",
    requestBody: {
      money: "0",
      money_unit: "",
      passengers: "4",
      distance: "100",
      distance_unit: "km",
      url_param: "passenger_train-route_type_underground-fuel_source_na"
    }
  },
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
    attestationType: "0x436f324170690000000000000000000000000000000000000000000000000000",
    sourceId: "0x5745420000000000000000000000000000000000000000000000000000000000",
    requestBody: {
      money: "0",
      money_unit: "",
      passengers: "4",
      distance: "100",
      url_param: "passenger_vehicle-vehicle_type_taxi-fuel_source_na-distance_na-engine_size_na"
    }
  }
];

const executefetchVerify = async () => {
  for (const payload of payloads) {
    try {
      console.log('Executing fetch command with payload:', payload);
      const response = await axios.post(
        'https://co2-verifier.aflabs.org/verifier/web/Co2Api/prepareResponse',
        payload,
        {
          headers: {
            'accept': 'application/json',
            'X-API-KEY': '123456',
            'Content-Type': 'application/json'
          }
        }
      );
      const data = response.data.response.responseBody;
      const emissionFactor = data.emission_factor;
      const activityData = data.activity_data;
      
      console.log('Carbon Emission Factor:', {
        name: emissionFactor.name,
        id: emissionFactor.id,
        source: emissionFactor.source,
        year: emissionFactor.year,
        region: emissionFactor.region,
        category: emissionFactor.category,
      });

      console.log('Activity Data:', {
        activity_value: activityData.activity_value,
        activity_unit: activityData.activity_unit,
      });

      console.log('Parameters for Carbon Offset and Energy Converted:', {
        co2e: data.co2e,
        co2e_unit: data.co2e_unit,
        co2e_calculation_method: data.co2e_calculation_method,
        co2e_calculation_origin: data.co2e_calculation_origin,
        constituent_gases: data.constituent_gases,
      });

    } catch (error) {
      console.error('Error executing curl command:', error);
    }
  }
};

// Start the server and execute the fetches once
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await executefetchVerify();
});
