import { useEffect, useState } from 'react'
import Link from 'next/link';

export default function Folder({details}){

  const [bgColor,setbgColor] = useState("red");
  const [translation,setTranslation] = useState(null);

  useEffect(()=>{
    if(details.public===true){
      setTranslation("translate-x-7");
      setbgColor("green");
    }
  },[])

  const handleChange = async()=>{
    if(bgColor==="red"){
      const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
      const response = await fetch("http://localhost:8080/api/folders/changepublic" , {
        method: "POST",
        headers: {
          "Content-Type": "json",
          "authtoken": token,
          "foldertoken": details.foldertoken,
        }
      });
      const res = await response.json();
      if(res.success){
        setbgColor("green");
        setTranslation("translate-x-7");
      }
      return;
    }
    else if(bgColor==="green"){
      const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
      const response = await fetch("http://localhost:8080/api/folders/changepublic" , {
        method: "POST",
        headers: {
          "Content-Type": "json",
          "authtoken": token,
          "foldertoken": details.foldertoken,
        }
      });
      const res = await response.json();
      if(res.success){
        setbgColor("red");
        setTranslation(null);
      }
      return;
    }
  }

    return (
        <>
            <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <Link href={{pathname: `/Dashboard/Folder/${details.foldername}` ,query: {"token": `${details.foldertoken}`}}}>
                <h5
                  className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {details.foldername}
                </h5>
              </Link>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>

                <label className="flex items-center relative w-max cursor-pointer select-none">
                  <span className="text-lg font-bold mr-3">Public</span>
                  <input onClick={handleChange} type="checkbox" className={`appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-${bgColor}-500 bg-${bgColor}-500`} style={{backgroundColor: `${bgColor}`}} />
                  <span className="absolute font-medium text-xs uppercase right-1 text-white"> NO </span>
                  <span className="absolute font-medium text-xs uppercase right-8 text-white"> YES </span>
                  <span className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200 ${translation}`} />
                </label>

            </div>
        </>
    )
}