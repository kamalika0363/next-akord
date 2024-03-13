"use client";
import React, { useState, useEffect } from "react";
import { Akord, Auth } from '@akord/akord-js';
import Active from "@/app/(vaults)/(routes)/vaults/active/page";
import InActive from "@/app/(vaults)/(routes)/vaults/inactive/page";

const Vault = () => {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState('');
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [vaults, setVaults] = useState<Array<any>>([]);
    const [activeSide, setActiveSide] = useState<'ACTIVE' | 'ARCHIVED'>('ACTIVE');

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                if (loggedIn) {
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
                    setVaults(vaultDetails);
                } else {
                    console.log("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching vaults:", error);
            }
        };

        fetchVaults();
    }, [loggedIn]);

    const handleSideToggle = () => {
        setActiveSide(activeSide === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE');
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 h-full">
                <h1 className="font-bold text-2xl">Vault</h1>
                {loggedIn && (
                    <div className="flex flex-col gap-8 h-full">
                        <div className="flex gap-4 border-b transition-all duration-500 text-base">
                            <button onClick={handleSideToggle}
                                    className={`focus:outline-none ${activeSide === 'ACTIVE' ? 'text-gray-600 border-b-2 border-orange-900' : 'text-gray-400 border-transparent hover:border-orange-800'}`}>
                                Active
                            </button>
                            <button onClick={handleSideToggle}
                                    className={`focus:outline-none ${activeSide === 'ARCHIVED' ? 'text-gray-600 border-b-2 border-orange-900' : 'text-gray-400 border-transparent hover:border-orange-800'}`}>
                                Inactive
                            </button>
                        </div>
                        <div className="gap-8 h-full">
                            <div
                                className={`transition-all duration-500 h-full ${activeSide === 'ACTIVE' ? 'ml-0' : '-ml-full'}`}>
                                {activeSide === 'ACTIVE' ? <Active/> : <InActive/>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vault;
