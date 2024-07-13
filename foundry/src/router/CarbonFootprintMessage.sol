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

    function travelType(bytes memory message) internal pure returns (uint8) {
        require(message.length >= 1, "Message too short for travelType");
        (uint8 travelType, uint256 distance, uint256 duration) = abi.decode(message, (uint8, uint256, uint256));
        return travelType;
    }

    function distance(bytes memory message) internal pure returns (uint256) {
        require(message.length >= 33, "Message too short for distance");
        (uint8 travelType, uint256 distance, uint256 duration) = abi.decode(message, (uint8, uint256, uint256));
        return distance;
    }

    function duration(bytes memory message) internal pure returns (uint256) {
        require(message.length >= 33, "Message too short for distance");
        (uint8 travelType, uint256 distance, uint256 duration) = abi.decode(message, (uint8, uint256, uint256));
        return duration;
    }
}
