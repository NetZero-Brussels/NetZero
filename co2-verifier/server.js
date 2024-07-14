const express = require('express');
const axios = require('axios');
const { ethers, JsonRpcProvider } = require('ethers');
const dotenv = require('dotenv');

const app = express();
const port = 3000;

dotenv.config();

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

// Define the ABI (Minified version)
const abi = [
  "function setEmissionFactor(uint8 travelType, uint256 factor) external",
  "function getEmissionFactor(uint8 travelType) external view returns (uint256)"
];

// Define the contract address
const contractAddress = '0x26463BD6520254DEFE936CEbAa08E1f060995657';

// Create a provider and signer
const provider = new JsonRpcProvider(process.env.ARBITRUM_RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, signer);


// verifier created to proxy the requests from climaq
const executefetchVerify = async () => {
  for (const payload of payloads) {
    try {
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

      console.log('Carbon Emission Factor:', {
        name: emissionFactor.name,
        id: emissionFactor.id,
        source: emissionFactor.source,
        year: emissionFactor.year,
        region: emissionFactor.region,
        category: emissionFactor.category,
      });

      const travelType = getTravelTypeFromUrlParam(payload.requestBody.url_param);
      const factor = parseInt(data.co2e); // Assuming the factor is represented by co2e

      // Set the emission factor in the contract
      const tx = await contract.setEmissionFactor(travelType, factor);

      console.log('Transaction hash:', tx.hash);

      console.log('Emission factor set for travel type:', travelType);

    } catch (error) {
      console.error('Error executing curl command:', error);
    }
  }
};

const getTravelTypeFromUrlParam = (urlParam) => {
  // This function should map url_param to a travel type (uint8) based on your logic
  // Example:
  const mapping = {
    'passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na': 1,
    'passenger_train-route_type_national_rail-fuel_source_na': 2,
    'passenger_train-route_type_underground-fuel_source_na': 3,
    'passenger_flight-route_type_domestic-aircraft_type_na-distance_na-class_na-rf_excluded-distance_uplift_included': 4,
    'passenger_vehicle-vehicle_type_taxi-fuel_source_na-distance_na-engine_size_na': 5,
  };
  return mapping[urlParam] || 0; // Default to 0 if not found
};

// Schedule the task to run every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  console.log('Executing fetchVerify...');
  await executefetchVerify();
});

// Start the server and execute the fetches once
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await executefetchVerify();
});
