// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import {CarbonFootprintMessage} from "../src/router/CarbonFootprintMessage.sol";

contract CarbonFootprintMessageTest is DSTest {

    function testFormatAndParse() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;

        bytes memory message = CarbonFootprintMessage.format(travelType, distance, duration);


        // Verify the travelType
        uint8 parsedTravelType = CarbonFootprintMessage.travelType(message);
        assertEq(parsedTravelType, travelType);

        // Verify the distance
        uint256 parsedDistance = CarbonFootprintMessage.distance(message);
        assertEq(parsedDistance, distance);

        // Verify the duration
        uint256 parsedDuration = CarbonFootprintMessage.duration(message);
        assertEq(parsedDuration, duration);
    }

    function testFailWithIncorrectTravelType() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;

        bytes memory message = CarbonFootprintMessage.format(travelType, distance, duration);

        // This should fail
        uint8 incorrectTravelType = travelType + 1;
        assertEq(CarbonFootprintMessage.travelType(message), incorrectTravelType);
    }

    function testFailWithIncorrectDistance() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;

        bytes memory message = CarbonFootprintMessage.format(travelType, distance, duration);

        // This should fail
        uint256 incorrectDistance = distance + 1;
        assertEq(CarbonFootprintMessage.distance(message), incorrectDistance);
    }

    function testFailWithIncorrectDuration() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;

        bytes memory message = CarbonFootprintMessage.format(travelType, distance, duration);

        // This should fail
        uint256 incorrectDuration = duration + 1;
        assertEq(CarbonFootprintMessage.duration(message), incorrectDuration);
    }
}