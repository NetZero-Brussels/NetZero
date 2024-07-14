import { useState } from 'react';
import NetZeroIcon from "../../public/NetZeroIcon.svg";
import Image from 'next/image';
import { useWeb3 } from "@/contexts/useWeb3";
import Router from 'next/router';
import Blockscout from "../../public/blockscout.jpeg";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const RegistrationPage = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [transactionHash, setTransactionHash] = useState<string>('');

    const {
        address,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
        registerUser,
        updateUserPoints,
        depositToUser,
        approveSpending,
        withdrawFromUser,
        getUserInfo,
        addFriend,
        getMoneySpent,
        getFriends,
        updateUpdaterAddress,
    } = useWeb3();

    async function handleRegister() {
        try {
            const receipt = await registerUser();
            console.log("User registered:", receipt);
            setTransactionHash(receipt.transactionHash);
            setIsModalOpen(true);
            checkUserRegistration();
        } catch (error) {
            console.error("Error registering user:", error);
            setIsModalOpen(true);
        }
    }

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

    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleNextStep = async () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else {
            handleRegister();
            //TODO send values to the blockchain / save to localstorage
        }
    };

    const closeModalAndRedirect = () => {
        setIsModalOpen(false);
        Router.push("/impact");
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-between mb-4">
                    <Image priority src={NetZeroIcon} alt="NetZero Icon"></Image>
                    {step === 1 && (
                        <span className="text-green-500 font-bold">Step 1/3</span>
                    )}
                    {step === 2 && (
                        <span className="text-green-500 font-bold">Step 2/3</span>
                    )}
                    {step === 3 && (
                        <span className="text-green-500 font-bold">Step 3/3</span>
                    )}
                </div>
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="agreeTerms"
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <label htmlFor="agreeTerms" className="ml-2 block text-gray-700">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleNextStep}
                        >
                            Next
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Email Verification</h2>
                        <div className="mb-4">
                            <label htmlFor="verificationCode" className="block text-gray-700 font-bold mb-2">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                id="verificationCode"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter the verification code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleNextStep}
                        >
                            Confirm
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Complete Registration</h2>
                        <p className='text-center mb-4'>Create or Sign into your Celo wallet.</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleNextStep}
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="registration-success-dialog-title"
            >
                <DialogTitle id="registration-success-dialog-title">Successfully Registered</DialogTitle>
                <DialogContent>
                    <div className="flex justify-center mb-4">
                        <Image src={Blockscout} alt="Blockscout Logo" width={50} height={50} />
                    </div>
                    <p className="text-center mb-4">You have successfully registered. Click the link below to view your transaction.</p>
                    <div className="flex justify-center">
                        <a
                            href={`https://explorer.celo.org/alfajores/tx/${transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            View Transaction on Blockscout
                        </a>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModalAndRedirect} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RegistrationPage;
