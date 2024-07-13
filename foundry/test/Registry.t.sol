// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MainNetRegistry} from "../src/MainNetRegistry.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TokencUSD} from "../src/cUSD.sol";

contract RegistryTest is Test {
    MainNetRegistry public registry;
    TokencUSD public cUSD;
    address public updater;
    address public owner;

    address constant REGISTRY_ADDRESS = 0xDB9EBe37196B2e2E8043338C482cf2B9C58C7b06;
    address constant CUSD_ADDRESS = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    function setUp() public {
        owner = makeAddr("Owner");
        updater = makeAddr("Updater");

        cUSD = new TokencUSD('cUSD', 'cUSD');
        registry = new MainNetRegistry(owner);
        vm.prank(owner);
        registry.initialize(address(cUSD), address(updater));
    }

    function test_register() public {
        address user = makeAddr("User");
        vm.startPrank(user);
        registry.register();
        vm.stopPrank();
    }

    function test_deposit() public {
        address user = makeAddr("User");
        vm.startPrank(user);
        deal(address(cUSD), user, 10 ether);
        registry.register();
        cUSD.approve(address(registry), 10 ether);
        registry.deposit(10 ether);
        vm.stopPrank();
    }

    function test_update_points() public {
        address user2 = makeAddr("User 2");
        vm.startPrank(user2);
        registry.register();
        vm.stopPrank();

        vm.startPrank(updater);
        registry.updatePoints(user2, 5);
        assertEq(registry.getPoints(user2), 5);
        vm.stopPrank();
    }

    function test_subtract_points() public {
        address user2 = makeAddr("User 2");
        vm.startPrank(user2);
        registry.register();
        vm.stopPrank();

        vm.startPrank(updater);
        registry.updatePoints(user2, 5);
        // vm.expectRevert();
        registry.updatePoints(user2, 10);
        vm.stopPrank();
    }

    function test_update_user_info() public {
        address user = makeAddr("User");
        vm.startPrank(user);
        registry.register();
        vm.stopPrank();

        vm.startPrank(updater);
        registry.updateUserInfo(user, 10, 5, 2, 3, 1, 4, 7);
        vm.stopPrank();
    }

    function test_add_friend() public {
        address user = makeAddr("User");
        address friend = makeAddr("Friend");
        
        vm.startPrank(user);
        registry.register();
        vm.stopPrank();

        vm.startPrank(friend);
        registry.register();
        vm.stopPrank();

        vm.startPrank(user);
        registry.addFriend(friend);
        address[] memory friends = registry.getFriends(user);
        assertEq(friends.length, 1);
        assertEq(friends[0], friend);
        vm.stopPrank();
    }

    function test_money_spent() public {
        address user = makeAddr("User");
        vm.startPrank(user);
        registry.register();
        vm.stopPrank();

        vm.startPrank(updater);
        registry.addMoneySpent(user, 50);
        uint256 moneySpent = registry.getMoneySpent(user);
        assertEq(moneySpent, 50);
        vm.stopPrank();
    }

    function test_set_updater_address() public {
        address newUpdater = makeAddr("New Updater");
        
        vm.startPrank(owner);
        registry.setUpdaterAddress(newUpdater);
        assertEq(registry.updaterAddress(), newUpdater);
        vm.stopPrank();

        // vm.startPrank(updater);
        // vm.expectRevert("Caller is not authorized to update");
        // registry.setUpdaterAddress(makeAddr("Another Updater"));
        // vm.stopPrank();
    }
}
