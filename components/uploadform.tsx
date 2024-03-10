"use client";
import {Akord, Auth} from '@akord/akord-js'
import type {NextPage} from 'next'
import Head from 'next/head'
import React, {useState} from 'react'
import {StarIcon} from "@radix-ui/react-icons";

const Form = () => {
    const [akord, setAkord] = useState<Akord | null>()
    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')

    const handleUpload = async (files: FileList | null) => {
        if (!akord) {
            throw new Error('Akord-js not initialized')
        }
        if (!files || !files.length) {
            throw new Error('Failed uploading the file')
        }
        const file = files[0]
        const vaults = await akord?.vault.list()
        if (!vaults.items || !vaults.items.length) {
            throw new Error('User does not have any vaults')
        }
        const vault = vaults.items[0]
        confirm("Uploading file to vault: " + vault.name)
        // @ts-ignore
        const {stackId} = await akord.stack.create(vault.id, file, file.name)
        confirm("Created stack: " + stackId)
        setAkord(null)
    }
    const uploadForm = () => {
        return (
            <div className="flex flex-col justify-center items-center p-24">
                <h1 className="text-2xl font-semibold mb-6">Upload Files to Vault</h1>
                <form className="flex flex-wrap gap-4">
                    <label className="relative cursor-pointer">
                        <input
                            className="sr-only"
                            type="file"
                            onChange={(e) => handleUpload(e.target.files)}
                        />
                        <div
                            className="flex items-center p-3 bg-white rounded-sm font-semibold shadow-md hover:shadow-lg border border-gray-300 hover:border-[#9a3412] cursor-pointer">
              <span className="mr-2">
                  <StarIcon className="w-6 h-6 text-gray-500"/>
              </span>
                            <span className="text-gray-600">Choose a file</span>
                        </div>
                    </label>
                </form>
            </div>
        );
    };
    return uploadForm();
}

export default Form;