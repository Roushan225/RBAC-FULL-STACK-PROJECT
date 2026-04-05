import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../utilities'
import { ToastContainer } from 'react-toastify'

function SideNav({ Category }) {

    const navigate = useNavigate()
    const navLink = [
        {
            icon: <i class="fa-solid fa-right-to-bracket"></i>,
            text: "Login",
            link: "/login"
        },
        {
            icon: <i class="fa-solid fa-graduation-cap"></i>,
            text: "Register",
            link: "/register"
        }
    ]
    const [selected] = useState("")
    const [isadmin, setIsadmin] = useState(false)
    const [secretkey, setSecretkey] = useState("")

    const handleadmin = async () => {
        try {
            const secret = "roshan"
            if (secretkey !== secret) {
                return handleError("Wrong key ! ! !")

            }
            handleSuccess("Admin Login Succesfull")
            navigate("/admin")

        } catch (error) {
            console.log(error);

        }
    }

    return (

        <>
            <main className='h-20 bg-slate-100 pl-[18vw] flex justify-end items-center  shadow-md rounded-2xl '>


               
                <button
                    onClick={() =>  navigate = "/login" }
                    className='bg-green-400 p-3 px-9 rounded-lg mr-8 text-xl transition duration-[0.3s] hover:text-white'>
                    <i className='fa-solid fa-house'> Home</i>

                </button>
            </main>
            <main className='h-[100vh] w-[18vw] bg-slate-100  flex flex-col justify-between shadow-xl rounded-xl mt-3 '>
                <div className='pt-10'>
                    {navLink.map((curElem) => {
                        return (
                            <>
                                <div className=' flex mb-7 p-4 rounded-lg text-gray-300 hover:text-black hover:bg-gray-200 transition duration-[0.3s] '>
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

export default SideNav