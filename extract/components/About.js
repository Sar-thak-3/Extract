import { useEffect, useState } from "react"
import { useRouter } from "next/router";

export default function About(){

  const router = useRouter();

    const [visible,setVisible] = useState("hidden");
    const [details,setDetails] = useState({fullname: "",about: "",password: ""});
    const [disable,setDisable] = useState(true);

    useEffect(()=>{
      if(localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken")){
        setDisable(false);
      }
    },[]);

    const handleVisible = ()=>{
        if(visible==="hidden"){
            setVisible("visible");
        }
        else{
            setVisible("hidden");
        }
    }

    const handleChange = async(e)=>{
      setDetails({...details,[e.target.name]: e.target.value});
    }

    const handleSubmit = async()=>{
      if(!localStorage.getItem("usertoken") && !sessionStorage.getItem("usertoken")){
        router.push("/Login");
      }
      let values = {};
      if(details.fullname!==""){
        values["fullname"] = details.fullname;
      }
      if(details.about!==""){
        values["about"] = details.about;
      }
      if(details.password!=="" && details.password.length>6 && details.password.match(`(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{6,}`)){
        values["password"] = details.password;
      }

      const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken")
      // const response = await fetch("http://localhost:8080/api/auth/updateuser" , {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "authtoken": token,
      //   },
      //   body: JSON.stringify(values),
      // });
      const response = await fetch("https://extract-backend.vercel.app/api/auth/updateuser" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authtoken": token,
        },
        body: JSON.stringify(values),
      });

      const res = await response.json();

      if(res.success){
        router.reload();
      }
      return;
    }

    return (
        <>
            <section className="py-12 bg-gray-100  bg-opacity-50 h-screen" style={{overflow: "scroll"}}>
                <div className="container max-w-2xl md:w-3/4 shadow-md">
                  <div className="bg-white space-y-6">
                    <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                      <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
                      <div className="md:w-2/3 max-w-sm mx-auto">
                        <label className="text-sm text-gray-400">Email</label>
                        <div className="w-full inline-flex border">
                          <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                            <svg
                              fill="none"
                              className="w-6 text-gray-400 mx-auto"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <input
                            type="email"
                            className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                            placeholder="email@example.com"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                      <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
                      <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                        <div>
                          <label className="text-sm text-gray-400">Full name</label>
                          <div className="w-full inline-flex border">
                            <div className="w-1/12 pt-2 bg-gray-100">
                              <svg
                                fill="none"
                                className="w-6 text-gray-400 mx-auto"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <input
                              type="text" value={details.fullname} name="fullname" onChange={handleChange}
                              className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                              placeholder="Charly Olivas"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">About</label>
                          <div className="w-full inline-flex border">
                            <div className="pt-2 w-1/12 bg-gray-100">
                              <svg
                                fill="none"
                                className="w-6 text-gray-400 mx-auto"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <textarea name="about" value={details.about} onChange={handleChange}
                              type="text"
                              className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                              placeholder="Describe Yourself"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
                      <h2 className="md:w-4/12 max-w-sm mx-auto">Change password</h2>

                      <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
                        <div className="w-full inline-flex border-b">
                          <div className="w-1/12 pt-2">
                            <svg
                              fill="none"
                              className="w-6 text-gray-400 mx-auto"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                          <input value={details.password} name="password" onChange={handleChange}
                            type="password"
                            className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                            placeholder="New"
                          />
                        </div>
                      </div>

                      <div className="md:w-3/12 text-center md:pl-6">
                        <button className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right" disabled={disable} onClick={handleSubmit}>
                          <svg
                            fill="none"
                            className="w-4 text-white mr-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Update
                        </button>
                      </div>
                    </div>

                    <hr />
                    <div className="w-full p-4 text-right text-gray-500" >
                      <button className="inline-flex items-center focus:outline-none mr-4" onClick={handleVisible}>
                        <svg
                          fill="none"
                          className="w-4 mr-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            data-popover-target="delete-account-popover"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete account
                      </button>
                      <div
                      data-popover="delete-account-popover"
                      className="float-center absolute max-w-[24rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                      style={{visibility: `${visible}`}}
                    >
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <p>Are You Sure?</p>
                        <button
                          className="select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 text-center align-middle font-sans text-xs font-medium capitalize text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          data-ripple-light="true"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    </div>


                  </div>
                </div>
            </section>
        </>
    )
}