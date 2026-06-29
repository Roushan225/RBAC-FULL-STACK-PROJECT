
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../../utilities'
import { Navigate, useNavigate } from "react-router-dom";




function AdminLoginLogs() {
    const navigate = useNavigate()
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchlogs = async () => {
            try {
                const response = await axios.get("/admin/loginlogs", {
                    withCredentials: true,
                });
                console.log(logs);
                setLogs(response.data)

            } catch (error) {
                console.log(error);

            }
        }

        fetchlogs();

    }, []);

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
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-800">Login Logs</h2>
                        <p className="text-slate-500 mt-2">Recent admin and user login activity</p>
                    </div>
                    <button
                        className='px-5 py-3 rounded-xl text-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition duration-300'
                        onClick={() => handleLogout()}>
                        <i className='fa-solid fa-arrow-right-from-bracket mr-2'></i>
                        Logout
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-slate-800 text-white px-6 py-4">
                        <h3 className="text-xl font-semibold">Activity History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-left text-slate-600">
                                    <th className="px-6 py-4 font-semibold">User</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Time</th>
                                    <th className="px-6 py-4 font-semibold">IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, i) => (
                                    <tr key={i} className="border-t hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 text-lg font-medium text-slate-700">{log.userId?.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{log.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${log.role === "Admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                                                {log.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{new Date(log.loginTime).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-green-600 font-medium">{log.ip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
}

export default AdminLoginLogs;