import React from "react";
import { BellDot, Codesandbox, Server, Settings } from "lucide-react";

export default function BottomBar() {
    return (
        <div className="lg:hidden fixed bottom-0 p-4 w-full">
            <div className="flex justify-around mr-5 items-center gap-4 sm:text-lg text-sm font-semibold text-orange-800">
                <div className="flex flex-col justify-center items-center">
                    <Codesandbox size="24" />
                    <span className="text-xs">Vaults</span>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <Server size="24" />
                    <span className="text-xs">Storage</span>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <BellDot size="24" />
                    <span className="text-xs">Notifications</span>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <Settings size="24" />
                    <span className="text-xs">Account</span>
                </div>
            </div>
        </div>
    );
}
