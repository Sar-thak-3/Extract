import { useEffect, useState } from "react";
import Allanswers from "./Allanswers";
import Allquestions from "./Allquestions";
import { useRouter } from "next/router";

export default function Activity(){

  const router = useRouter();

  const [seeQuestions,setSeeQuestions] = useState(true);
  const [allques,setallques] = useState([{_id: null,title: null,tags: [],description: null,comments: []}]);
  const [allans,setallans] = useState([{_id: null,image: null,extracted: null,date: null}]);

  useEffect(()=>{
    if(!localStorage.getItem("usertoken") && !sessionStorage.getItem("usertoken")){
      router.push("/Login");
    }
    async function fetchdata(){
      const query = router.query;
      const {required,pagenumber} = query;

      let questionData;
      const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
      if(required && pagenumber){
        // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${pagenumber}&required=${required}` , {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "json",
        //      "authtoken": token,
        //   }
        // });
        const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${pagenumber}&required=${required}` , {
          method: "GET",
          headers: {
            "Content-Type": "json",
             "authtoken": token,
          }
        });
        questionData = await response.json();
      }
      else if(required && !pagenumber){
        // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${1}&required=${required}` , {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "json",
        //      "authtoken": token,
        //   }
        // });
        const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${1}&required=${required}` , {
          method: "GET",
          headers: {
            "Content-Type": "json",
             "authtoken": token,
          }
        });

        questionData = await response.json();
      }
      else if(!required && pagenumber){
        // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${pagenumber}` , {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "json",
        //      "authtoken": token,
        //   }
        // });
        const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${pagenumber}` , {
          method: "GET",
          headers: {
            "Content-Type": "json",
             "authtoken": token,
          }
        });

        questionData = await response.json();
      }
      else{
        // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${1}` , {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "json",
        //      "authtoken": token,
        //   }
        // });
        const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${1}` , {
          method: "GET",
          headers: {
            "Content-Type": "json",
             "authtoken": token,
          }
        });

        questionData = await response.json();
      }

      setallques(questionData);

      let answersData;
      if(pagenumber){
        // const response = await fetch(`http://127.0.0.1:8080/api/folders/allanswers?pagenumber=${pagenumber}` , {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "json",
        //      "authtoken": token,
        //   }
        // });
        const response = await fetch(`https://extract-backend.vercel.app/api/folders/allanswers?pagenumber=${pagenumber}` , {
          method: "GET",
          headers: {
            "Content-Type": "json",
             "authtoken": token,
          }
        });
        answersData = await response.json();
      }
      else{
        const response = await fetch(`http://127.0.0.1:8080/api/folders/allanswers?pagenumber=${1}` , {
          method: "GET",
          headers: {
            "Content-Type": "json",
             "authtoken": token,
          }
        });
        // const response = await fetch(`https://extract-backend.vercel.app/api/folders/allanswers?pagenumber=${1}` , {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "json",
        //      "authtoken": token,
        //   }
        // });
        answersData = await response.json();
      }
      setallans(answersData);
    }

    fetchdata();
  },[])

    const handleWhattoSee = (e)=>{
      if(e.target.value === "Answers"){
        setSeeQuestions(false);
      }
      else{
        setSeeQuestions(true);
      }
    }

    return (
        <>
            <div className="">
                <ul
                    className="mb-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
                    role="tablist"
                    data-te-nav-ref>
                    <li role="presentation">
                      <button
                        className="relative my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-6 py-3 text-xs font-medium uppercase leading-tight text-[#4b5563] hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-[#2563eb] data-[te-nav-active]:text-[#2563eb] dark:hover:bg-transparent"
                        data-te-toggle="pill"
                        data-te-target="#tabs-notification"
                        role="tab"
                        aria-controls="tabs-notification"
                        aria-selected="true"
                        value="Questions"
                        onClick={handleWhattoSee}
                        >Questions
                        {/* <div
                          className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                          7
                        </div> */}
                      </button>
                    </li>
                    <li role="presentation">
                      <button
                        className="relative my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-6 py-3 text-xs font-medium uppercase leading-tight text-[#4b5563] hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-[#2563eb] data-[te-nav-active]:text-[#2563eb] dark:hover:bg-transparent"
                        data-te-toggle="pill"
                        data-te-target="#tabs-notification"
                        role="tab"
                        aria-controls="tabs-notification"
                        aria-selected="true"
                        value="Answers"
                        onClick={handleWhattoSee}
                        >Answers
                        {/* <div
                          className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                          7
                        </div> */}
                      </button>
                    </li>
                </ul>

                {seeQuestions && <Allquestions from={"DashboardActivity"} questions={allques}/>}
                {!seeQuestions && <Allanswers answers={allans}/>}
            </div>
        </>
    )
}