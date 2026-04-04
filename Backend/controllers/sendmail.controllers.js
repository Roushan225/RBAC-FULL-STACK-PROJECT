const process = require("node:process")
const { Resend } = require("resend")
const dotenv =require("dotenv")
require("dotenv").config();
const resend = new Resend("re_4Xysf16Q_M7iJCuLRLY5kVtaqqU9EDxEo");

const sendmail = async (req,res) => {
    const { to, subject, html }=req.body
    try {
        const {data,error}=await resend.emails.send({
            from: "website <onboarding@resend.dev>",
            to,
            subject,
            html,
        })
        if(error){
            return console.error({error})
        }
        else{
            console.log(data);
            
        }
    } catch (error) {
        console.log(error);
        
    }


}

module.exports ={sendmail}