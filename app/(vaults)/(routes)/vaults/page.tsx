"use client";
import {useState} from "react";
import {Akord, Auth} from '@akord/akord-js';

const Vault = () => {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState('');
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [vaults, setVaults] = useState<Array<any>>([]);

    const showVaults = async () => {
        try {
            if (loggedIn) {
                const {wallet} = await Auth.authenticate();
                const akord = await Akord.init(wallet);
                const vaults = await akord.vault.listAll();
                const vaultDetails = vaults.map((vault) => ({
                    id: vault.id,
                    name: vault.name,
                    status: vault.status,
                    description: vault.description,
                    createdAt: vault.createdAt,
                    updatedAt: vault.updatedAt,
                }));
                setVaults(vaultDetails);
            } else {
                console.log("User not logged in");
            }
        } catch (error) {
            console.error("Error fetching vaults:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Vault</h1>
            {loggedIn && (
                <div>
                    <button className="mb-4" onClick={showVaults}>Show Vault</button>
                    <div className="flex flex-row gap-8">
                        <div>
                            {vaults.filter((vault) => vault.status === 'ACTIVE').length > 0 && (
                                <div>
                                    <h2>Active Vaults</h2>
                                    <ul>
                                        {vaults
                                            .filter((vault) => vault.status === 'ACTIVE')
                                            .map((vault) => (
                                                <li key={vault.id}>
                                                    <ul>{vault.name}</ul>
                                                    <ul>{vault.description}</ul>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            {vaults.filter((vault) => vault.status === 'ARCHIVED').length > 0 && (
                                <div>
                                    <h2>Inactive Vaults</h2>
                                    <ul>
                                        {vaults
                                            .filter((vault) => vault.status === 'ARCHIVED')
                                            .map((vault) => (
                                                <li key={vault.id}>
                                                    <ul>{vault.name}</ul>
                                                    <ul>{vault.description}</ul>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vault;
