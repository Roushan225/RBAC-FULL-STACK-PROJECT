import { useEffect, useState } from "react";
import axios from "axios"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProfessorDashboard from "./Components/professor/ProfessorDashboard"
import AdminDashboard from "./Components/admin/AdminDashboard";
import Resetpassword from "./Components/shared/Resetpassword";
import UserDashboard from "./Components/user/UserDashboard";
import Professorpdf from "./Components/professor/Professorpdf"
import Calendar from "./Components/shared/Calendar";
import AdminLoginLogs from "./Components/admin/AdminLoginLog";
import Course from "./Components/admin/Course"
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/professordashboard" element={<ProfessorDashboard />}/>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reset" element={<Resetpassword />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/Professorpdf" element={<Professorpdf />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/loginlog" element={<AdminLoginLogs />} />
          <Route path="/course" element={<Course />} />
        </Routes>
      </div>

    </>
  )

  // const [email,setEmail]=useState("");  
  // const [password,setPassword]=useState("");  


  // const handleSubmit =async (e)=>{
  //   e.preventDefault();
  //   const data={
  //     email,
  //     password
  //   }
  //   const response=await axios.post("http://localhost:3001",data,{
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   })
  //   console.log(response.data);

  // }

  // return (
  //   <>
  //   <div>
  //     <form onSubmit={(e)=>handleSubmit(e)}>
  //       <h1>Feedback Form</h1>
  //       <div>
  //       <input type="email"
  //              name="email"
  //              value={email} 
  //              placeholder="email"
  //              onChange={(e)=>setEmail(e.target.value)}
  //         />
  //         <input type="password"
  //              name="password"
  //              value={password} 
  //              placeholder="email"
  //              onChange={(e)=>setPassword(e.target.value)}
  //         />


  //       </div>
  //       <button type="submit">Submit</button>

  //     </form>
  //   </div>
  //   </>
  // )


}

export default App
