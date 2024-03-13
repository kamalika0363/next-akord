"use client";
import {useState, useEffect} from "react";
import {Akord, Auth} from '@akord/akord-js';

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
        <div className="w-screen">
            <div
                className={`transition-all duration-500 ${activeSide === 'ARCHIVED'}`}>
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
                            <td style={{textAlign: 'start', padding: '8px'}}>{vault.name}</td>
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

export default InActive;
