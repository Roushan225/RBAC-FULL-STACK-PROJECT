import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState,useEffect } from "react";
import axios from "axios";

const ShowCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get("/calendar/getallevent", { withCredentials: true });
    setEvents(res.data);
  };

  return (
    <div className="p-4">
      <Calendar onChange={setValue} value={value} className="custom-calendar"/>

      <div className="mt-8  ">
        {events.map((e) => (
          <div key={e._id}
               className="p-4 w-[30vw]  border-2 border-black rounded mb-2 flex gap-4 items-center hover:shadow-lg transition "
          >
            <h2 className="text-lg font-semibold">{e.title}</h2>
            <p className="text-gray-500 text-sm">{e.description}</p>
            <p className="text-gray-400 text-sm mt-1">{new Date(e.date).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCalendar