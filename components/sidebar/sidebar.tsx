"use client";
import React, {useState, useEffect} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {BellDot, Codesandbox, Server, Settings, ChevronDownIcon} from "lucide-react";
import Vault from "@/app/(vaults)/(routes)/vaults/page";
import {Akord, Auth} from "@akord/akord-js";
import Link from "next/link";

interface VaultDetails {
    id: string;
    name: string;
    status: string;
    type: string;
    description: string;
    createdAt: string;
    modifiedOn: string;
}

export default function Sidebar() {
    const [vaults, setVaults] = useState<VaultDetails[]>([]);

    useEffect(() => {
        fetchVaults().then(r => r);
    }, []);

    const fetchVaults = async () => {
        try {
            const {wallet} = await Auth.authenticate();
            const akord = await Akord.init(wallet);
            const vaults = await akord.vault.listAll();
            const vaultDetails = vaults.map((vault) => ({
                id: vault.id,
                name: vault.name,
                status: vault.status,
                type: vault.tags,
                description: vault.description,
                createdAt: vault.createdAt,
                modifiedOn: vault.updatedAt,
            }));
            const activeVaults = vaultDetails.filter(vault => vault.status === 'ACTIVE');
            // @ts-ignore
            setVaults(activeVaults);
        } catch (error) {
            console.error("Error fetching vaults:", error);
        }
    }

    return (
        <div className="hidden lg:block">
            <div className="flex flex-col gap-8 text-lg font-semibold">
                <div className="-mb-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex flex-row gap-3 mb-6">
                                <Codesandbox className="text-orange-800" size={24}/>
                                Vaults
                                <ChevronDownIcon className="mt-1 text-orange-800" size={20}/>
                            </div>
                            <DropdownMenuContent>
                                {vaults.map((vault) => (
                                    <DropdownMenuItem key={vault.id}>
                                        <div className="flex flex-row gap-3">
                                            <Server className="text-orange-800" size={24}/>
                                            <Link href={`/vaults/${vault.id}/assets`}>{vault.name}</Link>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </div>
                <div className="flex flex-row gap-3">
                    <Server className="text-orange-800" size={24}/>
                    <Link href={`/storage`}>Storage</Link>
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
