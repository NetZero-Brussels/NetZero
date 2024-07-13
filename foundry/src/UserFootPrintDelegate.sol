// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract UserFootPrintDelegate {
    uint256 public number;


    // IMailbox mailbox = IMailbox("0xEf9F292fcEBC3848bF4bB92a96a04F9ECBb78E59");
    // uint32 destination = 97;
    // bytes32 recipient = "0x0000000000000000000000006489d13AcAd3B8dce4c5B31f375DE4f9451E7b38";
    // bytes memory body = bytes("Hello, world");
    // uint256 fee = mailbox.quoteDispatch(destination, recipient, body);
    // mailbox.dispatch{value: fee}(destination, recipient, body);

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}