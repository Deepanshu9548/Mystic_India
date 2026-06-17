/**
 * Authentication service for handling login functionality
 * Enhanced with more secure authentication methods
 */

// In a real implementation, this would connect to a backend service like Supabase or Firebase
export const authService = {
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // This is a simulated login flow
      // In a real app, this would make an API call to your authentication service
      
      console.log("Login attempt with:", { email });
      
      // Simple validation
      if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }
      
      if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
      }
      
      // Add more secure login logic - simulate backend validation
      // In a real implementation, this validation would happen on a backend server
      
      // Basic security check - prevent brute force
      const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
      const userAttempts = loginAttempts[email] || 0;
      
      // Check if user has too many failed attempts (simulating rate limiting)
      if (userAttempts >= 5) {
        const lastAttemptTime = parseInt(localStorage.getItem(`lastAttempt_${email}`) || '0');
        const currentTime = Date.now();
        
        // If last attempt was less than 15 minutes ago, block the login
        if (currentTime - lastAttemptTime < 15 * 60 * 1000) {
          return { 
            success: false, 
            message: "Too many failed login attempts. Please try again in 15 minutes."
          };
        } else {
          // Reset attempts after 15 minutes
          loginAttempts[email] = 0;
          localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
        }
      }
      
      // Simulate successful login with a mock user
      // In a real implementation, this would come from your backend
      const mockUser = {
        id: "user-123",
        email,
        name: email.split('@')[0],
        isAuthenticated: true,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        bio: "Travel enthusiast exploring the beauty of India",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "Delhi",
          zipCode: ""
        },
        preferences: {
          notifications: true,
          newsletter: true,
          travelAlerts: false
        },
        trips: [
          { id: 1, destination: "Rajasthan", date: "2024-05-15", status: "Upcoming" },
          { id: 2, destination: "Kerala", date: "2023-12-10", status: "Completed" }
        ],
        savedStates: ["kerala", "rajasthan"],
        recentActivities: [
          { id: 1, type: "login", description: "Logged in to account", date: new Date().toISOString() },
          { id: 2, type: "view", description: "Viewed Kerala travel guide", date: new Date(Date.now() - 86400000).toISOString() }
        ],
        // Add security token (JWT simulation)
        authToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ email, time: Date.now() }))}.simulatedSignature`,
        tokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store user in localStorage to persist login state
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Reset login attempts on successful login
      loginAttempts[email] = 0;
      localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
      
      return { 
        success: true, 
        message: "Login successful!",
        user: mockUser
      };
    } catch (error) {
      console.error("Login error:", error);
      
      // Track failed login attempts
      const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{}');
      loginAttempts[email] = (loginAttempts[email] || 0) + 1;
      localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
      localStorage.setItem(`lastAttempt_${email}`, Date.now().toString());
      
      return { 
        success: false, 
        message: "An error occurred during login. Please try again."
      };
    }
  },
  
  signUp: async (name: string, email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // This is a simulated signup flow
      // In a real app, this would make an API call to your authentication service
      
      console.log("Signup attempt with:", { name, email });
      
      // Simple validation
      if (!name || !email || !password) {
        return { success: false, message: "All fields are required" };
      }
      
      if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
      }
      
      // Check if email already exists (this is a mock implementation)
      // In a real app, this would be checked on the server
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const existingUser = JSON.parse(userJson);
        if (existingUser.email === email) {
          return { success: false, message: "This email is already registered" };
        }
      }
      
      // Simulate successful signup with a mock user
      const mockUser = {
        id: `user-${Math.floor(Math.random() * 1000)}`,
        email,
        name,
        isAuthenticated: true,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        bio: "Travel enthusiast exploring the beauty of India",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "Delhi",
          zipCode: ""
        },
        preferences: {
          notifications: true,
          newsletter: true,
          travelAlerts: false
        },
        trips: [],
        savedStates: [],
        recentActivities: [
          { id: 1, type: "signup", description: "Created an account", date: new Date().toISOString() }
        ],
        // Add security token (JWT simulation)
        authToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ email, time: Date.now() }))}.simulatedSignature`,
        tokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store user in localStorage to persist signup state
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { 
        success: true, 
        message: "Account created successfully!",
        user: mockUser
      };
    } catch (error) {
      console.error("Signup error:", error);
      return { 
        success: false, 
        message: "An error occurred during signup. Please try again."
      };
    }
  },
  
  socialLogin: async (provider: 'google' | 'github'): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // This is a mock implementation for social login
      // In a real implementation, this would integrate with OAuth providers
      
      console.log(`Social login attempt with ${provider}`);
      
      // Create a random email for demo purposes
      const randomEmail = `user${Math.floor(Math.random() * 1000)}@${provider}.com`;
      
      // Mock user data
      const mockUser = {
        id: `${provider}-user-${Math.floor(Math.random() * 1000)}`,
        email: randomEmail,
        name: randomEmail.split('@')[0],
        isAuthenticated: true,
        provider: provider,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomEmail}`,
        bio: "Tech enthusiast and traveler",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "Mumbai",
          zipCode: ""
        },
        preferences: {
          notifications: true,
          newsletter: true,
          travelAlerts: true
        },
        trips: [
          { id: 1, destination: "Himalayas", date: "2024-06-20", status: "Upcoming" }
        ],
        savedStates: ["himachal-pradesh", "uttarakhand"],
        recentActivities: [
          { id: 1, type: "login", description: `Signed in with ${provider}`, date: new Date().toISOString() }
        ]
      };
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        success: true,
        message: `Successfully logged in with ${provider}!`,
        user: mockUser
      };
    } catch (error) {
      console.error(`${provider} login error:`, error);
      return {
        success: false,
        message: `An error occurred during ${provider} login. Please try again.`
      };
    }
  },
  
  updateUserProfile: async (userData: any): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // This would be an API call to update user data in a real app
      console.log("Updating user profile:", userData);
      
      // Retrieve current user data
      const currentUserJSON = localStorage.getItem('user');
      if (!currentUserJSON) {
        return { success: false, message: "User not found" };
      }
      
      // Update the user data
      const updatedUser = { ...JSON.parse(currentUserJSON), ...userData };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Save updated user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        success: true,
        message: "Profile updated successfully!",
        user: updatedUser
      };
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: "An error occurred while updating your profile."
      };
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    // In a real implementation, this would also invalidate any tokens with your backend
  },
  
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },
  
  validateToken: () => {
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) return false;
      
      const user = JSON.parse(userJson);
      
      // Check if token exists and hasn't expired
      if (!user.authToken || !user.tokenExpiration) return false;
      
      const tokenExpiration = new Date(user.tokenExpiration);
      const currentTime = new Date();
      
      return currentTime < tokenExpiration;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  },
  
  refreshToken: async () => {
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) return false;
      
      const user = JSON.parse(userJson);
      
      // Update token expiration
      const updatedUser = {
        ...user,
        authToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ email: user.email, time: Date.now() }))}.refreshedSignature`,
        tokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  }
};
