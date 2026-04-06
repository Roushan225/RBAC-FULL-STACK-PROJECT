import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Pagedesign from '../Components/SideNav'
import { useState } from 'react'

import axios from 'axios'
import { handleError, handleSuccess } from '../../utilities'

function login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp,setOtp]=useState("")
  const [otpsent,setOtpsent]=useState(true)

  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const data = {
        email,
        password
      }
      const response = await axios.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true                                        // allows cookies
      })
     
      const result = response.data;
      const { success, message, user} = result
      if (success) {
        if (user.role === "Student") {
          handleSuccess(message)
          setTimeout(() => {
            navigate("/userdashboard")
          },1500)
        }
        else if(user.role==="Professor"){
          handleSuccess(message)
          setTimeout(() => {
            navigate("/professordashboard")
          },1500)
        }
        else{
          handleSuccess(message)
          setTimeout(() => {
            navigate("/admin")
          },1500)
        }



        // localStorage.setItem("token",response.data.token)

        // localStorage.setItem("user",
        //   JSON.stringify(response.data.user)
        // )
        // console.log("user stored");
      }

    } catch (error) {
      console.log(error.response?.data);
      handleError(error.response?.data?.message)


    }
  }
  const Email=async()=>{
    const otp=Math.floor(Math.random()*10000)
    console.log(otp);
    
    
      try {
        const response = await axios.post("/email/g",{
          to:"ankushkr124578@gmail.com",
          subject:"hello from first project",
          html:`<h1> OTP for email verification is :- ${otp} <h1/>`
        })
        handleSuccess("sent")
        console.log("sent");
        
        
        
      } catch (error) {
        console.log(error);
        
      }

    }

  return (
    <>
      <Pagedesign />
      <button onClick={()=>Email()} >
        email
      </button>
      
      <div className='absolute ml-[20%] top-[16%] '>
        <div className=' h-[75vh] w-[76vw]'>
          <div className='absolute w-[47%] h-[100%] left-0 '>
            <img src="/images/Login.png" alt="" />


          </div>
          <div className='absolute w-[50%]  h-[100%] right-0'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1 className='text-5xl mt-6 mb-16 font-semibold'>
                Log In
              </h1>
              
              <div className='flex flex-col'>
                <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex '>
                  <i className='fa fa-envelope text-2xl mt-2 ml-3'></i>
                  <input
                    className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                    type="email"
                    value={email}
                    autoFocus
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder='Email..'
                  />
                  {otpsent=>{
                    return (
                      <>
                      <input 
                        type="text"
                        onChange={(e)=>setOtp(e.target.value)}
                        placeholder='OTP'
                        className='bg-red-700'

                       />
                      </>
                    )
                  }}
                </div>
                <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex'>
                  <i className='fa fa-lock text-2xl mt-2 ml-3'></i>
                  <input
                    className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                    type="password"
                    value={password}
                    autoFocus
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder='Password'
                  />
                </div>

              </div>
              <button
                className='p-4 px-6 bg-green-400 ml-4 mt-6 rounded-md'
              >
                Login
              </button>
              <div className='text-lg  mt-4 ml-4 cursor-pointer' onClick={() => {
                navigate("/register")
              }}>
                Don't have an account ? <span className='text-green-600 underline underline-offset-2'> Sign Up</span>

              </div>
            </form>
          </div>

        </div>

        <ToastContainer />
      </div>

    </>
  )
}

export default login