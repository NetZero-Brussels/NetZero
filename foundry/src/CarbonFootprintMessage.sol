// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library CarbonFootprintMessage {
    function format(
        uint8 _travelType,
        uint256 _distance,
        uint256 _duration
    ) internal pure returns (bytes memory) {
        return abi.encode(_travelType, _distance, _duration);
    }

    function travelType(bytes calldata message) internal pure returns (uint8) {
        require(message.length >= 1, "Message too short for travelType");
        return uint8(message[0]);
    }

    function distance(bytes calldata message) internal pure returns (uint256) {
        require(message.length >= 33, "Message too short for distance");
        return abi.decode(message[1:33], (uint256));
    }

    function duration(bytes calldata message) internal pure returns (uint256) {
        require(message.length >= 65, "Message too short for duration");
        return abi.decode(message[33:65], (uint256));
    }
}
