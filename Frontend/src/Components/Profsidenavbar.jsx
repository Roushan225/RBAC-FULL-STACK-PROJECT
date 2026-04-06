import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../../utilities'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'

function Profsidenavbar() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    

    useEffect(() => {

        const checkUser=async ()=>{
            try {
                const response=await axios.get("/auth/me",{
                    withCredentials:true
                })
                console.log(response.data.user);
                setUser(response.data.user)
                
            } catch (error) {
                navigate("/login")
                console.log(error);
                
            }
        }
        checkUser();
    }, [])

    const handleLogout=()=>{
        localStorage.removeItem("user");
        
        handleSuccess("User Logout Successfull")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }

    const navLink = [
        {
            icon: <i classname="fa-solid fa-user"></i>,
            text: "User",
            link: "/professordashboard"
        },
        {
            icon: <i classname="fa-solid fa-file"></i>,
            text: "PDF",
            link: "/Professorpdf",
        },
        
        
    ]
    const [selected] = useState("User")
    
    return (

        <>
            <main className='h-20 bg-slate-50 pl-[18vw] flex justify-between items-center pr-[18vw] shadow-md rounded-2xl '>
                
                <button className='shadow-lg p-3 px-9 rounded-lg text-xl absolute right-5 hover:bg-red-500 hover:text-white transition duration-[.5s]'
                        onClick={(e)=>handleLogout(e)}
                >
                    <i className='fa-solid fa-arrow-right-from-bracket mr-1'></i>
                    Logout
                </button>
                <button 
                    className='text-2xl bg-slate-100 hover:bg-slate-200 transition hover:scale-110 ml-36 p-2 px-6 rounded-lg mt-3'
                    onClick={()=>{navigate("/calendar")}}>
                    Calendar
                </button>
                <div className='mt-4 absolute left-14'>
                    <h1 className='text-3xl'>Welcome <span className='text-yellow-500'>{user?.name}. . .</span></h1>
                    <h1 className='text-xl italic'>{user?.email}</h1>
                </div>
                

            </main>
            <main className='h-[100vh] w-[12vw] bg-slate-50  flex flex-col justify-between shadow-xl rounded-xl mt-3 '>
                <div className='pt-10 '

                >
                    {navLink.map((curElem) => {
                        return (
                            <>
                                <div className={curElem.text == selected ? (' flex mb-7 p-4  rounded-lg text-black bg-yellow-200 hover:text-black hover:scale-105 transition  ') :
                                    (' flex mb-7 p-4  rounded-lg  hover:text-black hover:bg-yellow-200  duration-[0.3s] hover:scale-105 transition ')
                                }>
                                    <div className='text-2xl'>{curElem.icon}</div>

                                    <a href={curElem.link} className='ml-5 text-2xl'>
                                        {curElem.text}
                                    </a>
                                </div>

                            </>
                        )

                    })}
                </div>
                

            </main>
            <ToastContainer />


        </>
    )
}

export default Profsidenavbar