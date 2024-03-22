"use client";
import {Akord, Auth} from "@akord/akord-js";
import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {format} from "date-fns/format";
import Link from "next/link";
import {SquareArrowOutUpRight} from "lucide-react";

const Storage = () => {
    const [akord, setAkord] = useState<any>(null);
    const [vaults, setVaults] = useState<any>([]);
    const [stacks, setStacks] = useState<any>([]);
    const [displayedStacks, setDisplayedStacks] = useState<number>(3);

    useEffect(() => {
        const transaction = async () => {
            try {
                const {wallet} = await Auth.authenticate();
                const akord = await Akord.init(wallet);
                const vaultIds = await akord.vault.listAll();

                const stackPromises = vaultIds.map(async (vaultId: any) => {
                    const stackIds = await akord.stack.listAll(vaultId.id);
                    console.log("stackIds", stackIds);
                    const stackUriPromises = stackIds.map(async (stackId: any) => {
                        const stackUri = await akord.stack.getUri(stackId.id);
                        return stackUri;
                    });
                    const stackUris = await Promise.all(stackUriPromises);
                    return {vaultId: vaultId.id, stackUris, stackIds};
                });
                const stackData = await Promise.all(stackPromises);
                setAkord(akord);
                setVaults(vaultIds);
                setStacks(stackData);
            } catch (error) {
                console.error("Error fetching vaults:", error);
            }
        };

        transaction().then(r => r);
    }, [vaults]);

    const loadMore = () => {
        setDisplayedStacks(prevDisplayedStacks => prevDisplayedStacks + 5);
    };

    return (
        <div className="w-auto mb-24 p-8">
            <div className="px-5 font-semibold text-base lg:text-2xl bg-orange-800/80 p-2 rounded-xs">Blockchain Transactions</div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr>
                        <th className="px-6 py-2 text-left">ID</th>
                        <th className="px-6 py-2 text-left">Time</th>
                        <th className="px-6 py-2 text-left">Viewblock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stacks
                        .filter((stack: any) => stack.stackIds.length > 0)
                        .slice(0, displayedStacks)
                        .map((stack: any) => (
                        <tr key={stack.vaultId} className="dark:text-slate-200 border border-gray-600/50">
                            <td className="xl:px-4 xl:py-2 table-cell">
                                <div>
                                    {stack.stackUris.map((stackUri: any, index: number) => (
                                        <div key={index} className="flex flex-col p-4">
                                            <div className="font-medium">{stackUri}</div>
                                            <div className="text-sm text-gray-500 ">{stack.vaultId}</div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-2 table-cell">
                                {stack.stackIds.map((stackId: any, index: number) => (
                                    <div key={index} className="py-4 px-2 xl:my-5">{format(+stackId.createdAt, "Pp")}</div>
                                ))}
                            </td>
                            <td className="px-8 py-2 table-cell">
                                {stack.stackIds.map((stackId: any, index: number) => (
                                    <Link key={index} href={`https://viewblock.io/arweave/contract/${stackId.vaultId}`}
                                          className="py-2 px-4">
                                        <SquareArrowOutUpRight className="text-blue-500 my-3.5" size={24}/>
                                    </Link>
                                ))}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-center items-center m-4 rounded-sm">
                    {displayedStacks < stacks.length && (
                        <Button onClick={loadMore}>Load More</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Storage;
