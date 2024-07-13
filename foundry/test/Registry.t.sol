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

        cUSD = new TokencUSD('cUSD','cUSD');
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
        uint balance = cUSD.balanceOf(user);
        console.log(balance);
        deal(address(cUSD), user, 10 ether);
        registry.register();
        cUSD.approve(address(registry), 10 ether);
        registry.deposit(10 ether);
        vm.stopPrank();
    }

    function test_points() public {
        address user2 = makeAddr("User 2");
        vm.startPrank(user2);
        registry.register();
        vm.stopPrank();

        vm.startPrank(owner);
        registry.addPoints(user2, 5);
        registry.subtractPoints(user2, 3);
        console.log(registry.getPoints(user2));
        vm.stopPrank();
    }

    function test_points2() public {
        address user2 = makeAddr("User 2");
        vm.startPrank(user2);
        registry.register();
        vm.stopPrank();

        vm.startPrank(owner);
        vm.expectRevert();
        registry.subtractPoints(user2, 10);
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
    try registry.register() {
        console.log("User registered successfully");
    } catch (bytes memory reason) {
        console.logBytes(reason);
    }
    vm.stopPrank();

    vm.startPrank(friend);
    try registry.register() {
        console.log("Friend registered successfully");
    } catch (bytes memory reason) {
        console.logBytes(reason);
    }
    vm.stopPrank();

    vm.startPrank(user);
    try registry.addFriend(friend) {
        console.log("Friend added successfully");
    } catch (bytes memory reason) {
        console.logBytes(reason);
    }
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
}
