import { useState } from 'react';
import NetZeroIcon from "../../public/NetZeroIcon.svg";
import Image from 'next/image';

const RegistrationPage = () => {
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

            //TODO send values to the blockchain / save to localstorage
        }
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
                        <h2 className="text-2xl font-bold mb-4  text-center">Complete Registration</h2>
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
        </div>
    );
};

export default RegistrationPage;