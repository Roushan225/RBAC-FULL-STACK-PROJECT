import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../../utilities'
import { useNavigate } from 'react-router-dom'
import SideNav from '../shared/SideNav'
import ShowCalendar from '../shared/ShowCalendar'

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
        <SideNav
            title="Student Panel"
            userName={user?.name || 'Student'}
            onLogout={handleLogout}
            links={[
                { label: 'Dashboard', path: '/userdashboard', icon: 'fa-solid fa-home' },
                { label: 'Calendar', path: '/calendar', icon: 'fa-solid fa-calendar-alt' }
            ]}
        >
            <div className='space-y-6'>
                <div className='rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900 p-6 text-white shadow-xl'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/10'>
                                {profilepic.filter((pic) => pic.uploadedby === user?.name).slice(0, 1).map((pic) => (
                                    <img key={pic._id} src={pic.filepath} alt={user?.name} className='h-full w-full object-cover' />
                                ))}
                                {!profilepic.some((pic) => pic.uploadedby === user?.name) && (
                                    <i className='fa-solid fa-user text-2xl text-slate-200'></i>
                                )}
                            </div>
                            <div>
                                <p className='text-sm uppercase tracking-[0.3em] text-emerald-200'>Welcome back</p>
                                <h1 className='text-3xl font-semibold'>{user?.name || 'Student'}</h1>
                                <p className='mt-1 text-sm text-slate-300'>{user?.email}</p>
                                <p className='text-sm text-slate-300'>{user?.branch}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleLogout()}
                            className='rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-500 hover:text-white'
                        >
                            <i className='fa-solid fa-arrow-right-from-bracket mr-2'></i>
                            Logout
                        </button>
                    </div>
                </div>

                <div className='grid gap-6 xl:grid-cols-[1.2fr_0.8fr]'>
                    <div className='space-y-6'>
                        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                            <div className='mb-5 flex items-center justify-between'>
                                <div>
                                    <h2 className='text-xl font-semibold text-slate-800'>Upload assignment</h2>
                                    <p className='text-sm text-slate-500'>Share your completed work as a PDF.</p>
                                </div>
                                <div className='rounded-full bg-emerald-50 p-3 text-emerald-600'>
                                    <i className='fa-solid fa-file-arrow-up'></i>
                                </div>
                            </div>

                            <form className='space-y-4' onSubmit={(e) => submitfile(e)}>
                                <input
                                    type='text'
                                    onChange={(e) => setPdfname(e.target.value)}
                                    value={pdfname}
                                    className='w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                                    placeholder='Assignment name . . .'
                                />
                                <input
                                    type='file'
                                    className='w-full rounded-xl border border-slate-300 p-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100'
                                    accept='application/pdf'
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button className='w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-700'>
                                    <i className='fa-solid fa-paper-plane mr-2'></i>
                                    Upload assignment
                                </button>
                            </form>
                        </div>

                        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                            <div className='mb-5 flex items-center justify-between'>
                                <div>
                                    <h2 className='text-xl font-semibold text-slate-800'>Your submissions</h2>
                                    <p className='text-sm text-slate-500'>Quick access to your uploaded assignments.</p>
                                </div>
                                <div className='rounded-full bg-slate-100 p-3 text-slate-600'>
                                    <i className='fa-solid fa-folder-open'></i>
                                </div>
                            </div>

                            <div className='grid gap-3 md:grid-cols-2'>
                                {viewpdf.filter((pdf) => pdf.uploadedby === user?.name).length === 0 ? (
                                    <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500 md:col-span-2'>
                                        No assignments uploaded yet.
                                    </div>
                                ) : (
                                    viewpdf.filter((pdf) => pdf.uploadedby === user?.name).map((pdf) => (
                                        <div key={pdf._id} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                                            <div className='flex items-start justify-between gap-3'>
                                                <div>
                                                    <h3 className='font-semibold text-slate-800'>{pdf.pdfname}</h3>
                                                    <p className='mt-1 text-sm text-slate-500'>Your submission</p>
                                                </div>
                                                <a
                                                    href={`http://localhost:3001/${pdf.filepath}`}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-600 hover:text-white'
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

                    <div className='space-y-6'>
                        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                            <div className='mb-5 flex items-center justify-between'>
                                <div>
                                    <h2 className='text-xl font-semibold text-slate-800'>Attendance</h2>
                                    <p className='text-sm text-slate-500'>Track your current progress.</p>
                                </div>
                                <div className='rounded-full bg-blue-50 p-3 text-blue-600'>
                                    <i className='fa-solid fa-chart-line'></i>
                                </div>
                            </div>

                            <div className='space-y-3 text-sm text-slate-600'>
                                <div className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
                                    <span>Present</span>
                                    <span className='font-semibold text-emerald-600'>{user?.present || 0}</span>
                                </div>
                                <div className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
                                    <span>Absent</span>
                                    <span className='font-semibold text-rose-600'>{(user?.totalclasses || 0) - (user?.present || 0)}</span>
                                </div>
                                <div className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
                                    <span>Total classes</span>
                                    <span className='font-semibold text-slate-800'>{user?.totalclasses || 0}</span>
                                </div>
                                <div className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
                                    <span>Attendance %</span>
                                    <span className='font-semibold text-blue-600'>
                                        {user?.totalclasses ? ((user.present / user.totalclasses) * 100).toFixed(1) : '0.0'}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                            <div className='mb-5 flex items-center justify-between'>
                                <div>
                                    <h2 className='text-xl font-semibold text-slate-800'>Professor assignments</h2>
                                    <p className='text-sm text-slate-500'>Shared resources from your instructors.</p>
                                </div>
                                <div className='rounded-full bg-amber-50 p-3 text-amber-600'>
                                    <i className='fa-solid fa-book-open'></i>
                                </div>
                            </div>

                            <div className='space-y-3'>
                                {viewpdf.filter((pdf) => pdf.role === 'Professor').length === 0 ? (
                                    <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500'>
                                        No professor assignments yet.
                                    </div>
                                ) : (
                                    viewpdf.filter((pdf) => pdf.role === 'Professor').map((pdf) => (
                                        <div key={pdf._id} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                                            <div className='flex items-start justify-between gap-3'>
                                                <div>
                                                    <h3 className='font-semibold text-slate-800'>{pdf.pdfname}</h3>
                                                    <p className='mt-1 text-sm text-slate-500'>By {pdf.uploadedby}</p>
                                                </div>
                                                <a
                                                    href={`http://localhost:3001/${pdf.filepath}`}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='rounded-full bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-600 hover:text-white'
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

                <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
                    <ShowCalendar />
                </div>
            </div>

            <ToastContainer />
        </SideNav>
    )
}

export default UserDashboard