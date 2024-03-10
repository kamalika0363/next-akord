import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {BellDot, Codesandbox, Server, Settings, ChevronDownIcon} from "lucide-react";
import React from "react";

export default function Sidebar() {
    return (
        <div className="hidden lg:block">
            <div className="flex flex-col gap-8 text-lg font-semibold">
                <div className="-mb-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex flex-row gap-3">
                                <Codesandbox className="text-orange-800" size={24}/>
                                Vaults
                                <ChevronDownIcon className="mt-1 text-orange-800" size={20}/>
                            </div>
                            <DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Vault Name</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenuTrigger>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </div>
                <div className="flex flex-row gap-3">
                    <Server className="text-orange-800" size={24}/>
                    Storage
                </div>
                <div className="flex flex-row gap-3">
                    <BellDot className="text-orange-800" size={24}/>
                    Notifications
                </div>
                <div className="flex flex-row gap-3">
                    <Settings className="text-orange-800" size={24}/>
                    Account
                </div>
            </div>
        </div>
    )
}