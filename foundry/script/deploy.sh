#!/bin/bash

source .env

# 1) Deploy mock calculator on Arbitrum
# echo "Deploying MockCalculate contract on Arbitrum..."
# MOCK_CALCULATE_ARBITRUM_ADDRESS=$(forge create MockCalculate --rpc-url $ARBITRUM_RPC --private-key $PRIVATE_KEY --json | jq -r '.deployedTo')
# echo "MockCalculate contract deployed at: $MOCK_CALCULATE_ARBITRUM_ADDRESS"
# echo "MOCK_CALCULATE_ARBITRUM_ADDRESS=$MOCK_CALCULATE_ARBITRUM_ADDRESS" >> .env


# # set the mock environment variables
# echo "MOCK_CELO_ADDRESS=$(forge create mock --name mock-celo --network celo --address $CELO_ROUTER_ADDRESS --private-key $PRIVATE_KEY --rpc-url $CELO_RPC --json | jq -r '.deployedTo')" >> .env

# # 2) Deploy router on Celo
# echo "Deploying router on Celo..."
# CELO_ROUTER_ADDRESS=$(forge create CeloCarbonCalcRouter --constructor-args $CELO_MAILBOX_ADDRESS --private-key $PRIVATE_KEY --rpc-url $CELO_RPC --json | jq -r '.deployedTo')
# echo "Celo router deployed at: $CELO_ROUTER_ADDRESS"

# # 3) Deploy router on Arbitrum
echo "Deploying router on Arbitrum..."
ARBITRUM_ROUTER_ADDRESS=$(forge create arbrouter --network arbitrum --private-key $PRIVATE_KEY --rpc-url $ARBITRUM_RPC --json | jq -r '.deployedTo')
echo "Arbitrum router deployed at: $ARBITRUM_ROUTER_ADDRESS"

# # 4) Send a test cast on the Celo router
# echo "Sending test cast on the Celo router..."
# TEST_TX_HASH=$(forge send $CELO_ROUTER_ADDRESS --function "yourFunctionName()" --private-key $PRIVATE_KEY --rpc-url $CELO_RPC --json | jq -r '.transactionHash')
# echo "Test cast transaction hash: $TEST_TX_HASH"

# # 5) Check the output of the test cast from an event listener
# echo "Checking output from event listener..."

# # Replace the following line with the appropriate command to listen for events
# # This is just a placeholder and needs to be adjusted according to your setup
# forge listen --rpc-url $CELO_RPC --event "EventName" --from-block latest

# # Save addresses to a file for later use
# echo "CELO_ROUTER_ADDRESS=$CELO_ROUTER_ADDRESS" >> .env
# echo "ARBITRUM_ROUTER_ADDRESS=$ARBITRUM_ROUTER_ADDRESS" >> .env

# echo "Script completed."
