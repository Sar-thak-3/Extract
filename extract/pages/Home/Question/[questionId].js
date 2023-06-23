import Question from "@/components/Question"

export default function Questionwithid({question}){
    return (
        <Question question={question}/>
    )
}

export async function getServerSideProps(context){
    const {params,req,res,query} = context;
    const {questionId} = params;

    const response = await fetch(`http://127.0.0.1:8080/api/questions/question` , {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: questionId,
        }),
    });

    const question = await response.json();

    return {
        props: {
            question: question,
        }
    }
}