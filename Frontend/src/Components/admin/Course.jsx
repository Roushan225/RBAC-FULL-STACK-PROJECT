
import { useState } from "react";
import axios from "axios";

function Course() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/admin/course", form, {
        withCredentials: true   
      });

      alert("Course added!");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex flex-col w-[30vw] h-[20vw] place-items-center bg-pink-200 justify-around"
    >
      <input
        placeholder="Title"
        onChange={(e) => setForm({...form, title: e.target.value})}
        className="w-[100%] text-2xl rounded border border-black h-12  placeholder:pl-5 "
      />
      <input
        placeholder="Description"
        onChange={(e) => setForm({...form, description: e.target.value})}
        className="w-[100%] text-2xl rounded border border-black h-12  placeholder:pl-5 "
      />

      <button 
        type="submit"
        className="p-3 bg-blue-400 rounded"
      >

        Add Course
        </button>
    </form>
  );
}

export default Course;