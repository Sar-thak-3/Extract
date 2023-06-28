import { TagsInput } from "react-tag-input-component"; 
import { useState } from "react";
import { NextResponse,NextRequest } from "next/server";
import {useRouter} from "next/router";

export default function AddQuestion(){

  const router = useRouter();

    const [value,setValue] = useState([]);
    const [question,setQuestion] = useState({questionTitle: "",questionDescription: ""});

    const handleChange = (e)=>{
      setQuestion({...question,[e.target.name]: e.target.value});
    }

    const handleSubmit = async()=>{
      if(!localStorage.getItem("usertoken") && !sessionStorage.getItem("usertoken")){
        router.push('/Login');
        return;
      }
      

      if(question.questionTitle.length > 5){
        const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
        const response = await fetch(`http://localhost:8080/api/questions/newquestion` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authtoken": token,
          },
          body: JSON.stringify({questiontitle: question.questionTitle,questiontags: value,questiondescription: question.questionDescription}),
        })
        
        const res = await response.json();
        console.log(res)
        if(res.success){
          router.push('/Home');
        }
      }
      return;
    }

    return (
        <>
            <section className="bg-gray-100">
              <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8" style={{maxWidth:"60%"}}>
                {/* <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5"> */}
                  {/* <div className="lg:col-span-2 lg:py-12">
                    <p className="max-w-xl text-lg">
                      At the same time, the fact that we are wholly owned and totally
                      independent from manufacturer and other group control gives you
                      confidence that we will only recommend what is right for you.
                    </p>
                  </div> */}

                  <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form action="" className="space-y-4">
                      <div>
                        <label className="sr-only" htmlFor="name">Question Title</label>
                        <input value={question.questionTitle} onChange={handleChange} name="questionTitle"
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Question Title"
                          type="text"
                          id="name"
                        />
                      </div>

                      <div>
                        <TagsInput
                          value={value}
                          onChange={setValue}
                          name="Tags"
                          placeHolder="Tags"
                        />
                       </div>

                      <div>
                        <label className="sr-only" htmlFor="question">Question</label>

                        <textarea value={question.questionDescription} onChange={handleChange} name="questionDescription"
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Question"
                          rows="8"
                          id="question"
                        ></textarea>
                      </div>

                      <div className="mt-4">
                        <a
                          onClick={handleSubmit}
                          className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                          Ask Question
                        </a>
                      </div>
                    </form>
                  </div>
                {/* </div> */}
              </div>
            </section>
        </>
    )
}