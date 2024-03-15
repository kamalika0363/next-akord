"use client";
import React, {useState, useEffect} from "react";
import {Akord, Auth} from '@akord/akord-js';
import {Box} from "lucide-react";
import Link from "next/link";
import {type} from "node:os";

const Assets = ({params}: {
    params: {
        vaultId: string
        vaultName: string
        vaultDescription: string
        vaultStatus: string
        stackId: string
    }
}) => {
    const [vaultDetails, setVaultDetails] = useState<any>(null);
    const [stacks, setStacks] = useState<any>([]);
    const [imgUrls, setImgUrls] = useState<any>([]);
    const [akord, setAkord] = useState<Akord | null>(null);

    useEffect(() => {
        const fetchVaultDetails = async () => {
            try {
                const {wallet} = await Auth.authenticate();
                const akord = await Akord.init(wallet);
                const vaultDetails = await akord.vault.get(params.vaultId);
                const stacks = await akord.stack.listAll(params.vaultId);
                setVaultDetails(vaultDetails);
                setStacks(stacks);

            } catch (error) {
                console.error("Error fetching vault details:", error);
            }
        };
        fetchVaultDetails();
    }, [params.vaultId]);

    useEffect(() => {
        const fetchVaultDetails = async () => {
            try {
                const {wallet} = await Auth.authenticate();
                const akord = await Akord.init(wallet);

                const vaultDetails = await akord.vault.get(params.vaultId);
                const stacks = await akord.stack.list(params.vaultId);
                setVaultDetails(vaultDetails);
                setStacks(stacks);
            } catch (error) {
                console.error("Error fetching vault details:", error);
            }
        };

        fetchVaultDetails();
    }, [params.vaultId]);

    return (
        <div className="p-12">
            {vaultDetails && (
                <div className="w-80 lg:w-auto border rounded-sm mb-24">
                    <div className="flex items-center justify-between bg-orange-800 p-4">
                        <h1 className="text-2xl font-bold">{vaultDetails.name}</h1>
                        <Link className="flex items-center space-x-2 text-gray-400 hover:text-gray-100"
                              href={`/vault/${params.vaultId}/stacks`}>
                            <Box size={24}/>
                            <span>Stacks</span>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-600/50">
                            <tr>
                                <th className="px-4 py-2 text-left">Vault ID</th>
                                <th className="px-4 py-2 text-left hidden xl:table-cell">Name</th>
                                <th className="px-4 py-2 text-left hidden xl:table-cell">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="px-4 py-2 text-left">{vaultDetails.id}</td>
                                <td className="px-4 py-2 text-left hidden xl:table-cell">{vaultDetails.name}</td>
                                <td className="px-4 py-2 text-left hidden xl:table-cell">{vaultDetails.description}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assets;
