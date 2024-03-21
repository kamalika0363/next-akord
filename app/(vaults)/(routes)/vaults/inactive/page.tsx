"use client";
import React, {useState, useEffect} from "react";
import {Akord, Auth} from '@akord/akord-js';
import {Box} from "lucide-react";
import Link from "next/link";
import {format} from "date-fns/format";

const Active = () => {
    const [akord, setAkord] = useState<Akord | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [vaults, setVaults] = useState<Array<any>>([]);

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                if (loggedIn) {
                    const {wallet} = await Auth.authenticate();
                    const akord = await Akord.init(wallet);
                    const allVaults = await akord.vault.listAll();
                    const archivedVaults = allVaults.filter((vault) => vault.status === 'ARCHIVED');
                    setVaults(archivedVaults);
                    setAkord(akord);
                } else {
                    console.log("User not logged in");
                }
            } catch (error) {
                console.error("Error fetching vaults:", error);
            }
        };

        fetchVaults();
    }, [loggedIn]);


    const uploadForm = (files: FileList | null) => {
        return async (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
            e.preventDefault();
            try {
                if (!akord) {
                    throw new Error('Akord-js not initialized');
                }
                const input = document.createElement('input');
                input.type = 'file';
                input.click();
                input.addEventListener('change', async (e) => {
                    try {
                        if (!akord) {
                            throw new Error('Akord-js not initialized');
                        }
                        const files = (e.target as HTMLInputElement).files;
                        if (!files || !files.length) {
                            throw new Error('Failed uploading the file');
                        }
                        const file = files[0];
                        const vault = vaults[0]
                        confirm("Uploading file to vault: " + vault.name);
                        // @ts-ignore
                        const {stackId} = await akord.stack.create(vault.id, file, file.name);
                        confirm("Created stack: " + stackId);
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };
    };

    return (
        <div className="w-80 lg:w-auto border rounded-sm mb-24">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-gray-600/50">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Description</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Created At</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Updated At</th>
                        {/*<th className="px-4 py-2 text-left hidden xl:table-cell">Vault Id</th>*/}
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Show Vault</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vaults.map((vault) => (
                        <tr key={vault.id} className="border-b border-gray-600/50 dark:text-slate-200">
                            <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center cursor-pointer" onClick={uploadForm(vault.id)}>
                                    <Box className="text-[#913e15] bg-orange-900/30 rounded-sm mr-2"/>
                                    <span>{vault.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2 hidden xl:table-cell">{vault.description}</td>
                            <td className="px-4 py-2 hidden xl:table-cell">{format(+vault.createdAt,"Pp")}</td>
                            <td className="px-4 py-2 hidden xl:table-cell">{format(+vault.updatedAt,"Pp")}</td>
                            {/*<td className="px-4 py-2 hidden xl:table-cell">{vault.id}</td>*/}
                            <td className="px-4 py-2 table-cell">
                                <Link className="text-blue-500"
                                      href={{
                                          pathname: `/vaults/${vault.id}/assets`,
                                          query: {
                                              vaultId: vault.id,
                                              vaultName: vault.name,
                                              vaultDescription: vault.description,
                                              status: 'ACTIVE',
                                          }
                                      }}>
                                    Show
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Active;

