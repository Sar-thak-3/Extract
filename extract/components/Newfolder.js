import { useState } from "react";
import { useFoldercontext } from "@/lib/Foldercontext";
import { useRouter } from "next/router";

export default function Newfolder(){

	const router = useRouter();

  	const cont = useFoldercontext();
  	const {newfolder,setNewfolder} = cont;
	const [foldername,setfoldername] = useState({foldername: null});
	const [bgColor,setbgColor] = useState("green");
  	const [translation,setTranslation] = useState("translate-x-7");

	const handleChange = (e)=>{
		setfoldername({...foldername,[e.target.name]: e.target.value});
	}

	const handleCancel = ()=>{
		setNewfolder(false);
	}

	const handleSlide = ()=>{
		if(bgColor==="red"){
			setbgColor("green");
        	setTranslation("translate-x-7");
		}
		else if(bgColor==="green"){
			setbgColor("red");
        	setTranslation(null);
		}
	}

	const handleAddfolder = async()=>{
		if(!localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken")){
			router.push("/");
			return;
		}
		if(foldername.foldername && foldername.foldername.length>3){
			const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
			let publ = (bgColor==="green") ? true:false;
			const response = await fetch("http://127.0.0.1:8080/api/folders/newfolder" , {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"authtoken": token,
				},
				body: JSON.stringify({foldername: foldername.foldername,public: publ})
			})

			const res = await response.json();
			if(res.success){
				router.push("/Dashboard");
				return;
			}
		}
		return;
	}

    return (
        <>
            <div className="sticky py-6 flex flex-col justify-center sm:py-12">
            	<div className="sticky py-3 sm:max-w-xl sm:mx-auto">
            		<div
            			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            		</div>
            		<div className="z-10 relative px-6 py-4 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            			<div className="z-10 max-w-md mx-auto">
            				<div className="divide-y divide-gray-200">
            					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            						<div className="relative">
            							<input autoComplete="on" id="foldername" name="foldername" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Folder Name" value={foldername.foldername} onChange={handleChange} />
            							<label htmlFor="foldername" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Folder Name</label>
            						</div>
									<label className="flex items-center relative w-max cursor-pointer select-none">
                					  <span className="text-lg font-bold mr-3">Public</span>
                					  <input onClick={handleSlide} type="checkbox" className={`appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-${bgColor}-500 bg-${bgColor}-500`} style={{backgroundColor: `${bgColor}`}} />
                					  <span className="absolute font-medium text-xs uppercase right-1 text-white"> NO </span>
                					  <span className="absolute font-medium text-xs uppercase right-8 text-white"> YES </span>
                					  <span className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200 ${translation}`} />
                					</label>
									<div className="d-flex justify-between">
            						<div className="relative">
            							<button className="bg-blue-500 text-white rounded-md px-2 py-1" onClick={handleAddfolder}>Add</button>
            						</div>
									<div className="relative">
            							<button className="bg-blue-500 text-white rounded-md px-2 py-1" onClick={handleCancel}>Cancel</button>
            						</div>
									</div>	
            					</div>
            				</div>
            			</div>
            		</div>
            	</div>
            </div>

        </>
    )
}