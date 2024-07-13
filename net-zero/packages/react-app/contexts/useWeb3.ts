import { useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import MinipayNFTABI from "./minipay-nft.json";
import UserRegistryABI from "./user-registry-abi.json";
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";
import { celoAlfajores } from "viem/chains";

const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});

const cUSDTokenAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const MINIPAY_NFT_CONTRACT = "0xE8F4699baba6C86DA9729b1B0a1DA1Bd4136eFeF";
const USER_REGISTRY_CONTRACT = "0xdb9ebe37196b2e2e8043338c482cf2b9c58c7b06";

export const useWeb3 = () => {
    const [address, setAddress] = useState<string | null>(null);

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            let walletClient = createWalletClient({
                transport: custom(window.ethereum),
                chain: celoAlfajores,
            });

            let [address] = await walletClient.getAddresses();
            setAddress(address);
        }
    };

    const sendCUSD = async (to: string, amount: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: cUSDTokenAddress,
            abi: StableTokenABI.abi,
            functionName: "transfer",
            account: address,
            args: [to, amountInWei],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const mintMinipayNFT = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: MINIPAY_NFT_CONTRACT,
            abi: MinipayNFTABI.abi,
            functionName: "safeMint",
            account: address,
            args: [
                address,
                "https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/sections/2023/hero-top/products/minipay/minipay__desktop@2x.a17626ddb042.webp",
            ],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const getNFTs = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        const minipayNFTContract = getContract({
            abi: MinipayNFTABI.abi,
            address: MINIPAY_NFT_CONTRACT,
            client: publicClient,
        });

        const [address] = await walletClient.getAddresses();
        const nfts: any = await minipayNFTContract.read.getNFTsByAddress([
            address,
        ]);

        let tokenURIs: string[] = [];

        for (let i = 0; i < nfts.length; i++) {
            const tokenURI: string = (await minipayNFTContract.read.tokenURI([
                nfts[i],
            ])) as string;
            tokenURIs.push(tokenURI);
        }
        return tokenURIs;
    };

    const signTransaction = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const res = await walletClient.signMessage({
            account: address,
            message: stringToHex("Hello from Celo Composer MiniPay Template!"),
        });

        return res;
    };

    const registerUser = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: USER_REGISTRY_CONTRACT,
            abi: UserRegistryABI,
            functionName: "register",
            account: address,
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const updateUserPoints = async (userAddress: string, points: number) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: USER_REGISTRY_CONTRACT,
            abi: UserRegistryABI,
            functionName: "updatePoints",
            account: address,
            args: [userAddress, points],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const approveSpending = async (amount: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: cUSDTokenAddress,
            abi: StableTokenABI.abi,
            functionName: "approve",
            account: address,
            args: [USER_REGISTRY_CONTRACT, amountInWei],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const depositToUser = async (amount: string) => {
        if (!amount) {
            throw new Error("Amount to deposit must be provided.");
        }

        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: USER_REGISTRY_CONTRACT,
            abi: UserRegistryABI,
            functionName: "deposit",
            account: address,
            args: [amountInWei.toString()],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const withdrawFromUser = async (amount: string) => {
        if (!amount) {
            throw new Error("Amount to withdraw must be provided.");
        }

        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: USER_REGISTRY_CONTRACT,
            abi: UserRegistryABI,
            functionName: "withdraw",
            account: address,
            args: [amountInWei.toString()],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const getUserInfo = async (userAddress: string) => {
        let userRegistryContract = getContract({
            abi: UserRegistryABI,
            address: USER_REGISTRY_CONTRACT,
            client: publicClient,
        });

        try {
            const userInfo = await userRegistryContract.read.getUserInfo([
                userAddress,
            ]);

            return userInfo;
        } catch (error) {
            console.error("Error fetching user info:", error);
            throw error;
        }
    };

    const addFriend = async (friendAddress: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: USER_REGISTRY_CONTRACT,
            abi: UserRegistryABI,
            functionName: "addFriend",
            account: address,
            args: [friendAddress],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const getFriends = async (userAddress: string) => {
        let userRegistryContract = getContract({
            abi: UserRegistryABI,
            address: USER_REGISTRY_CONTRACT,
            client: publicClient,
        });

        try {
            const friends = await userRegistryContract.read.getFriends([
                userAddress,
            ]);
            return friends;
        } catch (error) {
            console.error("Error fetching friends:", error);
            throw error;
        }
    };

    const getMoneySpent = async (userAddress: string) => {
        let userRegistryContract = getContract({
            abi: UserRegistryABI,
            address: USER_REGISTRY_CONTRACT,
            client: publicClient,
        });

        try {
            const moneySpent = await userRegistryContract.read.getMoneySpent([
                userAddress,
            ]);
            return moneySpent;
        } catch (error) {
            console.error("Error fetching money spent:", error);
            throw error;
        }
    };

    return {
        address,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
        registerUser,
        updateUserPoints,
        approveSpending,
        depositToUser,
        withdrawFromUser,
        getUserInfo,
        addFriend,
        getFriends,
        getMoneySpent,
    };
};
