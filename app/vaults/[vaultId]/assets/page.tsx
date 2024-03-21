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
        <div className="p-6 lg:p-12">
            {vaultDetails && (
                <div className="w-auto border mb-24 dark:text-white/80">
                    <div className="flex items-center justify-between  bg-[#9a3412] darK:bg-[#9a3412]/70 text-gray-200 p-4">
                        <h1 className="text-2xl font-bold">{vaultDetails.name}</h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b dark:border-gray-600/50 border-gray-600/30">
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
                    <div className="flex items-center justify-between bg-[#9a3412] darK:bg-[#9a3412]/70 p-4">
                        <h1 className="lg:text-2xl text-xl font-bold">Stacks</h1>
                    </div>
                    <div className="text-white">
                        {stacks.map((stack) => (
                            <div key={stack.id} className="p-4 border-b border-gray-600/50 flex">
                                <div className="flex flex-col gap-4 justify-between">
                                    <div>
                                        <h1 className="flex gap-1.5 text-lg dark:text-white/90 text-gray-800 font-semibold">
                                            <FileImage size={24} />
                                            {stack.name}
                                        </h1>
                                        <p className="text-gray-800 dark:text-gray-400 text-sm">{stack.id}</p>
                                    </div>
                                    <div>
                                        <Button className="p-2 bg-[#9a3412] dark:bg-[#9a3412]/80 dark:text-white/90 rounded-sm" onClick={() => handleShowImage(stack.id)}>
                                            Show Image
                                        </Button>
                                    </div>
                                    {selectedStackId === stack.id && imgUrl && showImage && (
                                        <div className="">
                                            <Button onClick={() => handleDownloadImage(stack.id)} className="mb-4 p-2 text-sm rounded-sm">
                                                Download Image
                                            </Button>
                                            <img src={imgUrl} alt={`Image for Stack ${stack.id}`} />
                                        </div>
                                    )}
                                </div>
                                {/*{selectedStackId === stack.id && imgUrl && showImage && (*/}
                                {/*    <div className="">*/}
                                {/*        <Button onClick={() => handleDownloadImage(stack.id)} className="mb-4">*/}
                                {/*            Download Image*/}
                                {/*        </Button>*/}
                                {/*        <img src={imgUrl} alt={`Image for Stack ${stack.id}`} />*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assets;
