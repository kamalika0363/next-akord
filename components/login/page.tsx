"use client";
import {Akord, Auth} from '@akord/akord-js'
import Head from 'next/head'
import React, {useEffect, useState} from 'react'

import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import Dashboard from "@/app/(dashboard)/dashboard/page";

function Login({onLogin}: { onLogin: (loggedIn: boolean) => void }) {
    const [akord, setAkord] = useState<Akord | null>(null);
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) {
            throw new Error('Missing email');
        }
        if (!pass) {
            throw new Error('Missing pass');
        }

        try {
            const {wallet, jwt} = await Auth.signIn(email, pass);
            const user = {email, jwt, wallet}
            const akord = await Akord.init(wallet);
            Auth.configure({storage:window.sessionStorage});
            setAkord(akord);
            setLoggedIn(true);
            onLogin(true);
            localStorage.setItem('loggedIn', 'true');
        } catch (error) {
            console.error('Login failed:', error);
            setLoggedIn(false);
            onLogin(false);
        }
    };

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('loggedIn');
        if (isUserLoggedIn === 'true') {
            setLoggedIn(true);
        }
    }, []);

    const {setTheme} = useTheme()

    const loginForm = () => {
        return (
            <div className="flex justify-center items-center">
                <div className="flex flex-col gap-4">
                    <div className="flex mr-auto font-bold text-3xl">
                        Akord
                    </div>
                    <div className="font-bold text-[#9a3412] text-3xl">
                        Log In
                    </div>
                    <form onSubmit={handleLogin} className="mt-4">
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
                        <div>
                            <button
                                className="flex w-full justify-center mt-6 hover:bg-[#9a3412] border border-[#53515c] p-3 rounded-sm text-md font-bold"
                                type="submit">
                                Log In
                            </button>
                        </div>
                        <div className="mt-8 text-sm md:text-base font-semibold">
                            Forgot your password? <a className="text-[#9a3412]" href="/login">Recover your account</a>
                        </div>
                        <div className="mt-2 text-sm md:text-base font-semibold">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Don't have an account? <a className="text-[#9a3412]" href="/signup">Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            <Head>
                <title>Akord</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="vh-100 d-flex justify-content-center align-items-center">
                {akord ? <Dashboard/> : loginForm()}
            </main>
        </div>
    )
}

export default Login