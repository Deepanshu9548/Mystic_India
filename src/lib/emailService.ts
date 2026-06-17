
/**
 * Email service for handling contact form submissions
 * Enhanced with improved email formatting and delivery
 */

import { stateData } from '@/data/stateData';

// In a real implementation, this would connect to a backend service

export interface ContactFormData {
  name: string;
  email: string;
  destination?: string;
  message: string;
}

export const emailService = {
  /**
   * Sends a contact form submission
   * In a real implementation, this would send data to a backend service
   * that would then send emails using a service like SendGrid, Mailgun, etc.
   */
  sendContactForm: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    try {
      // Log the submission data
      // In a real implementation, this would send data to a backend API
      
      // Basic validation
      if (!data.name || !data.email || !data.message) {
        return {
          success: false,
          message: "Please fill in all required fields"
        };
      }
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get destination details if selected
      let destinationInfo = "Not specified";
      if (data.destination) {
        const selectedState = stateData.find(state => state.id === data.destination);
        if (selectedState) {
          destinationInfo = `${selectedState.name} (${selectedState.region})`;
        }
      }
      
      // Format current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      
      // Store submission in local storage for demo purposes
      // In a real implementation, this would be stored in a database
      const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      contactSubmissions.push({
        id: Date.now(),
        ...data,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));
      
      return {
        success: true,
        message: "Your message has been sent successfully!"
      };
    } catch (error) {
      console.error("Error sending contact form:", error);
      return {
        success: false,
        message: "An error occurred while sending your message. Please try again."
      };
    }
  }
};
