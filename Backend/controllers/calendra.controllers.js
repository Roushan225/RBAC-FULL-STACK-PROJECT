const calendar =require("../models/calendar")


module.exports.addEvent= async (req,res)=>{
   
   try {
    const {title,description,date,type}=req.body;
    const event= await calendar.create({
        title,
        date,
        description,
        type,
        
    })
    res.json({
        success:true,
        data:event
    })
   } catch (error) {
    res.status(500).json
    
   }
}

module.exports.getEvent = async (req,res)=>{
    try {
        const events =await calendar.find().sort({date:1})
        res.json(events)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}