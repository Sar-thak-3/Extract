import Allquestions from "@/components/Allquestions";
import Allanswers from "@/components/Allanswers";
import { useState } from "react";
import Link from "next/link";

export default function Home({questionData,answersData}) {
  const [seeQuestions, setSeeQuestions] = useState(true);

  const handleWhattoSee = (e) => {
    if (e.target.value === "Answers") {
      setSeeQuestions(false);
    } else {
      setSeeQuestions(true);
    }
  };

  return (
    <>
      <div className="container my-10">
        <div className="">
          <div
            className="d-flex container justify-between"
            style={{ width: "70%" }}
          >
            <div className="">
              <ul
                className="mb-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
                role="tablist"
                data-te-nav-ref
              >
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
                  >
                    Questions
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      7
                    </div>
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
                  >
                    Answers
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                      7
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            <div className="">
              <Link href="/Home/askquestion">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Ask Question
                </button>
              </Link>
            </div>
          </div>

          {/* AnswerS PART */}
          {!seeQuestions && <Allanswers answers={answersData}/>}

          {/* Questions */}
          {seeQuestions && <Allquestions from={"Homepage"} questions={questionData}/>}
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context){
  const {query} = context;
  const {required,pagenumber} = query;
  let questionData = null;
  if(required && pagenumber){
    try{
      // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${pagenumber}&required=${required}`);
      const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${pagenumber}&required=${required}`);
      questionData = await response.json(); 
    }
    catch(error){
      console.log("Server not connected");
    }
  }
  else if(required && !pagenumber){
    try{
      // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${1}&required=${required}`);
      const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${1}&required=${required}`);
    questionData = await response.json();
    }
    catch(error){
      console.log("Server not connected")
    }
  }
  else if(!required && pagenumber){
    try{
      // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${pagenumber}`);
      const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${pagenumber}`);
      questionData = await response.json();
    }
    catch(error){
      console.log("Server not connected");
    }
  }
  else{
    try{
      // const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${1}`);
      const response = await fetch(`https://extract-backend.vercel.app/api/questions/allquestions?pagenumber=${1}`);
      questionData = await response.json();
    }
    catch(error){
      console.log("Server not connected");
    }

  }

  let answersData = null;
  console.log(query);

  if(query.searchquery){
    try{
      // const response = await fetch(`http://127.0.0.1:8080/api/search/allsearchquery` , {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({searchquery: query.searchquery}),
      // });
      const response = await fetch(`https://extract-backend.vercel.app/api/search/allsearchquery` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({searchquery: query.searchquery}),
      });
      answersData = await response.json();
    }
    catch(error){
      console.log("Server not connected");
    }
  }
  else{
    if(pagenumber){
      try{
        // const response = await fetch(`http://127.0.0.1:8080/api/folders/allanswers`);
        const response = await fetch(`https://extract-backend.vercel.app/api/folders/allanswers`);
        answersData = await response.json();
      }
      catch(error){
        console.log("Server not connected")
      }
    }
    else{
      try{
        // const response = await fetch(`http://127.0.0.1:8080/api/folders/allanswers?pagenumber=${1}`);
        const response = await fetch(`https://extract-backend.vercel.app/api/folders/allanswers?pagenumber=${1}`);
        answersData = await response.json();
      }
      catch(error){
        console.log("Server not connected");
      }
    }
  } 

  return {
    props: {
      questionData: questionData,
      answersData: answersData,
    }
  }
}