import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../../utilities'
import { ToastContainer } from 'react-toastify'
import SideNav from '../shared/SideNav'

function Professorpdf() {
    const [viewpdf, setViewpdf] = useState([])
    const [user, setUser] = useState(null)
    const [pdfname, setPdfname] = useState("")
    const [file, setFile] = useState("")

    const navigate = useNavigate()

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
        <SideNav
            title="Professor Panel"
            userName={user?.name || 'Professor'}
            onLogout={handleLogout}
            links={[
                { label: 'Students', path: '/professordashboard', icon: 'fa-solid fa-users' },
                { label: 'Assignments', path: '/Professorpdf', icon: 'fa-solid fa-file' },
                { label: 'Calendar', path: '/calendar', icon: 'fa-solid fa-calendar-alt' }
            ]}
        >
            <div className='space-y-6'>
                <div className='rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-6 text-white shadow-xl'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
                        <div>
                            <p className='text-sm uppercase tracking-[0.3em] text-blue-200'>Assignments</p>
                            <h1 className='mt-2 text-3xl font-semibold'>Student assignment center</h1>
                            <p className='mt-2 text-sm text-slate-300'>Upload new assignments and review student submissions from one place.</p>
                        </div>
                        <div className='rounded-2xl bg-white/10 p-4 backdrop-blur'>
                            <p className='text-sm text-slate-300'>Files available</p>
                            <h2 className='mt-1 text-2xl font-semibold'>{viewpdf.filter((pdf) => pdf.role === 'Student').length}</h2>
                        </div>
                    </div>
                </div>

                <div className='grid gap-6 xl:grid-cols-[1.1fr_0.9fr]'>
                    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                        <div className='mb-5 flex items-center justify-between'>
                            <div>
                                <h2 className='text-xl font-semibold text-slate-800'>Upload assignment</h2>
                                <p className='text-sm text-slate-500'>Share a new PDF assignment with students.</p>
                            </div>
                            <div className='rounded-full bg-blue-50 p-3 text-blue-600'>
                                <i className='fa-solid fa-file-arrow-up'></i>
                            </div>
                        </div>

                        <form className='space-y-4' onSubmit={(e) => submitfile(e)}>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Assignment name</label>
                                <input
                                    type='text'
                                    onChange={(e) => setPdfname(e.target.value)}
                                    value={pdfname}
                                    className='w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                                    placeholder='Assignment name . . .'
                                />
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>PDF file</label>
                                <input
                                    type='file'
                                    className='w-full rounded-xl border border-slate-300 p-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100'
                                    accept='application/pdf'
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            <button className='w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700'>
                                <i className='fa-solid fa-paper-plane mr-2'></i>
                                Submit assignment
                            </button>
                        </form>
                    </div>

                    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                        <div className='mb-5 flex items-center justify-between'>
                            <div>
                                <h2 className='text-xl font-semibold text-slate-800'>Student submissions</h2>
                                <p className='text-sm text-slate-500'>Open any uploaded assignment in a new tab.</p>
                            </div>
                            <div className='rounded-full bg-emerald-50 p-3 text-emerald-600'>
                                <i className='fa-solid fa-file-pdf'></i>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            {viewpdf.filter((pdf) => pdf.role === 'Student').length === 0 ? (
                                <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500'>
                                    No assignments uploaded yet.
                                </div>
                            ) : (
                                viewpdf.filter((pdf) => pdf.role === 'Student').map((pdf) => (
                                    <div key={pdf._id} className='rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-400 hover:shadow-sm'>
                                        <div className='flex items-start justify-between gap-3'>
                                            <div className='flex gap-3'>
                                                <div className='rounded-xl bg-red-100 p-3 text-red-600'>
                                                    <i className='fa-solid fa-file-pdf'></i>
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold text-slate-800'>{pdf.pdfname}</h3>
                                                    <p className='mt-1 text-sm text-slate-500'>Uploaded by {pdf.uploadedby}</p>
                                                </div>
                                            </div>
                                            <a
                                                href={`http://localhost:3001/${pdf.filepath}`}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-full bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-600 hover:text-white'
                                            >
                                                <i className='fa-solid fa-arrow-up-right-from-square mr-2'></i>
                                                View
                                            </a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </SideNav>
    )
}

export default Professorpdf