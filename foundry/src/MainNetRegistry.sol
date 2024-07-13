// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MainNetRegistry is ReentrancyGuard, Ownable {
    struct User {
        bool registered;
        uint256 points;
        uint256 balance;
    }

    struct UserInfo {
        uint256 points;
        uint256 walking;
        uint256 driving;
        uint256 publicTransport;
        uint256 carbonFootprintOffset;
        uint256 energyConverted;
        uint256 ID;
        uint256 streak;
    }

    mapping(uint256 => address) public idToAddress;
    mapping(address => UserInfo) public addressToUserInfo;
    mapping(address => address[]) public addressToFriends;
    mapping(address => uint256) public addressToMoneySpent;

    address public cUSDAddress;
    address public updaterAddress;

    event UserRegistered(address indexed user, uint256 indexed ID);
    event PointsUpdated(address indexed user, uint256 points);
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event UserInfoUpdated(address indexed user);

    modifier onlyRegistered() {
        require(users[msg.sender].registered, "User is not registered");
        _;
    }

    modifier onlyUpdater() {
        require(msg.sender == updaterAddress, "Caller is not authorized to update");
        _;
    }

    uint256 private currentID = 1;
    mapping(address => User) private users;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function initialize(address _cUSDAddress, address _updaterAddress) external onlyOwner {
        cUSDAddress = _cUSDAddress;
        updaterAddress = _updaterAddress;
    }

    function register() external {
        require(!users[msg.sender].registered, "User is already registered");

        users[msg.sender] = User({registered: true, points: 0, balance: 0});

        uint256 userID = currentID++;
        idToAddress[userID] = msg.sender;
        addressToUserInfo[msg.sender] = UserInfo({
            points: 0,
            walking: 0,
            driving: 0,
            publicTransport: 0,
            carbonFootprintOffset: 0,
            energyConverted: 0,
            ID: userID,
            streak: 0
        });

        emit UserRegistered(msg.sender, userID);
    }

    function updatePoints(address user, uint256 points) external onlyUpdater {
        require(users[user].registered, "User is not registered");

        users[user].points = points;
        addressToUserInfo[user].points = points;

        emit PointsUpdated(user, points);
    }

    function getPoints(address user) external view returns (uint256) {
        require(users[user].registered, "User is not registered");
        return users[user].points;
    }

    function deposit(uint256 amount) external onlyRegistered nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        IERC20 cUSD = IERC20(cUSDAddress);
        require(cUSD.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        users[msg.sender].balance += amount;

        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external onlyRegistered nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(users[msg.sender].balance >= amount, "Insufficient balance");

        IERC20 cUSD = IERC20(cUSDAddress);
        require(cUSD.transfer(msg.sender, amount), "Transfer failed");

        users[msg.sender].balance -= amount;

        emit Withdrawal(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        require(users[user].registered, "User is not registered");
        return users[user].balance;
    }

    function updateUserInfo(
        address user,
        uint256 points,
        uint256 walking,
        uint256 driving,
        uint256 publicTransport,
        uint256 carbonFootprintOffset,
        uint256 energyConverted,
        uint256 streak
    ) external onlyUpdater {
        require(users[user].registered, "User is not registered");

        UserInfo storage userInfo = addressToUserInfo[user];
        userInfo.points = points;
        userInfo.walking = walking;
        userInfo.driving = driving;
        userInfo.publicTransport = publicTransport;
        userInfo.carbonFootprintOffset = carbonFootprintOffset;
        userInfo.energyConverted = energyConverted;
        userInfo.streak = streak;

        emit UserInfoUpdated(user);
    }

    function addFriend(address friend) external onlyRegistered {
        require(users[friend].registered, "Friend is not registered");
        addressToFriends[msg.sender].push(friend);
    }

    function getFriends(address user) external view returns (address[] memory) {
        require(users[user].registered, "User is not registered");
        return addressToFriends[user];
    }

    function addMoneySpent(address user, uint256 amount) external onlyUpdater {
        require(users[user].registered, "User is not registered");
        addressToMoneySpent[user] += amount;
    }

    function getMoneySpent(address user) external view returns (uint256) {
        require(users[user].registered, "User is not registered");
        return addressToMoneySpent[user];
    }

    function getUserInfo(address user) external view returns (UserInfo memory) {
        require(users[user].registered, "User is not registered");
        return addressToUserInfo[user];
    }
}
