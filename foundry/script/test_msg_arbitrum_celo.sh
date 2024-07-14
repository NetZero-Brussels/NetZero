#!/bin/bash

source .env
# Set the contract address and function signature
CONTRACT_ADDRESS="0xEf9F292fcEBC3848bF4bB92a96a04F9ECBb78E59"  # Replace with your contract address
FUNCTION_SIGNATURE="dispatch(uint32,bytes32,bytes)"

# Set the parameters for the dispatch function
DESTINATION_DOMAIN=421614  # Replace with the actual destination domain
RECIPIENT_ADDRESS="0x0000000000000000000000002Ab42F5d4AA4a988E6027D5C31C9d61becc6977E"
MESSAGE_BODY="Hello net zero!"  # Replace with your message

# Convert parameters to required format
RECIPIENT_ADDRESS_HEX=$(cast --to-bytes32 "$RECIPIENT_ADDRESS")
MESSAGE_BODY_HEX=$(cast --from-ascii "$MESSAGE_BODY")

ETH_VALUE="1000000000000000"  # Set to the amount of Ether to send (in wei)

# Send the transaction using cast
cast send "$CONTRACT_ADDRESS" \
    "$FUNCTION_SIGNATURE" \
    "$DESTINATION_DOMAIN" \
    "$RECIPIENT_ADDRESS_HEX" \
    "$MESSAGE_BODY_HEX" \
    --private-key "$PRIVATE_KEY" \
    --value "$ETH_VALUE" \
    --rpc-url 	https://sepolia-rollup.arbitrum.io/rpc  # Replace with your RPC URL

# Print confirmation
echo "Message sent from $CONTRACT_ADDRESS to $RECIPIENT_ADDRESS: $MESSAGE_BODY"