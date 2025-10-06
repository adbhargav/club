import bcrypt from "bcrypt";
import User from "./models/User.js";

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingUser = await User.findOne({ email: "bhargavandhe202@gmail.com" });
    
    if (existingUser && existingUser.role === "admin") {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("cseaiml3rd", 10);
    
    if (existingUser) {
      // Update existing user to admin
      const adminUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          role: "admin",
          password: hashedPassword,
          name: "Bhargav Admin",
          registerNumber: "ADMIN001",
          branch: "CSE",
          year: "Admin"
        },
        { new: true }
      );
      
      console.log("User updated to admin successfully:", {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      });
    } else {
      // Create new admin user
      const adminUser = await User.create({
        name: "Bhargav Admin",
        email: "bhargavandhe202@gmail.com",
        password: hashedPassword,
        registerNumber: "ADMIN001",
        branch: "CSE",
        year: "Admin",
        role: "admin"
      });

      console.log("Admin user created successfully:", {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      });
    }

  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

// Export the function for use in index.js
export { seedAdmin };

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAdmin();
}
