import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";
import {sendEmail} from "../services/sendEmailService.js"

export async function saveAdmin(req, res) {
    try {

        const { username, email, password, fullname, role, phoneNo, adminZones } = req.body;
      
        // validation should be here 



        // check if admin with same email already exist or not 
        const admin = await Admin.find({
            $or: [
                { email: email },
                { phoneNo: phoneNo }
            ]
        });

        console.log("admin found is", admin);

        if (admin && admin.length > 0) {
            return res.status(400).json({
                error: "Admin With Email or Phone Number Already  Exist",
            });
        }

        // Admin doesn't exist 

        const insertAdmin = await new Admin({
            "username": username, "email": email, "password": password, "fullname": fullname, "role": role, "phoneNo": phoneNo, "adminZones": adminZones
        })

        let result = await insertAdmin.save()

        console.log("result of save operation is ", result);

        // Provide success message
        res.status(200).json({ message: "Admin Has Been Successfully Onboarded" });



    } catch (error) {
        console.log("Error in save Admin function", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getAgentsListForApproval(req,res){
    try{
        const { adminZones } = req.body;

        if(adminZones && adminZones.length > 0){

            // find all agents who are not approved or rejected by admin
            const getAgents = await Agent.find({
               zoneNumber : {
                "$in": adminZones
               },
               verified : false,
               approvedOn : {
                "$in": ["", null]
               }
            });

            console.log("Agents" , getAgents);

            if (getAgents && getAgents.length > 0) {

              res.status(200).json({ msg: "Success", result: getAgents });
            }else{
                res.status(400).json({ msg: "NO Agents Pending for Approval" });
            }
        }


    }catch(error){
        console.log("Error in getAgentsListForApproval", getAgentsListForApproval);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function approveAgent(req,res){
    try{
        const { email , verrifiedStatus } = req.body

        //validation here
        sendEmail()

        // const updateResult =  await Agent.updateOne({ email : email} , {
        //     "$set": {
        //         verified : verrifiedStatus,
        //         approvedOn : new Date().toISOString()
        //     } }, { new : true}
        // )
        // console.log("update result is" , updateResult);
        // if(updateResult){
        //     res.status(200).json({ msg: "Verified Status Has Been Successfully Updated" });
        // }else{
        //     res.status(400).json({ msg: "Unable to update the Agent" });
        // }


    }catch(error){
        console.log("Error in approveAgent Code", error);
    }
}
