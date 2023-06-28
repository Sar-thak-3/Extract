import Answer from "@/components/Answer"

export default function Answerwithid({answer}){
    return (
        <Answer answer={answer}/>
    )
}

export async function getServerSideProps(context){
    const {params,req,res,query} = context;
    const {answerId} = params;

    let answer = null;
    try{
        const response = await fetch(`http://127.0.0.1:8080/api/folders/answer`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answerId: answerId,
            }),
        })

        answer = await response.json();
    }
    catch(error){
        console.log("Server not connected");
    }

    return {
        props: {
            answer: answer,
        }
    }
}