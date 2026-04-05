import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { handleError, handleSuccess } from '../../utilities'
import { ToastContainer } from 'react-toastify'

function Calendar() {
  const [title,setTitle]=useState("")
  const [description,setDescription,]=useState("")
  const [date,setDate]=useState("")
  const [type,setType]=useState("")



const handleSubmit = async (e) => {
  e.preventDefault()
    

  try {
    const data={
        title,
        description,
        date,
        type
    }
    await axios.post("/calendar/addEvent", data,{
        headers: {
          "Content-Type": "application/json"
        }
      });

    handleSuccess("event added succesfully")

    // reset form
    

    
    

  } catch (err) {
    console.log(err);
  }
};
  return (
    
    <>
    <form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow-md w-[300px] mx-auto mt-10"
>

  <h2 className="text-xl font-bold mb-4 text-center">
    Add Event
  </h2>

  <input
    type="text"
    name="title"
    placeholder="Title"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    className="w-full mb-3 p-2 border rounded"
  />

  <input
    type="text"
    name="description"
    placeholder="Description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    className="w-full mb-3 p-2 border rounded"
  />

  <input
    type="date"
    name="date"
    value={date}
    onChange={(e)=>setDate(e.target.value)}
    className="w-full mb-3 p-2 border rounded"
  />

  <select
    name="type"
    value={type}
    onChange={(e)=>setType(e.target.value)}
    className="w-full mb-4 p-2 border rounded"
  >
    <option value="">Select Type</option>
    <option value="exam">Exam</option>
    <option value="assignment">Assignment</option>
    <option value="holiday">Holiday</option>
  </select>

  <button
    type="submit"
    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
  >
    Add Event
  </button>

</form>
<ToastContainer />
    </>
  )
}

export default Calendar