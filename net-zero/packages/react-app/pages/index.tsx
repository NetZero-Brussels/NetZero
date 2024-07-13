/* eslint-disable react-hooks/exhaustive-deps */
import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";
import { parseEther } from 'viem';
import JSONbig from 'json-bigint';

export default function Home() {
    const {
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
        getUserInfo,
        addFriend,
    } = useWeb3();

    const [cUSDLoading, setCUSDLoading] = useState(false);
    const [nftLoading, setNFTLoading] = useState(false);
    const [signingLoading, setSigningLoading] = useState(false);
    const [userOwnedNFTs, setUserOwnedNFTs] = useState<string[]>([]);
    const [tx, setTx] = useState<any>(undefined);
    const [friendAddress, setFriendAddress] = useState("");
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    useEffect(() => {
        getUserAddress();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const tokenURIs = await getNFTs();
            setUserOwnedNFTs(tokenURIs);
        };

        if (address) {
            fetchData();
            checkUserRegistration();
        }
    }, [address]);

    const checkUserRegistration = async () => {
        try {
            const info = await getUserInfo(address!);
            setUserInfo(info);
            setIsRegistered(true);
        } catch (error) {
            console.log("User is not registered");
            setIsRegistered(false);
        }
    };

    async function sendingCUSD() {
        if (!address) {
            console.error('Address is not available.');
            return;
        }

        setCUSDLoading(true);
        try {
            const tx = await sendCUSD(address, "0.1");
            setTx(tx);
        } catch (error) {
            console.error('Error sending CUSD:', error);
        } finally {
            setCUSDLoading(false);
        }
    }

    async function signMessage() {
        setSigningLoading(true);
        try {
            await signTransaction();
        } catch (error) {
            console.error('Error signing message:', error);
        } finally {
            setSigningLoading(false);
        }
    }

    async function mintNFT() {
        setNFTLoading(true);
        try {
            const tx = await mintMinipayNFT();
            const tokenURIs = await getNFTs();
            setUserOwnedNFTs(tokenURIs);
            setTx(tx);
        } catch (error) {
            console.error('Error minting NFT:', error);
        } finally {
            setNFTLoading(false);
        }
    }

    async function handleRegister() {
        setNFTLoading(true);
        try {
            const receipt = await registerUser();
            console.log('User registered:', receipt);
            checkUserRegistration();
        } catch (error) {
            console.error('Error registering user:', error);
        } finally {
            setNFTLoading(false);
        }
    }

    async function handleAddPoints() {
        try {
            const pointsToAdd = 100;
            const receipt = await addUserPoints(address!, pointsToAdd);
            console.log('Points added:', receipt);
        } catch (error) {
            console.error('Error adding points:', error);
        }
    }

    async function handleApproval() {
        try {
            const amountToDeposit = '10';
            const amountInWei = parseEther(amountToDeposit);
            const receipt = await approveSpending(amountInWei.toString());
            console.log('Approval done:', receipt);
        } catch (error) {
            console.error('Error approving spending:', error);
        }
    }

    async function handleDeposit() {
        try {
            const amountToDeposit = '0.05';
            const receipt = await depositToUser(amountToDeposit.toString());
            console.log('Deposited:', receipt);
        } catch (error) {
            console.error('Error depositing:', error);
        }
    }

    async function handleWithdraw() {
        try {
            const amountToWithdraw = '0.05';
            const receipt = await withdrawFromUser(amountToWithdraw.toString());
            console.log('Withdrawn:', receipt);
        } catch (error) {
            console.error('Error withdrawing:', error);
        }
    }

    async function handleAddFriend() {
        try {
            const receipt = await addFriend(friendAddress);
            console.log('Friend added:', receipt);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {!address && (
                <div className="h1">Please install Metamask and connect.</div>
            )}
            {address && (
                <div className="h1">
                    There you go... a canvas for your next Minipay project!
                </div>
            )}

            {address && (
                <>
                    <div className="h2 text-center">
                        Your address:{" "}
                        <span className="font-bold text-sm">{address}</span>
                    </div>
                    {tx && (
                        <p className="font-bold mt-4">
                            Tx Completed:{" "}
                            {(tx.transactionHash as string).substring(0, 6)}
                            ...
                            {(tx.transactionHash as string).substring(
                                tx.transactionHash.length - 6,
                                tx.transactionHash.length
                            )}
                        </p>
                    )}
                    <div className="w-full px-3 mt-7">
                        <PrimaryButton
                            loading={signingLoading}
                            onClick={sendingCUSD}
                            title="Send 0.1 cUSD to your own address"
                            widthFull
                        />
                    </div>

                    <div className="w-full px-3 mt-6">
                        <PrimaryButton
                            loading={cUSDLoading}
                            onClick={signMessage}
                            title="Sign a Message"
                            widthFull
                        />
                    </div>

                    {userOwnedNFTs.length > 0 ? (
                        <div className="flex flex-col items-center justify-center w-full mt-7">
                            <p className="font-bold">My NFTs</p>
                            <div className="w-full grid grid-cols-2 gap-3 mt-3 px-2">
                                {userOwnedNFTs.map((tokenURI, index) => (
                                    <div
                                        key={index}
                                        className="p-2 border-[3px] border-colors-secondary rounded-xl"
                                    >
                                        <Image
                                            alt="MINIPAY NFT"
                                            src={tokenURI}
                                            className="w-[160px] h-[200px] object-cover"
                                            width={160}
                                            height={200}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5">You do not have any NFTs yet</div>
                    )}

                    <div className="w-full px-3 mt-5">
                        <PrimaryButton
                            loading={nftLoading}
                            onClick={mintNFT}
                            title="Mint Minipay NFT"
                            widthFull
                        />
                    </div>

                    {!isRegistered && (
                        <div className="w-full px-3 mt-5">
                            <PrimaryButton
                                onClick={handleRegister}
                                title="Register User"
                                widthFull
                            />
                        </div>
                    )}

                    {isRegistered && (
                        <>
                            <div className="w-full px-3 mt-5">
                                <PrimaryButton
                                    onClick={handleAddPoints}
                                    title="Add Points"
                                    widthFull
                                />
                            </div>

                            <div className="w-full px-3 mt-5">
                                <PrimaryButton
                                    onClick={handleApproval}
                                    title="Approve Deposit"
                                    widthFull
                                />
                            </div>

                            <div className="w-full px-3 mt-5">
                                <PrimaryButton
                                    onClick={handleDeposit}
                                    title="Deposit"
                                    widthFull
                                />
                            </div>

                            <div className="w-full px-3 mt-5">
                                <PrimaryButton
                                    onClick={handleWithdraw}
                                    title="Withdraw"
                                    widthFull
                                />
                            </div>

                            <div className="w-full px-3 mt-5">
                                <input
                                    type="text"
                                    value={friendAddress}
                                    onChange={(e) => setFriendAddress(e.target.value)}
                                    placeholder="Enter Friend's Address"
                                    className="border rounded p-2"
                                />
                                <PrimaryButton
                                    onClick={handleAddFriend}
                                    title="Add Friend"
                                    widthFull
                                />
                            </div>

                            {userInfo && (
                                <div className="mt-5">
                                    <h3 className="font-bold">User Info:</h3>
                                    <pre>{JSONbig.stringify(userInfo, null, 2)}</pre>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
