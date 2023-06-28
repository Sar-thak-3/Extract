import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar(){

  const router = useRouter();

  const [inputquery,setInputquery] = useState({search: ""});
  const [searchdrop,setSearchdrop] = useState([]);

  const handleChange = (e)=>{
    setInputquery({...inputquery,[e.target.name]: e.target.value});
    return;
  }

  useEffect(()=>{
    if(inputquery.search===""){
      setSearchdrop([]);
    }
  },[inputquery.search])

  const handleSearch = async()=>{
    if(inputquery.search!==""){
      const response = await fetch("http://127.0.0.1:8080/api/search/searchquery" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({searchquery: inputquery.search}),
      })
      const res = await response.json(); 
      if(res.success){
        setSearchdrop(res.response);
        console.log(searchdrop);
      }
    }
    return;
  }

  const handleGotoHome = ()=>{
    router.push({pathname: "/Home",query: {searchquery: inputquery.search}});
  }

  const myFuntion = ()=>{
    setInputquery({search: ""});
  }

    return (
        <>
          <div className="my-1 d-flex" style={{justifyContent: "space-between"}}>
            <div style={{width: "600px",marginLeft: "40%"}} onMouseLeave={()=>{setTimeout(() => {setSearchdrop([])}, "200")}} className="relative mb-2 bg-white rounded" data-te-input-wrapper-init >
              {/* <button > */}
              <input value={inputquery.search} onChange={handleChange}
                type="search" name="search"
                className="border-slate-10000 border-2 peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.20rem] leading-[1.8] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleSearch2"
                placeholder="Type query" 
                onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    handleGotoHome();
                  }
                  else{
                    handleSearch();
                  }
                }}/>
                {/* </button> */}
              <label
                htmlFor="exampleSearch2"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Search</label
              >
              <div id="dropdown" className="z-100 bg-white absolute w-full divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                {searchdrop.length>0 && <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                  {searchdrop.map((ele)=>{
                    return (
                      <li>
                      <Link href={`/Home/Answer/${ele.id}`} key={ele.id} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{ele.text.split(" ").slice(0,10).join(" ")}</Link>
                    </li>
                    )
                  })}
              </ul>
              }
            </div>
            </div>
            <div>
                <Link href="/Login" type="button"
                  className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400 dark:hover:bg-neutral-700 dark:hover:bg-opacity-60 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  data-te-ripple-init data-te-ripple-color="light">
                  Login
                </Link>
                <Link href="/Signup" type="button"
                  className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init data-te-ripple-color="light">
                  Sign up for free
                </Link>
            </div>
            </div>
        </>
    )
}