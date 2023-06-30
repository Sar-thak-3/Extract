import Image from "next/image";

export default function Answer({answer}) {
  // console.log(answer.answer)
  return (
    <div>
    {answer && answer.answer && <div>
      <div className="p-2 lg:p-0 max-w-screen flex w-full sm:max-w-[854px]" style={{marginLeft: "auto",marginRight: "auto"}}>
        <div className="card dark:text-white font-arial text-base text-left overflow-auto font-bold flex flex-col w-full lg:mb-2 overflow-y-hidden transition-all duration-500 max-h-full">
          <div className="flex items-center justify-between">
            <div className="py-0.5 px-2 rounded-sm flex self-start items-center text-black text-sm tracking-wider font-medium dark:text-slate-200">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="question"
                className="svg-inline--fa fa-question "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                
              </svg>
              <p className="m-0 mx-1 py-0 px-1">Question</p>
            </div>
            <span className="text-badgeText dark:text-slate-300 tracking-wide font-medium text-sm px-2 rounded bg-secondaryDark dark:bg-slate-700 flex items-center space-x-1">
              <svg
                className="h-3 w-3 fill-badgeText dark:fill-slate-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
              </svg>
              <span>Updated on:</span>
              <span>{answer.answer.date.slice(8,10)}/{answer.answer.date.slice(5,7)}/{answer.answer.date.slice(0,4)}</span>
            </span>
          </div>
          <h1 id="ocr-text">
            <div className="mt-2">
              {answer.answer.extracted}
            </div>
          </h1>
        </div>
      </div>
      <Image width={800} height={800}
        style={{marginLeft: "auto",marginRight: "auto"}}
        src={answer.answer.image}
        className="h-auto max-w-3xl mb-4"
        alt="..." />
    </div>
    }
    </div>
  );
}
