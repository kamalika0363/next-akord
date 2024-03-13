"use client";
import React, {useState, useEffect} from "react";
import {Akord, Auth} from '@akord/akord-js';
import {Box} from "lucide-react";

const Active = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [vaults, setVaults] = useState<Array<any>>([]);
    const [activeSide, setActiveSide] = useState<'ACTIVE'>('ACTIVE');

    useEffect(() => {
        const fetchVaults = async () => {
            try {
                if (loggedIn) {
                    const {wallet} = await Auth.authenticate();
                    const akord = await Akord.init(wallet);
                    const allVaults = await akord.vault.listAll();
                    const activeVaults = allVaults.filter((vault) => vault.status === 'ACTIVE');
                    setVaults(activeVaults);
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
        <div className="w-screen">
            <div
                className={`transition-all duration-500 ${activeSide === 'ACTIVE'}`}>
                <table style={{width: '100%', justifyContent: 'start'}}>
                    <thead>
                    <tr>
                        <th style={{textAlign: 'start', padding: '8px'}}>Name</th>
                        <th style={{textAlign: 'start', padding: '8px'}}>Description</th>
                        <th style={{textAlign: 'start', padding: '8px'}}>Created At</th>
                        <th style={{textAlign: 'start', padding: '8px'}}>Updated At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vaults.map((vault) => (
                        <tr className="border border-gray-800" key={vault.id}>
                            <td style={{textAlign: 'start', padding: '8px', display: 'flex', alignItems: 'center', gap:'6px'}}>
                                <Box className='text-[#913e15] bg-orange-900/30 rounded-sm'/>
                                <span>{vault.name}</span>
                            </td>
                            <td style={{textAlign: 'start', padding: '8px'}}>{vault.description}</td>
                            <td style={{textAlign: 'start', padding: '8px'}}>{vault.createdAt}</td>
                            <td style={{textAlign: 'start', padding: '8px'}}>{vault.updatedAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Active;
