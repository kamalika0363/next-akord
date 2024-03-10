import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    ArrowUpFromLine,
    Cog,
    FolderClosed,
    FolderUp,
    LogOut,
    MessageSquareText,
    StickyNote,
    Upload,
    User
} from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-3xl font-bold">
                <Link href="/">
                    Akord
                </Link>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex items-center gap-3">
                        <User className="h-10"/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <User className="h-4 mr-1" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Cog className="h-4 mr-1" />
                        Support
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MessageSquareText className="h-4 mr-1" />
                        Send Feedback
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="h-4 mr-1" />
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/upload">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-3">
                            <Upload className="h-8 mt-2"/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <ArrowUpFromLine className="h-4 mr-1" />
                            Upload File
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FolderUp className="h-4 mr-1" />
                            Upload Folder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <StickyNote className="h-4 mr-1" />
                            Create Note
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FolderClosed className="h-4 mr-1" />
                            Create Folder
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Link>
        </div>
    );
}
