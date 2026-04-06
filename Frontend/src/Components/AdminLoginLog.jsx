
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../utilities'
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
        <div className="w-[100%] place-items-center">
            <h2 className="text-5xl mt-3">
                Login Logs
            </h2>
            <button
                className=' h-20 mr-[5vw] rounded-xl absolute text-xl right-1 bottom-[90vh]  w-36 bg-slate-100  shadow-lg  items-center  hover:bg-red-500 hover:text-white transition duration-[.5s] '
                onClick={() => handleLogout()}>

                <i className='fa-solid fa-arrow-right-from-bracket'></i>
                logout
            </button>
            <table
                className="w-[90%] mt-8"
            >
                <thead>

                    <tr className="bg-slate-400 h-14 rounded-xl">
                        <th
                            className="relative text-left text-xl"
                        >  User
                        </th>
                        <th
                            className="relative text-left text-xl">Email
                        </th>
                        <th
                            className="relative text-left text-xl">Role
                        </th>
                        <th
                            className="relative text-left text-xl">Time
                        </th>
                        <th
                            className="relative text-left text-xl">IP

                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {logs.map((log, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                            <td
                                className="text-2xl p-3  "
                            >{log.userId?.name}
                            </td>
                            <td>{log.email}</td>
                            <td className={`text-center rounded text-lg transition
                ${log.role === "Admin" ? "bg-red-300 hover:bg-red-400" : "bg-blue-300 hover:bg-blue-400"}`}>
                                {log.role}
                            </td>
                            <td className="">
                                {new Date(log.loginTime).toLocaleString()}
                            </td>
                            <td className="text-green-700">
                                {log.ip}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>

    );
}

export default AdminLoginLogs;