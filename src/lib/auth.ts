import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const authService = {
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: Record<string, unknown> }> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      if (response.data.success) {
        const user = response.data.user;
        user.authToken = response.data.token;
        user.isAuthenticated = true;
        
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, message: "Login successful!", user };
      }
      return { success: false, message: "Login failed" };
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error.response?.data?.error || "An error occurred during login.";
      return { success: false, message };
    }
  },
  
  signUp: async (name: string, email: string, password: string): Promise<{ success: boolean; message: string; user?: Record<string, unknown> }> => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      if (response.data.success) {
        const user = response.data.user;
        user.authToken = response.data.token;
        user.isAuthenticated = true;
        
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, message: "Account created successfully!", user };
      }
      return { success: false, message: "Signup failed" };
    } catch (error: any) {
      console.error("Signup error:", error);
      const message = error.response?.data?.error || "An error occurred during signup.";
      return { success: false, message };
    }
  },
  
  socialLogin: async (provider: 'google' | 'github'): Promise<{ success: boolean; message: string; user?: Record<string, unknown> }> => {
    // For social login, we redirect the browser to the backend OAuth endpoint.
    // The backend handles the OAuth flow and redirects back to /login/success?token=...
    window.location.href = `${API_URL}/auth/${provider}`;
    
    // We return a pending state because the page will redirect
    return new Promise(() => {});
  },
  
  updateUserProfile: async (userData: Record<string, unknown>): Promise<{ success: boolean; message: string; user?: Record<string, unknown> }> => {
    try {
      const currentUserJSON = localStorage.getItem('user');
      if (!currentUserJSON) {
        return { success: false, message: "User not found" };
      }
      
      const currentUser = JSON.parse(currentUserJSON);
      const token = currentUser.authToken;

      const response = await axios.post(`${API_URL}/auth/update`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const updatedUser = response.data.user;
        updatedUser.authToken = token;
        updatedUser.isAuthenticated = true;
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, message: "Profile updated successfully!", user: updatedUser };
      }
      return { success: false, message: "Failed to update profile" };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return { success: false, message: "An error occurred while updating your profile." };
    }
  },
  
  fetchCurrentUser: async (): Promise<{ success: boolean; user?: Record<string, unknown> }> => {
    try {
      const currentUserJSON = localStorage.getItem('user');
      if (!currentUserJSON) return { success: false };
      
      const currentUser = JSON.parse(currentUserJSON);
      const token = currentUser.authToken;
      
      if (!token) return { success: false };

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const user = response.data.user;
        user.authToken = token;
        user.isAuthenticated = true;
        
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false };
    } catch (error) {
      console.error("Fetch current user error:", error);
      return { success: false };
    }
  },

  handleOAuthCallback: async (token: string): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const user = response.data.user;
        user.authToken = token;
        user.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("OAuth callback error:", error);
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },
  
  validateToken: () => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return false;
    const user = JSON.parse(userJson);
    return !!user.authToken;
  },
  
  refreshToken: async () => {
    // For now, JWTs don't refresh automatically in this implementation
    // If we wanted to, we would add a /auth/refresh endpoint
    return false;
  }
};
