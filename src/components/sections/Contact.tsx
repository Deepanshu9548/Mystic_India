
import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { emailService, ContactFormData } from '@/lib/emailService';
import { useToast } from '@/hooks/use-toast';
import { stateData } from '@/data/stateData';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormData>({
    name: '',
    email: '',
    destination: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      if (!formState.name || !formState.email || !formState.message) {
        toast({
          title: "Missing Information",
          description: "Please fill in all the required fields.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Send the form data using our service
      const result = await emailService.sendContactForm(formState);
      
      if (result.success) {
        setSuccess(true);
        toast({
          title: "Message Sent!",
          description: "Your message has been sent successfully to our team. We'll get back to you soon!",
        });
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          destination: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Group states by region for better organization in the dropdown
  const statesByRegion = stateData.reduce((acc, state) => {
    const region = state.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(state);
    return acc;
  }, {} as Record<string, typeof stateData>);
  
  // Get unique regions
  const regions = Object.keys(statesByRegion).sort();

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/20 z-0"></div>
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-spice-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Get In Touch</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Start Your Journey
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <ScrollReveal animation="fade-in-right">
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">
                Let's Plan Your Perfect Indian Experience
              </h3>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Whether you're dreaming of a cultural tour, a spiritual retreat, an adventure expedition, 
                or a luxurious getaway, our travel experts will craft the perfect journey tailored to your preferences.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-spice-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Location</h4>
                    <p className="text-foreground/70">Bennett University, Greater Noida India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-spice-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-foreground/70">adhirajpundir783@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-spice-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-foreground/70">+91 63961 44121</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal animation="fade-in-left">
            <div className="glass-panel rounded-xl p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-spice-50 flex items-center justify-center mx-auto mb-4">
                    <Send className="text-spice-500" size={24} />
                  </div>
                  <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
                  <p className="text-foreground/70">
                    Thank you for reaching out. We'll get back to you shortly to help plan your journey.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-mystic-200 focus:border-spice-400 focus:ring focus:ring-spice-100 transition-colors text-black"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-mystic-200 focus:border-spice-400 focus:ring focus:ring-spice-100 transition-colors text-black"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium mb-2">
                      Interested Destination
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formState.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-mystic-200 focus:border-spice-400 focus:ring focus:ring-spice-100 transition-colors text-black"
                    >
                      <option value="">Select destination</option>
                      {regions.map(region => (
                        <optgroup key={region} label={region}>
                          {statesByRegion[region].map(state => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border border-mystic-200 focus:border-spice-400 focus:ring focus:ring-spice-100 transition-colors text-black"
                      placeholder="Tell us about your travel preferences"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send size={16} className="ml-2" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
