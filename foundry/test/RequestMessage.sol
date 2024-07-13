// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import {RequestMessage} from "../src/router/message/RequestMessage.sol";

contract RequestMessageTest is DSTest {

    function testFormatAndParse() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;
        uint256 points = 2222;

        bytes memory message = RequestMessage.format(travelType, distance, duration, points);


        // Verify the travelType
        uint8 parsedTravelType = RequestMessage.travelType(message);
        assertEq(parsedTravelType, travelType);

        // Verify the distance
        uint256 parsedDistance = RequestMessage.distance(message);
        assertEq(parsedDistance, distance);

        // Verify the duration
        uint256 parsedDuration = RequestMessage.duration(message);
        assertEq(parsedDuration, duration);
    }

    function testFailWithIncorrectTravelType() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;
        uint256 points = 2222;

        bytes memory message = RequestMessage.format(travelType, distance, duration,points);

        // This should fail
        uint8 incorrectTravelType = travelType + 1;
        assertEq(RequestMessage.travelType(message), incorrectTravelType);
    }

    function testFailWithIncorrectDistance() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;
        uint256 points = 2222;

        bytes memory message = RequestMessage.format(travelType, distance, duration, points);

        // This should fail
        uint256 incorrectDistance = distance + 1;
        assertEq(RequestMessage.distance(message), incorrectDistance);
    }

    function testFailWithIncorrectDuration() public {
        uint8 travelType = 1;
        uint256 distance = 1000;
        uint256 duration = 3600;
        uint256 points = 2222;

        bytes memory message = RequestMessage.format(travelType, distance, duration, points);

        // This should fail
        uint256 incorrectDuration = duration + 1;
        assertEq(RequestMessage.duration(message), incorrectDuration);
    }
}