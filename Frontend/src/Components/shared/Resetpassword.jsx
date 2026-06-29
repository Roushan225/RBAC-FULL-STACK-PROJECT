import axios from 'axios'
import React, { useEffect } from 'react'

function Resetpassword() {

    const handleresetpassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/resetpassword", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {

        }
    }

    return (

        <>
        <form onSubmit={(e)=>handleresetpassword(e)}>
            <input type="email" name="" id="" />
            <button>
                submit
            </button>
        </form>
        </>
    )
}

export default Resetpassword