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
const USER_REGISTRY_CONTRACT = "0xDB9EBe37196B2e2E8043338C482cf2B9C58C7b06";

export const useWeb3 = () => {
    const [address, setAddress] = useState<string | null>(null);

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            console.log("Hello");
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
            abi: UserRegistryABI.abi,
            functionName: "register",
            account: address,
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const addUserPoints = async (userAddress: string, points: number) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: USER_REGISTRY_CONTRACT,
            abi: UserRegistryABI.abi,
            functionName: "addPoints",
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
            abi: UserRegistryABI.abi,
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
            abi: UserRegistryABI.abi,
            functionName: "withdraw",
            account: address,
            args: [amountInWei.toString()],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    return {
        address,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
        registerUser,
        addUserPoints,
        depositToUser,
        approveSpending,
        withdrawFromUser,
    };
};
