"use client"


import { useState } from "react";
import { Button } from "./button";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";


const UploadButton = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <Dialog open={isOpen} onOpenChange={(v) => {
            if(!v){
                setIsOpen(v);
            }
        }}>
            <DialogTrigger onClick={()=> setIsOpen(true)} asChild>
                <Button>
                    Upload PDF!
                </Button>
            </DialogTrigger>
            <DialogContent>
                fill shit here after
            </DialogContent>
        </Dialog>
    )

}

export default UploadButton;