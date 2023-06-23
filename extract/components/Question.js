import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Question({ question }) {

  const router = useRouter();

  const [disable,setDisable] = useState(true);
  const [inputs,setInputs] = useState({comment: ""});

  useEffect(()=>{
    if(localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken")){
        setDisable(false);
    }
  },[])

  const handleChange = ()=>{
    setInputs({...inputs,[e.target.name]: e.target.value});
  }

  const handleComment = async()=>{
    if(disable || (!localStorage.getItem("usertoken") && !sessionStorage.getItem("usertoken")) || inputs.comment.length<5){
      return;
    }
    const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
    const response = await fetch(`http://127.0.0.1:8080/api/questions/addcomment` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: token,
        comment: inputs.comment,
      }
    })
    router.reload();
    return;
  }

  return (
    <div>
      {question.question && 
        <div>
          <div className="container flex items-center justify-center mt-5">
            <div
              style={{ maxWidth: "60%" }}
              className="mb-2 bg-neutral-100 p-4 dark:bg-neutral-600"
            >
              <h3 className="text-3xl font-semibold">{question.question.title}</h3>
              <p className="mb-2">
                {question.question.description}
              </p>
            </div>
            <hr style={{ maxWidth: "60%" }} />
          </div>

          <div class="container mt-2 mb-5">
            <div class="d-flex justify-content-center row">
              <div class="d-flex flex-column col-md-8">
                <div class="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4"></div>
                <div class="coment-bottom bg-white p-2 px-4">
                  <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                    <input value={inputs.comment} name="comment" onChange={handleChange}
                      type="text"
                      class="form-control mr-3"
                      placeholder="Add comment"
                    />
                    <button onClick={handleComment} className="btn btn-primary" type="button" disabled={disable}>
                      Comment
                    </button>
                  </div>
                  {question.question.comments.length>0 && question.question.comments.map((ques)=>{
                    <div class="commented-section mt-2">
                      <div class="d-flex flex-row align-items-center commented-user">
                        <h5 class="mr-1 text-lg font-bold">{ques.user}</h5>
                        <span class="dot mb-1"></span>
                      </div>
                      <div class="comment-text-sm">
                        <span>
                          {ques.comment}
                        </span>
                      </div>
                      <div class="reply-section">
                        <div class="d-flex flex-row align-items-center voting-icons">
                          <i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                          <i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                          <span class="ml-2">10</span>
                        </div>
                      </div>
                    </div>
                  })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
