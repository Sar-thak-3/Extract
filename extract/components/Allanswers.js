import Link from "next/link";

export default function Allanswers({answers}) {
  return (
    <>
    {answers && answers.answers && answers.answers.map((answer)=>{
        return(
          <div className="container flex items-center justify-center" key={answer._id}>
            <div
              className="rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
              style={{ maxWidth: "60%" }}
            >
              <div className="p-2">
                <Link href={`Home/Answer/${answer._id}`}>
                  <h5 className="mb-0 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {answer.extracted}
                  </h5>
                </Link>
                {/* <p className=" text-base text-neutral-600 dark:text-neutral-200">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p> */}
              </div>
              <img
                src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                className="rounded-t-lg"
                alt="..."
              />
            </div>
            <hr style={{ maxWidth: "60%" }} />
          </div>
        )
      })
    }
    </>
  );
}
