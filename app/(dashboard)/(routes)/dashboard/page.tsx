"use client";
import React from "react";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/sidebar/sidebar";
import BottomBar from "@/components/sidebar/bottombar";
import Vault from "@/app/(vaults)/(routes)/vaults/page";

export default function Dashboard() {
    return (
        <div className="flex flex-row">
            <Sidebar/>
            <BottomBar />
            <div className="lg:ml-24">
                <div className="flex flex-row gap-2 items-center justify-center font-semibold">
                    <Vault />
                </div>
            </div>
        </div>
    )
}