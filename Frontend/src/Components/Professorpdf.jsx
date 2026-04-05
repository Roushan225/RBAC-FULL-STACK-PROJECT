import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Document, Page } from 'react-pdf'
import Profsidenavbar from './Profsidenavbar'
import ProfessorDashboard from './ProfessorDashboard'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess } from '../../utilities'
import { ToastContainer } from 'react-toastify'

function Professorpdf() {
    const [viewpdf, setViewpdf] = useState([])
    const [user, setUser] = useState(null)
    const [pdfname, setPdfname] = useState("")
    const [file, setFile] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"))
        if (!data) {
            navigate("/login");
            return;
        }

        setUser(data)


    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login")
        handleSuccess("User Logout Successful")
    }


    useEffect(() => {
        const fetchpdf = async () => {
            try {
                const response = await axios.get("/upload/pdf/getallpdf");
                console.log(response.data);
                setViewpdf(response.data)



            } catch (error) {
                console.log(error);

            }
        }

        fetchpdf()

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

    return (

        <><div className='h-[100vh] w-[100vw] bg-slate-100'>
            <div className='w-[10vw] h-[88vh] bottom-0  bg-white  absolute left-0'>
                <h2 className='absolute w-[100%] h-[8vh] rounded-xl text-center hover:bg-purple-100 bg-white mt-8 text-3xl '
                >
                    <Link to="/Professordashboard">User</Link>
                </h2>
                <h2 className='absolute w-[100%] h-[8vh] rounded-xl text-center bg-purple-100 mt-[20vh] text-3xl'>
                    <Link to="/Professorpdf">PDF</Link>
                </h2>


            </div>
            <div className='h-[12vh] w-[100] bg-white relative'>
                <h1 className='text-3xl relative left-[30vw] top-5 rounded-lg w-[32vw] p-2 bg-purple-100 '>
                    Assignment uploaded by Student
                </h1>
                <button className='shadow-lg p-3 px-9 bottom-4 rounded-lg text-xl absolute right-5 hover:bg-red-500 hover:text-white transition duration-[.5s]'
                        onClick={(e)=>handleLogout(e)}
                >
                    <i className='fa-solid fa-arrow-right-from-bracket mr-1'></i>
                    Logout
                </button>
            </div>

            <div className='h-[80vh] w-[80vw] ml-[10vw]  flex flex-wrap gap-2'>


                {viewpdf.filter((pdf) => pdf.role === "Student").map((pdf) => {
                    return (
                        <>

                            <div className='h-[15vh] ml-2 w-[20vw] border-2 bg-white hover:border-blue-500 shadow-xl flex justify-evenly my-3 rounded-lg text-center jc'>

                                {/* <iframe src={`http://localhost:3001/${pdf.filepath}`}
                                    height="100%"
                                    width="550px"
                                    className=' transition duration-200'
                                /> */}
                                <div className=' ml-6'>
                                    <img src="./images/pdfimage1.png"
                                        className='w-[10vw] relative right-10'
                                    />
                                    <h1 className='relative bottom-5 right-9'>
                                        {pdf.pdfname}
                                    </h1>
                                </div>

                                <div className=' relative right-11  p-5 '>
                                    <a href={`http://localhost:3001/${pdf.filepath}`}
                                        target='_blank'
                                        className='text-lg  bg-red-200 border-2  border-red-400 p-2 rounded-lg '
                                    >view pdf</a>

                                    <h1>uploaded By : <span className='text-green-600'>{pdf.uploadedby}</span></h1>
                                </div>



                            </div>

                        </>
                    )
                })}
            </div>
            <form
                className='flex flex-col left-40 shadow-lg bg-white top-[60vh] justify-around border-gray-200 border-2 absolute rounded-lg  h-[30vh] w-[30vw] items-center '
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
                <button className='p-2 bg-blue-500 px-4 rounded-lg hover:scale-105 transition duration-[.5s] hover:opacity-80'>
                    Submit
                </button>
            </form>
        </div>


            <ToastContainer />
        </>
    )
}

export default Professorpdf