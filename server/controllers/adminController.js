import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";
import { sendEmail } from "../services/sendEmailService.js";

export async function saveAdmin(req, res) {
  try {
    const { username, email, password, fullname, role, phoneNo, adminZones } =
      req.body;

    // validation should be here

    // check if admin with same email already exist or not
    const admin = await Admin.find({
      $or: [{ email: email }, { phoneNo: phoneNo }],
    });

    console.log("admin found is", admin);

    if (admin && admin.length > 0) {
      return res.status(400).json({
        error: "Admin With Email or Phone Number Already  Exist",
      });
    }

    // Admin doesn't exist

    const insertAdmin = await new Admin({
      username: username,
      email: email,
      password: password,
      fullname: fullname,
      role: role,
      phoneNo: phoneNo,
      adminZones: adminZones,
    });

    let result = await insertAdmin.save();

    console.log("result of save operation is ", result);

    // Provide success message
    res.status(200).json({ message: "Admin Has Been Successfully Onboarded" });
  } catch (error) {
    console.log("Error in save Admin function", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find agent by email
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, agent.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Agent successfully authenticated
    res.status(200).json({
      message: "Agent login successful",
      agent: {
        id: agent._id,
        profileImage: agent.profileImage,
        username: agent.username,
        email: agent.email,
        title: agent.title,
        fullname: agent.fullname,
        // Add any additional fields you want to include
      },
    });
  } catch (error) {
    console.error("Error in login function", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAgentsListForApproval(req, res) {
  try {
    const { adminZones } = req.body;

    if (adminZones && adminZones.length > 0) {
      // find all agents who are not approved or rejected by admin
      const getAgents = await Agent.find({
        zoneNumber: {
          $in: adminZones,
        },
        verified: false,
        approvedOn: {
          $in: ["", null],
        },
      });

      console.log("Agents", getAgents);

      if (getAgents && getAgents.length > 0) {
        res.status(200).json({ msg: "Success", result: getAgents });
      } else {
        res.status(400).json({ msg: "NO Agents Pending for Approval" });
      }
    }
  } catch (error) {
    console.log("Error in getAgentsListForApproval", getAgentsListForApproval);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Use arrow function for async function
// Use arrow function for async function
export const approveAgent = async (req, res) => {
  try {
    const { email, verifiedStatus } = req.body;

    const updateResult = await Agent.updateOne(
      { email },
      {
        $set: {
          verified: verifiedStatus,
          approvedOn: new Date().toISOString(),
        },
      }
    );

    console.log("Update result:", updateResult);

    // Check the update result
    if (updateResult.nModified > 0) {
      res.status(200).json({
        msg: `Verified Status Has Been Successfully Updated for ${email}`,
      });
    } else {
      res.status(400).json({
        msg: `Unable to update the Agent with email ${email} or no modifications made`,
      });
    }
  } catch (error) {
    console.error("Error in approveAgent Code", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
