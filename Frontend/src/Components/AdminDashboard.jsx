import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { handleSuccess } from '../../utilities'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminLoginLogs from './AdminLoginLog'

function AdminDashboard() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [profilepic, setprofilepic] = useState([])



    const fetchprofilepic = async () => {
        try {
            const response = await axios.get("/upload/getallpic");

            setprofilepic(response.data)
            

        } catch (error) {
            console.log(error);

        }


    }
    useEffect(() => {
        fetchprofilepic()
    }, [])




    useEffect(() => {
        const fetchusers = async () => {

            try {
                const response = await axios.get("/admin/user")
                console.log(response.data);
                setUsers(response.data)


            } catch (error) {
                console.log(error);
            }
        }
        fetchusers()
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

    const handleLogout = async() => {
        await axios.post("/auth/logout",{},{
            withCredentials:true
        });
        handleSuccess("Professor Logout Succesfully")

        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }

    const loginlog = () => {
        navigate("/loginlog")
    }


    return (
        <>
            <h1 className='text-3xl absolute top-[5vh] left-[15vw] font-bold'>
                Admin Users Data
            </h1>
            <button
                className=' h-20 rounded-xl absolute text-xl right-1  w-36 bg-white shadow-lg  items-center  hover:bg-red-500 hover:text-white transition duration-[.5s] '
                onClick={(e) => logout(e)}>
                <i className='fa-solid fa-arrow-right-from-bracket'></i>
                logout
            </button>
            <button
                className=' h-20 rounded-xl absolute text-xl right-48  w-36 bg-white shadow-lg  items-center  hover:bg-red-500 hover:text-white transition duration-[.5s] '
                onClick={loginlog}>
                <i className='fa-solid fa-arrow-right-from-bracket'></i>
                LoginLog
            </button>
            <div
                className='absolute  w-[90vw] shadow-lg top-[10vh] left-[8vw] gap-4 grid grid-cols-3 flex-wrap grid-rows-3'>
                {users.filter((user) => user.role != "Admin").map((user) => {
                    return (
                        <>
                            <div className={user.role === "Student" ?
                                'w-[28vw] h-[25vh] bg-yellow-100 shadow-md flex rounded-lg' :
                                'w-[28vw] h-[25vh] bg-indigo-100 shadow-md flex rounded-lg'
                            } >


                                <div className='w-[40%] h-[100%] place-content-center rounded-lg'>
                                    <div >
                                        {profilepic.filter((pic) => pic.uploadedby === user.name).map((pics) => {
                                            return (
                                                <>
                                                    <img src={pics.filepath} className='h-36 w-36 object-cover rounded-full z-10' ></img>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex flex-col justify-around '>

                                    <h1 className='text-4xl'>{user.name}</h1>
                                    <h2 className='mb-5'>{user.branch}</h2>
                                    <h4 className='mt-[-40px]'>{user.email}</h4>

                                    <h1 className={user.role === "Student" ?
                                        'text-3xl p-2 border-yellow-600 border-2 backdrop:blur-xl text-yellow-600 rounded-3xl' :
                                        'text-3xl p-2 border-blue-600 border-2 backdrop:blur-xl text-blue-600 rounded-3xl'
                                    }>
                                        {user.role}
                                    </h1>

                                </div>
                                <div className='w-10 h-10 left-6 relative'>
                                    <i className='fa fa-trash text-xl cursor-pointer absolute right-0 '
                                        onClick={() => deleteUser(user._id)}
                                    ></i>
                                </div>
                            </div>
                        </>
                    )
                })}


            </div>

            <ToastContainer />


        </>
    )
}

export default AdminDashboard