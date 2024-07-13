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

    // address constant REGISTRY_ADDRESS = ;
    // address constant CUSD_ADDRESS = ;

    // function setUp() public {
    //     owner = makeAddr("Owner");
    //     updater = makeAddr("Updater");

    //     cUSD = TokencUSD(CUSD_ADDRESS);
    //     registry = MainNetRegistry(REGISTRY_ADDRESS);
    // }

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

    // function test_update_user_info() public {
    //     address user = makeAddr("User");
    //     vm.startPrank(user);
    //     registry.register();
    //     vm.stopPrank();

    //     vm.startPrank(updater);
    //     registry.updateUserInfo(user, 10, 5, 2, 3, 1, 4, 7);
    //     MainNetRegistry.UserInfo memory userInfo = registry.addressToUserInfo(user);
    //     assertEq(userInfo.points, 10);
    //     assertEq(userInfo.walking, 5);
    //     assertEq(userInfo.driving, 2);
    //     assertEq(userInfo.publicTransport, 3);
    //     assertEq(userInfo.carbonFootprintOffset, 1);
    //     assertEq(userInfo.energyConverted, 4);
    //     assertEq(userInfo.streak, 7);
    //     vm.stopPrank();
    // }

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
}
