"use client";
import React, { useState } from "react";
import { Akord, Auth } from '@akord/akord-js';
import Dashboard from "@/app/(dashboard)/dashboard/page";

export default function Signup() {
    const [akord, setAkord] = useState<Akord | null>();
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');

    const handleSignup = async (event: any) => {
        event.preventDefault();

        if (!email || !pass) {
            setAlertMessage('Please provide both email and password');
            return;
        }

        try {
            const { wallet } = await Auth.signUp(email, pass);
            const akord = await Akord.init(wallet);
            setAkord(akord);
            setAlertMessage(`User ${email} signed up successfully`);
        } catch (error) {
            setAlertMessage(`User ${email} already exists`);
            console.error('Signup failed:', error);
        }
    };

    const verifyAccount = async () => {
        try {
            const verify = await Auth.verifyAccount(email, pass);
            console.log(verify);
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };

    const signupForm = () => {
        return (
            <div className='flex justify-center items-center p-24'>
                <div className="flex flex-col w-96 gap-4">
                    {alertMessage && (
                        <div className="text-red-500 mb-4">
                            {alertMessage}
                        </div>
                    )}
                    <div className="text-2xl font-semibold items-start">
                        Sign up for Akord
                    </div>
                    <div className="text-gray-400">
                        Get 100 MB of personal storage for and 1 GB of cloud storage for free when you sign up for
                        Akord.
                    </div>
                    <form onSubmit={handleSignup} className="mt-4">
                        <div className="gap-4 flex flex-col">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 rounded-sm bg-transparent border border-[#53515c] md:w-96  hover:border-[#9a3412] outline-none"
                                placeholder="Email"
                            />
                        </div>
                        <div className="gap-4 mt-6 flex flex-col">
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="p-3 rounded-sm bg-transparent border border-[#53515c] md:w-96  hover:border-[#9a3412] outline-none"
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex justify-center mt-6 gap-4">
                            <button
                                type="submit"
                                className="hover:bg-[#9a3412] border border-[#53515c] p-3 rounded-sm text-md font-bold">
                                Sign Up
                            </button>
                            <button type="button" onClick={verifyAccount}
                                    className="hover:bg-[#9a3412] border border-[#53515c] p-3 rounded-sm text-md font-bold">
                                Verify Account
                            </button>
                        </div>
                        <div className="mt-8 text-sm md:text-base font-semibold">
                            Already have an account? <a className="text-[#9a3412]" href="/">Log In</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div>
            {akord ? <h1>Already an User</h1> : signupForm()}
        </div>
    )
}

