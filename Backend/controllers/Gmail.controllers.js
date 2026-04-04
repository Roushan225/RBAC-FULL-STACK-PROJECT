const express =require("express")
const nodemailer=require("nodemailer")

const sendgmail=async(req,res)=>{
    const {to, subject,html}=req.body
    try {
        const auth = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port:465,
            auth:{
                user:"roushan2029@gmail.com",
                pass:"helndrwkprxgimlg"
            }
        })
        const receiver={
            from:"roushan2029@gmail.com",
            to,
            subject,
            html
        }
        auth.sendMail(receiver,(error,respond)=>{
            if(error)console.log(error);
            console.log("success sent");
            
        })
    } catch (error) {
        console.log(error);   
    }
}

module.exports = {sendgmail}