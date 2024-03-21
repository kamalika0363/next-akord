"use client";
import React, { useState, useEffect } from "react";
import { Akord, Auth, Stack } from '@akord/akord-js';
import { Button } from "@/components/ui/button";
import { FileImage } from "lucide-react";
import Link from "next/link";

const Assets = ({ params }: {
    params: {
        vaultId: string
        vaultName: string
        vaultDescription: string
        vaultStatus: string
        stackId: string
    }
}) => {
    const [vaultDetails, setVaultDetails] = useState<any>(null);
    const [stacks, setStacks] = useState<Stack[]>([]);
    const [akord, setAkord] = useState<Akord | null>(null);
    const [selectedStackId, setSelectedStackId] = useState<string | null>(null);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);

    useEffect(() => {
        const fetchVaultDetails = async () => {
            console.log("Fetching vault details...");
            try {
                const { wallet } = await Auth.authenticate();
                const akord = await Akord.init(wallet);
                const vaultDetails = await akord.vault.get(params.vaultId);
                const stacks = await akord.stack.listAll(params.vaultId);
                setVaultDetails(vaultDetails);
                setStacks(stacks);
                setAkord(akord);
            } catch (error) {
                console.error("Error fetching vault details:", error);
            }
        };
        fetchVaultDetails();
    }, [params.vaultId]);

    const handleShowImage = async (stackId: string) => {
        try {
            console.log("Fetching image for stack:", stackId);
            const image = await akord?.stack.download(stackId, 0, {skipSave:true});
            // @ts-ignore
            setImgUrl(image);
            setSelectedStackId(stackId);
            setShowImage(true);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }

    const handleDownloadImage = async (stackId : string) => {
        const download = await akord?.stack.download(stackId)
    }

    return (
        <div className="p-12">
            {vaultDetails && (
                <div className="w-80 lg:w-auto border rounded-sm mb-24">
                    <div className="flex items-center justify-between bg-orange-800 p-4">
                        <h1 className="text-2xl font-bold">{vaultDetails.name}</h1>
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
                    <div className="flex items-center justify-between bg-orange-800 p-4">
                        <h1 className="text-2xl font-bold">Stacks</h1>
                    </div>
                    <div className="text-white">
                        {stacks.map((stack) => (
                            <div key={stack.id} className="p-4 border-b border-gray-600/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="flex gap-1.5 text-xl font-bold">
                                            <FileImage size={24} />
                                            {stack.name}
                                        </h1>
                                        <p className="text-gray-400">{stack.id}</p>
                                    </div>
                                    <div>
                                        <Button onClick={() => handleShowImage(stack.id)}>
                                            Show Image
                                        </Button>
                                    </div>
                                </div>
                                {selectedStackId === stack.id && imgUrl && showImage && (
                                    <div className="flex items-center justify-center p-12 flex-col">
                                        <Button onClick={() => handleDownloadImage(stack.id)}>
                                            Download Image
                                        </Button>
                                        <img src={imgUrl} alt={`Image for Stack ${stack.id}`} />
                                        <div className="mt-4">
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assets;
