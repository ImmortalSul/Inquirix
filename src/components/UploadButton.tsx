"use client"


import { useState } from "react";
import { Button } from "./button";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";
import Dropzone from "react-dropzone"
import { Cloud } from "lucide-react";

const UploadDropzone = () => {
    return (
         <Dropzone multiple={false} onDrop={(acceptedFile)=> {
        console.log(acceptedFile)
    }}>
    {({getRootProps, getInputProps, acceptedFiles}) => (
        <div{...getRootProps()} className="border h-64 m-4 border-dashed border-gray-300 rounded-lg">
        <div className="flex items-center justify-center h-full w-full">
            <label 
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt=6 pb-6">
                    <Cloud className="h-6 w-6 text-zinc-500 mb-2"/>
                    <p className="mb-2 text-sm text-zinc-700">
                        <span className="font-semibold">Click to Upload</span>{' '}or drag and drop
                    </p>
                </div>
            </label>
        </div>
        </div>
    )}
    </Dropzone>
    )
}

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
                <UploadDropzone />
            </DialogContent>
        </Dialog>
    )

}

export default UploadButton;