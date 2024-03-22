import React, {useEffect, useState} from "react";
import {BellDot, ChevronDownIcon, Codesandbox, Server, Settings} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {Akord, Auth} from "@akord/akord-js";

interface VaultDetails {
    id: string;
    name: string;
    status: string;
    type: string;
    description: string;
    createdAt: string;
    modifiedOn: string;
}

export default function BottomBar() {
    const [vaults, setVaults] = useState<VaultDetails[]>([]);

    useEffect(() => {
        fetchVaults().then(r => r);
    }, []);

    const fetchVaults = async () => {
        try {
            const { wallet } = await Auth.authenticate();
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
        <div className="lg:hidden fixed bottom-0 py-4 px-12  w-full">
            <div className="flex justify-around -ml-20 items-center gap-4 sm:text-lg text-sm font-semibold text-orange-800">
                <div className="flex flex-col justify-center items-center">
                    <span className="text-xs">
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex flex-col justify-center items-center">
                                <Codesandbox className="text-orange-800" size={28} />
                                Vaults
                            </div>
                            <DropdownMenuContent className="mx-4">
                                {vaults.map((vault) => (
                                    <DropdownMenuItem key={vault.id}>
                                        <div className="flex flex-row gap-3">
                                            <Server className="text-orange-800" size={24} />
                                            <Link href={`/vaults/${vault.id}/assets`}>{vault.name}</Link>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    </span>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <Server size="24" />
                    <Link className="text-xs" href={`/storage`}>Storage</Link>
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
