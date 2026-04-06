import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../utilities'
import { useNavigate } from 'react-router-dom'
import ShowCalendar from './showCalendar'

function UserDashboard() {
    const [file, setFile] = useState("")
    const [user, setUser] = useState(null)
    const [pdfname, setPdfname] = useState("")
    const [viewpdf, setViewpdf] = useState([])
    const [profilepic, setprofilepic] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const fetchpdf = async () => {
            try {
                const response = await axios.get("/upload/pdf/getallpdf");
                console.log(response.data);
                setViewpdf(response.data)
                console.log(viewpdf);



            } catch (error) {
                console.log(error);

            }
        }
        fetchpdf()

        const fetchprofilepic = async () => {
            try {
                const response = await axios.get("/upload/getallpic");

                setprofilepic(response.data)
                console.log(response.data);

            } catch (error) {
                console.log(error);

            }


        }
        fetchprofilepic()

    }, [])

    const submitfile = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("pdf", file)
            formData.append("pdfname", pdfname)
            formData.append("uploadedby", user.name)
            formData.append("role", user.role)

            const response = await axios.post("/upload/pdf", formData)

            const result = response.data
            const { message, success } = result
            if (success) {
                handleSuccess(message)
                setPdfname("")

            }

        } catch (error) {
            handleError("pdf not uploaded")
            console.log(error);
        }


    }

    useEffect(() => {
        // const data = JSON.parse(localStorage.getItem("user"))
        // if (!data) {
        //     navigate("/login");
        //     return;
        // }
        // setUser(data)

        const checkUser=async ()=>{
            try {
                const response=await axios.get("/auth/me",{
                    withCredentials:true
                })
                console.log(response.data.user);
                setUser(response.data.user)
                
            } catch (error) {
                navigate("/login")
            }
        }
        checkUser();
    }, [])

    const handleLogout = async() => {
        await axios.post("/auth/logout",{},{
            withCredentials:true
        });
        handleSuccess("Professor Logout Succesfully")

        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }

    return (
        <>

            <div className='h-[100vh] bg-slate-200  '>
                <div className='h-[10vh] w-[89.4%] rounded-xl bg-white shadow-md flex justify-between items-center'>
                    <div className='flex flex-col ml-16'>
                        <h1
                            className='text-4xl ml-5 p-3'
                        >Welcome    <span className='text-green-500'>{user?.name}. . .</span></h1>
                        <h1 className='text-xl ml-10 relative bottom-3'>
                            {user?.email}
                        </h1>
                        <h2 className='text-md ml-10 relative bottom-3'>
                            {user?.branch}
                        </h2>

                    </div>
                    <button
                        className=' h-20 rounded-xl absolute text-xl right-1  w-36 bg-white shadow-lg  items-center  hover:bg-red-500 hover:text-white transition duration-[.5s] '
                        onClick={(e) => handleLogout(e)}>
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        logout
                    </button>

                    <div className='h-16 w-16 absolute object-cover left-6 rounded-full'>
                        {profilepic.filter((pic) => pic.uploadedby === user.name).map((pic) => {
                            return (
                                <>
                                    <img src={pic.filepath} className='rounded-full h-16 w-16' />
                                </>
                            )
                        })}


                    </div>
                </div>



                <form
                    className='flex flex-col left-[38vw] shadow-lg top-[45.8vh] justify-around bg-white absolute rounded-lg  h-[30vh] w-[29vw] items-center '
                    onSubmit={(e) => submitfile(e)}
                >
                    <h1 className='text-2xl'>
                        Upload Assignment
                    </h1>
                    <input type="text"
                        onChange={(e) => setPdfname(e.target.value)} value={pdfname}
                        className='  mx-2 w-72 border-2 border-black rounded-lg p-2'
                        placeholder='Assignment name . . .'
                    />
                    <input
                        type="file"
                        className='  mx-2 w-72 border-2 border-black rounded-lg p-1'
                        accept='application/pdf'
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button className='p-2 bg-green-200 px-4 rounded-lg shadow-md hover:scale-105 hover:bg-green-500 hover:shadow-lg transition duration-[.5s] hover:opacity-80'>
                        Upload
                    </button>
                </form>
                <div className='flex grid-rows-4 left-[38vw] shadow-xl top-28 gap-2 flex-wrap bg-white absolute rounded-lg  h-[30vh] w-[60vw] items-start '>
                    {viewpdf.filter((pdf) => pdf.uploadedby === user?.name).map((pdf) => {
                        return (
                            <>

                                <div className='h-[12vh] w-[15vw] mt-2 relative border  ml-2 shadow-xl  rounded-lg text-center '>
                                    <h1 className='h-16 w-[20vw]   absolute left-[20vw] font-semibold text-xl '>
                                        preview Assignment
                                    </h1>
                                    <div className='absolute bottom-3 w-[50%] h-[100%]  left-0'>
                                        <img src="./images/pdfimage1.png"
                                            className='hover:scale-105 transition duration-[0.3s] cursor-default'
                                        />
                                        <h1 className='relative bottom-4'>
                                            {pdf.pdfname}
                                        </h1>
                                    </div>

                                    <div className=' absolute right-0 w-[60%] h-[100%] top-10 '>
                                        <a href={`http://localhost:3001/${pdf.filepath}`}
                                            target='_blank'
                                            className='text-lg  bg-green-200 border-2  hover:bg-green-500 hover:scale-110 transition  p-2 rounded-lg hover:opacity-80  '
                                        >view pdf
                                        </a>

                                    </div>



                                </div>
                            </>
                        )

                    })}
                </div>
                <div className='flex flex-col right-8 shadow-lg top-[45.7vh] justify-around bg-white   absolute rounded-lg  h-[30vh] w-[30vw] items-center '>
                    <h1 className='absolute top-5 text-2xl'>
                        Attendance
                    </h1>
                    <h1 className='text-xl absolute left-5 top-20 '>
                        Present :   <span>{user?.present}</span>
                    </h1>
                    <h1 className='text-xl absolute left-5 top-28 '>
                        Absent :   <span>{user?.totalclasses - user?.present}</span>
                    </h1>
                    <h1 className='text-xl absolute left-5 top-36  '>
                        Total Classes :  <span>{user?.totalclasses}</span>
                    </h1>
                    <h1 className='text-xl absolute left-5 top-52  '>
                        Attendance Percent :   <span>{(user?.present / user?.totalclasses * 100).toFixed(1)} %</span>
                    </h1>
                </div>
                <div className='flex grid-rows-4 left-[38vw] shadow-xl top-[78vh] gap-2 flex-wrap bg-white absolute rounded-lg  h-[20vh] w-[60vw] items-start '>
                    <h1 className='h-5  absolute left-[40%] font-semibold text-xl top-2'>
                        Professor Assignment
                    </h1>
                    {viewpdf.filter((pdf) => pdf.role === "Professor").map((pdf) => {
                        return (
                            <>
                                <div className='h-[14vh] w-[15vw] mt-2 top-5 relative border  ml-2 shadow-xl  rounded-lg text-center '>

                                    <div className='absolute bottom-3 w-[50%] h-[100%]  left-0'>
                                        <img src="./images/pdfimage1.png"
                                            className='hover:scale-105 transition duration-[0.3s] cursor-default'
                                        />
                                        <h1 className='relative bottom-4'>
                                            {pdf.pdfname}
                                        </h1>
                                    </div>

                                    <div className=' absolute right-0 w-[60%] h-[100%] top-5 '>
                                        <a href={`http://localhost:3001/${pdf.filepath}`}
                                            target='_blank'
                                            className='text-lg  bg-green-200 border-2 hover:scale-110  border-green-400 p-2 rounded-lg hover:opacity-80  '
                                        >view pdf
                                        </a>
                                        <h3 className='mt-2'>
                                            Uploaded by : {pdf.uploadedby} Sir
                                        </h3>

                                    </div>



                                </div>
                            </>
                        )

                    })}
                </div>

                <div className='abolute '>
                    <ShowCalendar />
                </div>


            </div>

            <ToastContainer />


        </>
    )
}

export default UserDashboard