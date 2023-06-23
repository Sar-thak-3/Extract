export default function ScrollToTop(){

    const handleScrollTop = ()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            {/* <!-- Back to top button --> */}
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="fixed bottom-5 right-5 inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]" 
              onClick={handleScrollTop}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  clipRule="evenodd" />
              </svg>
            </button>
        </>
    )
}