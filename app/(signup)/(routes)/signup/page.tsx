"use client";
import React, {useState} from "react";
import {Akord, Auth} from '@akord/akord-js';
import Dashboard from "@/app/(dashboard)/(routes)/dashboard/page";

function Signup({onSignup}: { onSignup: (signedUp: boolean) => void }) {
    const [akord, setAkord] = useState<Akord | null>();
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const handleSignup = async (event: any) => {
        event.preventDefault();

        if (!email) {
            throw new Error('Missing email');
        }
        if (!pass) {
            throw new Error('Missing pass');
        }

        try {
            const {wallet} = await Auth.signUp(email, pass);
            const akord = await Akord.init(wallet);
            setAkord(akord);
            // setSignedUp(true);
            // onSignup(true);
        } catch (error) {
            console.error('Signup failed:', error);
            // setSignedUp(false);
            // onSignup(false);
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

export default Signup;
