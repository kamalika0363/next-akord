"use client";
import React, {useState, useEffect} from "react";
import {Akord, Auth} from '@akord/akord-js';
import Active from "@/app/(vaults)/(routes)/vaults/active/page";
import InActive from "@/app/(vaults)/(routes)/vaults/inactive/page";

const Vault = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [vaults, setVaults] = useState<Array<any>>([]);
    const [activeSide, setActiveSide] = useState<'ACTIVE' | 'ARCHIVED'>('ACTIVE');
    const [newVaultName, setNewVaultName] = useState<string>('');
    const [newVaultDescription, setNewVaultDescription] = useState<string>('');
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                if (loggedIn) {
                    const {wallet} = await Auth.authenticate();
                    const akord = await Akord.init(wallet);
                    const vaults = await akord.vault.listAll();
                    const vaultDetails = vaults.map((vault) => ({
                        id: vault.id,
                        name: vault.name,
                        description: vault.description,
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

    const createVault = () => {
        setShowCreateForm(true);
    }

    const handleCreateVault = async (event: any) => {
        event.preventDefault();
        try {
            const {wallet} = await Auth.authenticate();
            const akord = await Akord.init(wallet);
            const vaultCreateResult = await akord.vault.create(newVaultName, {
                description: newVaultDescription,
                public: false
            });
            const {vaultId, membershipId} = vaultCreateResult;
            console.log("Created vault with ID:", vaultId);
            setNewVaultName('');
            setNewVaultDescription('');
            setShowCreateForm(false);
        } catch (error) {
            console.error("Error creating vault:", error);
        }
    }

    const handleSideToggle = () => {
        setActiveSide(activeSide === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE');
    };

    return (
        <div className="md:w-[160vh] pr-8 h-screen">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold text-2xl">Vault</h1>
                    <div className="flex flex-row gap-4">
                        {!showCreateForm && (
                            <button onClick={createVault}
                                    className="rounded-md p-2 font-semibold bg-[#db400f] focus:outline-none">Create
                                Vault</button>
                        )}
                    </div>
                </div>
                {showCreateForm && (
                    <form onSubmit={handleCreateVault}>
                        <div className="flex flex-row gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Vault Name"
                                    value={newVaultName}
                                    onChange={(e) => setNewVaultName(e.target.value)}
                                    className="rounded-sm p-2 border border-gray-300/30 bg-transparent focus:outline-none"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Vault Description"
                                    value={newVaultDescription}
                                    onChange={(e) => setNewVaultDescription(e.target.value)}
                                    className="rounded-sm p-2 border border-gray-300/30 bg-transparent focus:outline-none"
                                />
                            </div>
                            <div>
                                <button type="submit"
                                        className="rounded-sm p-2 font-semibold bg-[#db400f] focus:outline-none">Create
                                </button>
                            </div>
                        </div>
                    </form>
                )}
                {loggedIn && (
                    <div className="flex flex-col gap-8 h-full">
                        <div className="flex gap-4 border-b transition-all duration-500 text-base">
                            <button onClick={handleSideToggle}
                                    className={`focus:outline-none ${activeSide === 'ACTIVE' ? 'text-gray-600 border-b-2 border-orange-900' : 'text-gray-400 border-transparent hover:border-orange-800'}`}>Active
                            </button>
                            <button onClick={handleSideToggle}
                                    className={`focus:outline-none ${activeSide === 'ARCHIVED' ? 'text-gray-600 border-b-2 border-orange-900' : 'text-gray-400 border-transparent hover:border-orange-800'}`}>Inactive
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
