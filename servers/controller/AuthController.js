const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const userSchema = require("../schema/UserSchema");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Ajv = require("ajv");  
const nodemailer = require("nodemailer");

const ajv = new Ajv();
const validate = ajv.compile(userSchema);

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;
    const valid = validate(req.body);

    if (!valid) {
      return res.status(400).json({
        message: "Invalid user data",
        errors: validate.errors,
      });
    }
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Username, email, and password are required',
      });
    }
    
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    
    // Create User
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      contact,
      role
    });

    res.status(200).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Debugging: Log the stored and input passwords (remove in production)
    console.log('Stored hash:', email);
    console.log('Input password:', password);

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Password comparison failed');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        role: user.role ,
        
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    // Set cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact: user.contact
      },
      token: token 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

const checker = (req, res)=>{
  res.send("here")
}

const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    }

    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact: user.contact
      }
    });

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        isAuthenticated: false,
        message: "Token expired" 
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        isAuthenticated: false,
        message: "Invalid token" 
      });
    }
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Server error during token verification" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ message: 'Users retrieved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};


// Add this to your existing controller file
const getUserProfile = async (req, res) => {
  try {
    console.log('Request user:', req.user); // Debugging log
    
    if (!req.user?.userId) {
      return res.status(401).json({ 
        message: "Unauthorized - No user ID found",
        debug: { user: req.user } // Additional debug info
      });
    }

    const user = await User.findById(req.user.userId)
      .select('-password -__v -resetToken');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;



  try {
    // Validate ID exists
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Update the user in the database
    const result = await User.updateOne(
      { _id: id }, // Filter by ID
      { $set: { name, email, contact } } // Update these fields
    );


    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ 
        message: "No changes made", 
        user: await User.findById(id) 
      });
    }

    res.status(200).json({ 
      message: "User updated successfully",
      user: await User.findById(id) 
    });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ 
      message: "Failed to update user",
      error: error.message 
    });
  }
};

// Delete a shipment by tracking code
const UserDelete = async (req, res) => {
  const { id } = req.params; // or _id if you prefer
  
  console.log("Deleting user with ID:", id);

  try {
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // For UUID (since you're using UUID format)
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ 
      message: "User deleted successfully",
      deletedId: id
    });

  } catch (error) {
    console.error("Deletion error:", error);
    return res.status(500).json({ 
      message: "Error deleting user",
      error: error.message 
    });
  }
};

const deleteAllUser = async (req, res) => {
  try {
    // Delete all shipments from the Shipments table
    const result = await User.destroy({
      where: {},  // No condition, deletes all records
    });

    if (result === 0) {
      return res.status(404).json({ message: 'No shipments found to delete' });
    }

    res.status(200).json({ message: 'All shipments deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shipments', error });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate Reset Token (JWT)
        const resetToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" } 
        );

        // Send Reset Email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset email sent. Please check your inbox." });

    } catch (error) {
        console.error("Error in forgot password", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successfully." });

    } catch (error) {
        console.error("Error resetting password", error);
        res.status(400).json({ message: "Invalid or expired token." });
    }
};

const logoutUser = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    
    res.clearCookie('role', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: "Unauthorized - No user ID found" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error during password change" });
  }
};


module.exports = { checker, registerUser, changePassword, loginUser, verifyToken, getUserProfile, forgotPassword, resetPassword ,logoutUser,getAllUsers,UserDelete, deleteAllUser, updateUser};