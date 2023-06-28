import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Image from "next/image";

export default function Folder(){

    const [images,setImages] = useState([{image: null,_id: null}]);

    const router = useRouter();

    useEffect(()=>{
        if(!localStorage.getItem("usertoken") || !sessionStorage.getItem("usertoken")){
            router.push("/Dashboard");
        }
        async function fetchdata(){
            const foldertoken = router.query.token;
            console.log(foldertoken);
            if(foldertoken){
                const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
                // const response = await fetch("http://127.0.0.1:8080/api/folders/userfolderimages" , {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "json",
                //         "authtoken": token,
                //         "foldertoken": foldertoken,
                //     },
                // })
                const response = await fetch("https://extract-backend.vercel.app/api/folders/userfolderimages" , {
                    method: "GET",
                    headers: {
                        "Content-Type": "json",
                        "authtoken": token,
                        "foldertoken": foldertoken,
                    },
                })
                const res = await response.json();
                if(res.success){
                    setImages(res.images);
                }
                else{
                    router.push("/Dashboard");
                }
            }
        }

        fetchdata();
    },[])

    const [previewSrc,setpreviewSrc] = useState({imagePreview: null})

    const handleInput = (e)=>{
        if(e.target.files[0]){
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = ()=>{
                setpreviewSrc({...previewSrc,imagePreview: reader.result,file: file})
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className="container">
                <div className="flex items-center justify-center w-full">
                    {previewSrc.imagePreview && <Image width={75} height={75} style={{transform: "translateY(90px)"}} src={previewSrc.imagePreview} alt="" />}
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleInput} />
                    </label>
                </div> 
                <button 
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Add
                </button>
            </div>
            <br />

            {/* <div className="container flex items-center justify-center"> */}
            {/* <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" /> */}
            {/* <hr className="w-48 h-1 mx-auto my-4 bg-black-100 border-0 rounded md:my-10 dark:bg-black-700"></hr> */}
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
            {/* </div> */}

            <div className="container mx-auto px-5 py-4 lg:px-32 lg:pt-12">
                <div className="-m-1 flex flex-wrap md:-m-2">
                    {images && images.map((image)=>{
                        if(image._id!==null){
                            return (
                                <div className="flex w-1/3 flex-wrap" key={image._id}>
                                <div className="w-full p-1 md:p-2">
                                  <Image width={400} height={400}
                                    alt="gallery"
                                    className="block h-full w-full rounded-lg object-cover object-center"
                                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
                                </div>
                              </div>
                                )
                        }
                        else{
                            return;
                        }
                    })
                    }
                </div>
            </div>
        </>
    )
}