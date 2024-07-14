// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ICalculate} from "./ICalculate.sol"; 
import {ResponseMessage} from "../message/ResponseMessage.sol";

contract MockCalculate is ICalculate {

    using ResponseMessage for bytes;

    uint256 public carbonEmissionFactor;
    bytes public merkleRoot;

    function calculate(uint8 travelType, uint256 distance, uint256 duration, uint256 points) external view returns (bytes memory) {
        bytes memory message = ResponseMessage.format(399, 5000, 40);
        return message;
    }

}