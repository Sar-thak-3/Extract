import { useState } from "react"
import Allfolders from "@/components/Allfolders"
import About from "@/components/About"
import Activity from "@/components/Activity"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Image from "next/image"

export default function Dashboard(){

  const [details,setDetails] = useState({fullname: "",about: ""});
  const router = useRouter();

  useEffect(()=>{
    if(!localStorage.getItem("usertoken") && !sessionStorage.getItem("usertoken")){
      router.push("/Login");
      return;
    }
    async function fetchData(){
      const token = localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");
      const response = await fetch("http://127.0.0.1:8080/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authtoken": token,
      }
      });
      const res = await response.json();
      if(res.success){
        setDetails(res);
      }
      else{
        router.push("/Login");
      }
    }

    fetchData();
    return;
  },[])


    const [Overviewclass,setOverviewClass] = useState("border-b-4 border-sky-500")
    const [Folderclass,setFolderClass] = useState(null)
    const [Activityclass,setActivityClass] = useState(null)
    const [Aboutclass,setAboutClass] = useState(null);


    const handleChange = (e)=>{
      const m = e.currentTarget.getAttribute("id");
      if(m==="Overviewclass"){
        setOverviewClass("border-b-4 border-sky-500");
        if(router.query.toShow!=="overview"){
          router.push("/Dashboard?toShow=overview");
        }
      }
      else{
        setOverviewClass(null);
      }
      if(m==="Folderclass"){
        setFolderClass("border-b-4 border-sky-500");
        if(router.query.toShow!=="folders"){
          router.push("/Dashboard?toShow=folders");
        }
      }
      else{
        setFolderClass(null);
      }
      if(m==="Activityclass"){
        setActivityClass("border-b-4 border-sky-500");
        if(router.query.toShow!=="activity"){
          router.push("/Dashboard?toShow=activity");
        }
      }
      else{
        setActivityClass(null);
      }
      if(m==="Aboutclass"){
        setAboutClass("border-b-4 border-sky-500");
        if(router.query.toShow!=="about"){
          router.push("/Dashboard?toShow=about");
        }
      }
      else{
        setAboutClass(null);
      }
      return;
    }

    useEffect(()=>{
      if(router.query.toShow === "folders"){
        document.getElementById("Folderclass").click()
      }

      if(router.query.toShow === "overview"){
        document.getElementById("Overviewclass").click()
      }

      if(router.query.toShow === "activity"){
        document.getElementById("Activityclass").click()
      }

      if(router.query.toShow === "about"){
        document.getElementById("Aboutclass").click()
      }
    },[router.query])

    return (
      <div>
        {details && 
        <div className="container" style={{paddingTop: "50px"}}>  

            <div id="carouselExampleControls container" className="carousel text-center carousel-dark" data-mdb-ride="carousel" style={{maxWidth: "60%",marginLeft: "auto",marginRight: "auto"}}>
              <div className="carousel-inner mb-4">
                <div className="carousel-item active">
                  <Image className="rounded-circle shadow-1-strong"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" width={120} height={120} alt="avatar"
                    style={{transform: "translateY(10px)"}} />
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <h2 style={{fontSize: "30px"}} className="mb-4">{details.fullname}</h2>
                      <p className="text-muted">
                        <i className="fas fa-quote-left pe-2"></i>
                        {details.about}{" "}
                        <i className="fas fa-quote-right pe-2"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="navbar-collapse container-fluid mb-2" id="navbarExample01">
                <ul className="mb-2" style={{display: "flex",justifyContent: "space-evenly",listStyleType: "none"}}>
                  <li id="Overviewclass" className={`nav-item active ${Overviewclass}`} style={{width: "25%" , transition: "all 0.2s ease"}} onClick={handleChange}>
                    Overview
                  </li>
                  <li id="Folderclass" className={`nav-item active ${Folderclass}`} style={{width: "25%" , transition: "all 0.2s ease"}} onClick={handleChange}>
                    Folders
                  </li>
                  <li id="Activityclass" className={`nav-item active ${Activityclass}`} style={{width: "25%" , transition: "all 0.2s ease"}} onClick={handleChange}>
                    Activity
                  </li>
                  <li id="Aboutclass" className={`nav-item active ${Aboutclass}`} style={{width: "25%" , transition: "all 0.2s ease"}} onClick={handleChange}>
                    About
                  </li>
                </ul>
                </div>
            </div>

          {/* <Overview /> */}
          {Folderclass && <Allfolders />}
          {Activityclass && <Activity />}
          {Aboutclass && <About />}
        </div>
        }
      </div>
    )
}