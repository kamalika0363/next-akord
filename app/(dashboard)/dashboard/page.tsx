"use client";
import React from "react";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/sidebar/sidebar";
import BottomBar from "@/components/sidebar/bottombar";
import Vault from "@/app/(vaults)/(routes)/vaults/page";
import {NextPage} from "next";
import {ModeToggle} from "@/components/modeToggle";

const Dashboard: NextPage = () =>{
    return (
        <div className="px-6 -mt-12">
            <div className="flex mb-8 justify-between">
                <div>
                    <Navbar/>
                </div>
                <div>
                    <ModeToggle/>
                </div>
            </div>
            <div className="flex flex-row">
                <Sidebar/>
                <BottomBar/>
                <div className="lg:ml-24">
                    <div className="flex flex-row gap-2 items-center justify-center font-semibold">
                        <Vault/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;