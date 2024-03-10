"use client";
import Image from "next/image";
import {ModeToggle} from "@/components/modeToggle";
import Login from "@/components/login/page";
import Navbar from "@/components/Navbar/page";
import {useState} from "react";

export default function Home() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <main className="flex min-h-screen flex-col p-4 md:p-8">
            <div className="flex justify-between">
                {isLoggedIn && <Navbar />}
                <ModeToggle />
            </div>
            <div className="mt-12">
                <Login onLogin={setLoggedIn} />
            </div>
        </main>
    );
}
