import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../../utilities'
import { ToastContainer } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import Profsidenavbar from './Profsidenavbar'


function ProfessorDashboard() {

  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [professor, setProfessor] = useState(null)
  const [branch,setBranch]=useState("All")
  const [profilepic,setprofilepic]=useState([])


 
  

  const filteredStudent=
    users.filter((user)=>{
      if(user.role !=="Student")return false;
      if(branch ==="All")return true;
      return user.branch===branch
    })
    
    


  

  useEffect(() => {
    const fetchusers = async (e) => {


      try {
        const response = await axios.get("/admin/user")

        setUsers(response.data)


      } catch (error) {
        console.log(error);
      }
    }
    fetchusers()

    

    const fetchprofilepic =async ()=>{
            try {
                const response= await axios.get("/upload/getallpic");

                setprofilepic(response.data)
                console.log(response.data);
                
            } catch (error) {
                console.log(error);
                
            }
            
            
        }
        fetchprofilepic()

        const interval = setInterval(() => {
      fetchusers();
      
    }, 3000);
    return () => clearInterval(interval)

  }, [])


  const deleteUser = async (id) => {

    try {
      const response = await axios.delete(`/admin/deleteuser/${id}`)

      handleSuccess(response.data.message);

      setUsers(prev => prev.filter(user =>
        user._id !== id
      ))

    } catch (error) {
      console.log(error);

    }
  }

  const present = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`/professor/present/${id}`)
      const result = response.data
      console.log(result);
      console.log(result.message);
      return handleSuccess(result.message)



    } catch (error) {
      handleError(error.response?.data?.message)

    }
  }
  const absent = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`/professor/absent/${id}`)
      const result = response.data
      console.log(result);
      console.log(result.message);
      return handleSuccess(result.message)



    } catch (error) {
      handleError(error.response?.data?.message)

    }
  }




  return (
    <>
      < Profsidenavbar />
      

      <div

        className='absolute h-[88vh] w-[88vw] bg-white shadow-lg  top-[12vh] left-[12vw] grid grid-cols-3 grid-rows-3'>
        <div className='absolute bottom-[90vh] left-[40vw] transition duration-[0.3s]  '>
          <select
            onChange={(e) => setBranch(e.target.value)}
            className='h-12 w-[25vw] ml-8 mb-3 shadow-md  bg-slate-100 px-4 text-xl rounded-lg focus:ring-2 focus:border-blue-500 transition duration-[0.3s] hover:bg-yellow-100'>
            <option value="All">select branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ELECTRICAL">ELECTRICAL</option>
            <option value="MECH">MECH</option>
            <option value="MME">MME</option>
            <option value="CIVIL">CIVIL</option>
            <option value="PIE">PIE</option>
          </select>
        </div>

        {filteredStudent.map((user) =>

          (
            <>
              <div className={user.role === "Student" ?
                'w-[28vw] h-[25vh] bg-yellow-50 shadow-md flex ml-2 rounded-lg' :
                'w-[28vw] h-[25vh] bg-indigo-100 shadow-md flex rounded-lg'
              } >


                <div className='w-[40%] h-[100%] place-content-center rounded-lg'>
                  <div >
                    {profilepic.filter((pic)=>pic.uploadedby===user.name).map((pics)=>{
                      return (
                        <>
                        <img src={pics.filepath} className='h-36 w-36 object-cover rounded-full z-10' ></img>
                        </>
                      )
                    })}
                  </div>
                </div>
                <div className='flex flex-col justify-around '>
                  <div>
                    <h1 className='text-4xl'>{user.name}</h1>
                    <h2>{user.branch}</h2>
                    <h4 className='font-light'>{user.email}</h4>
                    
                  </div>


                  <div className='border border-yellow-700 shadow-lg w-40 p-1 px-2 rounded-3xl'>
                    <h4>Present: {user.present}</h4>

                    <h4>Attendance : {(user.present / user.totalclasses * 100).toFixed(1)}</h4>
                  </div>
                  <div className='flex gap-2'>
                    <h1 className='text-3xl p-1 shadow-xl border-green-400 cursor-pointer border-2 backdrop:blur-xl text-green-600 
                    hover:bg-green-500 hover:text-white transition duration-[0.3s] rounded-3xl'
                      onClick={() => present(user._id)}
                    >
                      Present
                    </h1>
                    <h1 className='text-3xl p-1 border-red-400 cursor-pointer border-2 backdrop:blur-xl
                     hover:bg-red-500 hover:text-white text-red-600 transition duration-[0.3s]  rounded-3xl'
                      onClick={() => absent(user._id)}
                    >
                      Absent
                    </h1>
                  </div>


                </div>
                <div className=' h-10 left-6 relative transition duration-[0.3s]  hover:scale-110'>
                  <i className='fa-solid fa-trash text-2xl text-red-500  cursor-pointer absolute right-3 '
                    onClick={() => deleteUser(user._id)}

                  ></i>
                </div>
              </div>
            </>
          )
          )}


      </div>
      <ToastContainer />




    </>
  )
}

export default ProfessorDashboard