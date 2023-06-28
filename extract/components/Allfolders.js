import { useEffect, useState } from "react";
import Folder from "./Folder"
import { useFoldercontext } from "@/lib/Foldercontext";
import { useRouter } from "next/router";
import Newfolder from "./Newfolder";

export default function Allfolders(){

    const router = useRouter();

    const [folders,setFolders] = useState([{foldername: "",public: null}]);
    const cont = useFoldercontext();
    const {newfolder,setNewfolder} = cont;

    useEffect(()=>{
        if(!localStorage.getItem("usertoken") && !sessionStorage.getItem("usertoken")){
            router.push("/Login");
            return;
        }

        async function fetchdata(){
            const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
            // const response = await fetch("http://127.0.0.1:8080/api/folders/userfolders", {
            //     mathod: "GET",
            //     headers: {
            //         "Content-Type": "json",
            //         "authtoken": token,
            //     }
            // })
            const response = await fetch("https://extract-backend.vercel.app/api/folders/userfolders", {
                mathod: "GET",
                headers: {
                    "Content-Type": "json",
                    "authtoken": token,
                }
            })

            const res = await response.json();

            if(res.success){
                setFolders(res.folders);
            }
        }

        fetchdata();
        return;
    },[])

    const handleOpen = ()=>{
        setNewfolder(true);
    }

    return (
        <>
        <div className="relative container d-flex justify-between">
            <div className="relative mb-3 border-2" data-te-input-wrapper-init style={{width: "50%"}}>
                <input
                  type="search"
                  className="peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleSearch2"
                  placeholder="Type query" />
                <label
                  htmlFor="exampleSearch2"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >Search</label
                >
            </div>
            <div>
                <button onClick={handleOpen} href="/new" className="btn btn-success d-flex flex-items-center flex-justify-center width-full mb-4">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo mr-1">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                    </svg>
                    New
                </button>
            </div>
        </div>

        {newfolder && <Newfolder />}

        <div className="container d-flex">
            {
                folders.map((singleFolder)=>{
                    return <Folder details={singleFolder} key={singleFolder.foldertoken}/>
                })
            }
        </div>
        </>
    )
}