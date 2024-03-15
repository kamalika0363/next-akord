"use client";
import React, {useState, useEffect} from "react";
import {Akord, Auth} from '@akord/akord-js';
import {Box} from "lucide-react";

const InActive = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [vaults, setVaults] = useState<Array<any>>([]);
    const [activeSide, setActiveSide] = useState<'ARCHIVED'>('ARCHIVED');

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                if (loggedIn) {
                    const {wallet} = await Auth.authenticate();
                    const akord = await Akord.init(wallet);
                    const allVaults = await akord.vault.listAll();
                    const archivedVaults = allVaults.filter((vault) => vault.status === 'ARCHIVED');
                    setVaults(archivedVaults);
                } else {
                    console.log("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching vaults:", error);
            }
        };

        fetchVaults();
    }, [loggedIn]);

    return (
        <div className="w-auto border rounded-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-gray-600/50">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Description</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Created At</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Updated At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vaults.map((vault) => (
                        <tr key={vault.id} className="border-b border-gray-600/50">
                            <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <Box className="text-[#913e15] bg-orange-900/30 rounded-sm mr-2"/>
                                    <span>{vault.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2 hidden xl:table-cell">{vault.description}</td>
                            <td className="px-4 py-2 hidden xl:table-cell">{vault.createdAt}</td>
                            <td className="px-4 py-2 hidden xl:table-cell">{vault.updatedAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InActive;
