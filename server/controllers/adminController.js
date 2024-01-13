import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";
import { sendEmail } from "../services/sendEmailService.js";

export async function saveAdmin(req, res) {
  try {
    const { username, email, password, fullname, role, phoneNo, adminZones } =
      req.body;

    // validation should be here

    // check if admin with the same email or phone number already exists
    const admin = await Admin.find({
      $or: [{ email: email }, { phoneNo: phoneNo }],
    });

    console.log("admin found is", admin);

    if (admin && admin.length > 0) {
      return res.status(400).json({
        error: "Admin With Email or Phone Number Already Exist",
      });
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Admin doesn't exist

    const insertAdmin = new Admin({
      username: username,
      email: email,
      password: hashedPassword, // Store the hashed password
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

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Validate password using Argon2
    const isValidPassword = await argon2.verify(admin.password, password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Admin successfully authenticated
    res.status(200).json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        fullName: admin.fullName,
        phoneNo: admin.phoneNo,
        adminZones: admin.adminZones,
        // Add any additional fields you want to include
      },
    });
  } catch (error) {
    console.error("Error in adminLogin function", error);
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
