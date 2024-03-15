"use client";
import React, { useState, useEffect } from "react";
import { Akord, Auth } from '@akord/akord-js';

const Stacks = ({ params }: any) => {
    const [stacks, setStacks] = useState<any[]>([]);
    const [akord, setAkord] = useState<Akord | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { wallet } = await Auth.authenticate();
                const akord = await Akord.init(wallet);
                setAkord(akord);

                const fetchedStacks = await akord.stack.listAll(params.vaultId);
                setStacks(fetchedStacks);
            } catch (error) {
                console.error("Error fetching stacks:", error);
            }
        };

        fetchData();
    }, []);

    const handleUpload = async (files: FileList | null) => {
        try {
            if (!akord) {
                throw new Error('Akord-js not initialized');
            }

            if (!files || !files.length) {
                throw new Error('Failed uploading the file');
            }

            const file = files[0];
            // @ts-ignore
            const { stackId } = await akord.stack.create(params.vaultId, file, file.name);
            console.log("Created stack: " + stackId);

            // Update the stacks after upload
            const fetchedStacks = await akord.stack.listAll(params.vaultId);
            setStacks(fetchedStacks);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDownload = async (stackId: string) => {
        try {
            if (!akord) {
                throw new Error('Akord-js not initialized');
            }

            console.log("Downloading stack: " + stackId);
            await akord.stack.download(stackId);
            console.log("Downloaded stack: " + stackId);
        } catch (error) {
            console.error('Error downloading stack:', error);
        }
    };

    const handleDelete = async (stackId: string) => {
        try {
            if (!akord) {
                throw new Error('Akord-js not initialized');
            }

            console.log("Deleting stack: " + stackId);
            await akord.stack.delete(stackId);
            console.log("Deleted stack: " + stackId);

            // Update the stacks after deletion
            const fetchedStacks = await akord.stack.listAll(params.stackId);
            setStacks(fetchedStacks);
        } catch (error) {
            console.error('Error deleting stack:', error);
        }
    };

    return (
        <div className="p-12">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-2xl font-bold">Stacks</h1>
                <input type="file" onChange={(e) => handleUpload(e.target.files)} />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-gray-600/50">
                    <tr>
                        <th className="px-4 py-2 text-left">Stack ID</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Name</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Description</th>
                        <th className="px-4 py-2 text-left hidden xl:table-cell">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stacks.map((stack: any) => (
                        <tr key={stack.id}>
                            <td className="px-4 py-2 text-left">{stack.id}</td>
                            <td className="px-4 py-2 text-left hidden xl:table-cell">{stack.name}</td>
                            <td className="px-4 py-2 text-left hidden xl:table-cell">{stack.description}</td>
                            <td className="px-4 py-2 text-left hidden xl:table-cell">
                                <button className="text-orange-800 bg-orange-100 px-4 py-2 rounded-md" onClick={() => handleDownload(stack.id)}>Download</button>
                                <button className="text-orange-800 bg-orange-100 px-4 py-2 rounded-md" onClick={() => handleDelete(stack.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stacks;
