import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Pagedesign from '../Components/SideNav'
import { useState } from 'react'
import login from './Login'
import axios from 'axios'
import { handleError, handleSuccess } from '../../utilities'




function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [secretkey, setSecretkey] = useState("")
  const [branch, setBranch] = useState("")
  const [profilepic,setProfilepic]=useState("")

  

  const navigate = useNavigate();

  const submitprofilepic = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("profilepic", profilepic),
            formData.append("uploadedby",name)
            console.log("hello");
            

            const response = await axios.post("/upload/profilepic", formData)

            const result = response.data
            const { message, success } = result
            if (success) {
                handleSuccess(message)

            }

        } catch (error) {
            handleError("pdf not uploaded")
            console.log(error);
        }


    }

  const handleSubmit = async (e) => {
    e.preventDefault();                                                                    //To prevent reloading of page


    try {
      if (!name || !email || !password ) {
        return handleError("All field are required")
      }
      console.log(role);

      const specialkey = "roshan"
      if (role === "Professor") {
        if (secretkey != specialkey) {
          return handleError("Invalid secretKey !!!")
        }
      }


      const data = {
        role,
        name,
        email,
        password,
        branch
      }
      const response = await axios.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials:true
      })
      console.log(response.data);

      const result = response.data;
      const { success, message,role:userRole } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login")
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      handleError(error.response?.data?.message)
      setEmail("")
    }



  }

  return (
    <>
      <Pagedesign />
      <div className='absolute ml-[20%] top-[12%] shadow-xl rounded-lg '>
        <div className=' h-[75vh] w-[76vw]'>
          <div className='absolute w-[48%] h-[100%] left-0 '>
            <img src="/images/register1.png" alt="" />


          </div>
          <div className='absolute w-[50%]  h-[100%] right-0 bottom-10'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1 className='text-5xl mt-6 mb-16 font-semibold'>
                Register
              </h1>
              <div className='flex flex-col'>
                <div className=' w-[68%] h-12 border-b-2 border-gray-700 mb-7 ml-2  flex text-2xl gap-2'>
                  <i className='fa fa-user-tie'></i>
                  <label >
                    <input type="radio" name="role" value="Student" checked={role === "Student"}
                      onChange={(e) => setRole(e.target.value)} className='mr-2' />Student
                  </label>
                  <label >
                    <input type="radio" name="role" value="Professor" checked={role === "Professor"}
                      onChange={(e) => setRole(e.target.value)} className='mx-2' />Professor
                  </label>
                  
                  
                </div>
               

                <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex'>
                  {role === "Student" ? (
                    <i className='fa fa-user text-2xl mt-2 ml-3'></i>
                  ) : <i className='fa-solid fa-chalkboard-user text-2xl mt-2 ml-3'></i>}

                  <input
                    className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                    type="text"
                    value={name}

                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    placeholder='UserName . . .'
                  />

                </div>
                <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex '>

                  <i className='fa fa-envelope text-2xl mt-2 ml-3'></i>
                  <input
                    className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                    type="email"
                    value={email}
                    autoFocus

                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder='Email . . .'
                  />
                </div>
                <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex'>
                  <i className='fa fa-lock text-2xl mt-2 ml-3'></i>
                  <input
                    className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                    type="password"
                    value={password}
                    autoFocus

                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder='Password'
                  />
                </div>
                 {role === "Professor" ? (
                  <>
                  <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex'>
                    <i className='fa-solid fa-key text-2xl mt-2 ml-3'></i>
                    <input
                      className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                      type="text"
                      value={secretkey}

                      onChange={(e) => {
                        setSecretkey(e.target.value)
                      }}
                      placeholder='Secret Key . . .'
                    />
                    
                  </div>
                  <div className=' w-[70%] h-12 border-b-2 border-gray-700 mb-7 flex '>

                  <i className='fa-solid fa-code-branch text-2xl mt-2 ml-3'></i>
                  <input
                    className='h-12 w-[90%] bg-transparent ml-10 border-none focus:outline-none text-2xl'
                    type="text"
                    value={branch}
                    autoFocus

                    onChange={(e) => { setBranch(e.target.value) }}
                    placeholder='Departement . . .'
                  />
                </div>
                  
                  
                  </>
                  
                ) :null}
                 {role==="Student"?(
                  <>
                    <div className='underline flex items-center'>
                      <i className='fa-solid fa-code-branch text-3xl ml-4 mb-3 '></i>
                      <select
                        onChange={(e) => setBranch(e.target.value)}
                        className='h-12 w-[55%] ml-8 mb-3  bg-slate-300 rounded-lg focus:ring-2 focus:border-blue-500'>
                        <option value="">select branch</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="ELECTRICAL">ELECTRICAL</option>
                        <option value="MECH">MECH</option>
                        <option value="MME">MME</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="PIE">PIE</option>
                      </select>
                    </div>
                    <div>
                      
                        <input 
                          type="file"
                          onChange={(e)=>setProfilepic(e.target.files[0])}
                        />
                        <button 
                          className='bg-slate-200 p-2 rounded-lg hover:bg-slate-300 transition hover:scale-105'
                          onClick={(e)=>submitprofilepic(e)}>
                          submit
                        </button>
                        
                      
                    </div>

                  </>
                ):null}
              </div>
              <button
                
                className='p-4 px-6 bg-purple-300 ml-4 mt-6 rounded-md hover:bg-purple-400 transition hover:scale-105'
              >
                Register
              </button>
              <div className='text-lg  mt-4 ml-4 cursor-pointer' onClick={() => {
                navigate("/login")
              }}>
                already have an account ?  <span className='underline text-purple-600'>Login</span>

              </div>
            </form>
          </div>

        </div>

        <ToastContainer />
      </div>
    </>
  )
}

export default Signup