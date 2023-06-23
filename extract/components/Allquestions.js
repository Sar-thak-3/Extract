import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Allquestions({questions,from}) {

  const router = useRouter();

  const handleNewest = ()=>{
    if(from==="DashboardActivity"){
      router.push("/Dashboard?toShow=activity").then(()=>{router.reload()});
      return;
    }
    else if(from==="Homepage"){
      router.push("/Home");
      return;
    }
  }

  const handleAnswered = ()=>{
    if(from==="DashboardActivity"){
      router.push("/Dashboard?toShow=activity&required=answered").then(()=>{router.reload()});
      return;
    }
    else if(from==="Homepage"){
      router.push("/Home?required=answered");
      return;
    }
  }

  const handleUnanswered = ()=>{
    if(from==="DashboardActivity"){
      router.push("/Dashboard?toShow=activity&required=unanswered").then(()=>{router.reload()});
      return;
    }
    else if(from==="Homepage"){
      router.push("/Home?required=unanswered");
      return;
    }
  }

  return (
    <>
      <div className="mb-4 ml-auto float-right" role="group">
        <a
          type="button"
          className="inline-block rounded-l border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleNewest}
        >
          Newest
        </a>
        <a
          type="button"
          className="-ml-0.5 inline-block border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleAnswered}
        >
          Answered
        </a>
        <a
          type="button"
          className="-ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleUnanswered}
        >
          Unanswered
        </a>
      </div>

      <br />
      <br />

      {questions.questions && questions.questions.map((question)=>{
        return (<div className="container flex items-center justify-center">
          <div
            style={{ maxWidth: "60%" }}
            className="mb-2 bg-neutral-100 p-4 dark:bg-neutral-600"
          >
            <h3 className="text-3xl font-semibold">{question.title}</h3>
            <p className="mb-2">
              {question.description}
            </p>
            {/* <hr
                      className="my-6 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-30" /> */}
            <Link href={`/Home/Question/${question._id}`}
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Learn more
            </Link>
          </div>
          <hr style={{ maxWidth: "60%" }} />
      </div> );
    })}
    </>
  );
}

// export async function getServerSideProps(context){
//   const {query} = context;
//   const {required,pagenumber} = query;
//   if(required && pagenumber){
//     const response = await fetch(`http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${pagenumber}&required=${required}`);
//     const data = await response.json();

//     return {
//       props: {
//         questions: data,
//       }
//     }
//   }
//   else if(required && !pagenumber){
//     const response = await fetch(`http://http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${1}&required=${required}`);
//     const data = await response.json();

//     return {
//       props: {
//         questions: data,
//       }
//     }
//   }
//   else if(!required && pagenumber){
//     const response = await fetch(`http://http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${pagenumber}`);
//     const data = await response.json();

//     return {
//       props: {
//         questions: data,
//       }
//     }
//   }
  
//   const response = await fetch(`http://http://127.0.0.1:8080/api/questions/allquestions?pagenumber=${1}`);
//   const data = await response.json();
//   return {
//     props: {
//       questions: data,
//     }
//   }
// }