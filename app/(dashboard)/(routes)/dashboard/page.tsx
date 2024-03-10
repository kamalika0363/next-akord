import React from "react";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/sidebar/sidebar";
import {Cog, LogOut, MessageSquareText, PlusSquare, Search, VaultIcon} from "lucide-react";
import BottomBar from "@/components/sidebar/bottombar";

export default function Dashboard() {
    return (
        <div className="flex flex-row">
            <Sidebar/>
            <BottomBar/>
            <div className="lg:ml-24">
                <div className="flex flex-row gap-2 items-center justify-center font-semibold">
                   <VaultIcon className="h-10"/> Vault
                </div>
            </div>
        </div>
    )
}