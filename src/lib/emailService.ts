
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
      console.log("Contact form submission:", data);
      console.log("This would be sent to: adhirajpundir783@gmail.com, deepanshu95488@gmail.com");
      
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
      
      // In a real implementation with backend, this would send the email
      console.log("======= EMAIL CONTENT =======");
      console.log(`
        To: adhirajpundir783@gmail.com, deepanshu95488@gmail.com
        Subject: New Travel Inquiry from ${data.name}
        
        ---------- MYSTIC INDIA TRAVEL INQUIRY ----------
        
        CONTACT DETAILS:
        Name: ${data.name}
        Email: ${data.email}
        Submitted on: ${formattedDate} at ${formattedTime}
        
        TRAVEL DETAILS:
        Interested Destination: ${destinationInfo}
        
        MESSAGE:
        ${data.message}
        
        -------------------------------------------
        
        This inquiry was submitted through the Mystic India website contact form.
        Please respond to the customer within 24 hours.
      `);
      console.log("==============================");
      
      // Email confirmation to user (in a real implementation)
      console.log("======= USER CONFIRMATION EMAIL =======");
      console.log(`
        To: ${data.email}
        Subject: We've Received Your Mystic India Travel Inquiry
        
        Dear ${data.name},
        
        Thank you for your interest in exploring India with us!
        
        We have received your inquiry and one of our travel experts will get back to you shortly to discuss your journey to ${destinationInfo}.
        
        Here's a summary of your message:
        
        ${data.message}
        
        If you have any immediate questions, please feel free to call us at +91 63961 44121.
        
        Warm regards,
        The Mystic India Team
      `);
      console.log("==============================");
      
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
