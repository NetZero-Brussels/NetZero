// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MainNetRegistry.sol";

contract DeployMainNetRegistry is Script {
    function run(address cUSDAddress, address updaterAddress, address initialOwner) external {
        vm.startBroadcast();
        
        MainNetRegistry registry = new MainNetRegistry(initialOwner);
        registry.initialize(cUSDAddress, updaterAddress);
        
        vm.stopBroadcast();
    }
}
