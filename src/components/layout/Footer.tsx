
import React from 'react';
import { Github, Heart, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mystic-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">
              Mystic<span className="text-spice-500">India</span>
            </h3>
            <p className="text-mystic-100/80 mb-6 leading-relaxed">
              Discover the colors, textures, and stories of India through our immersive journey experiences.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/Deepanshu954" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-spice-500 transition-colors"
              >
                <Github size={18} className="text-white" />
              </a>
              <a 
                href="https://linkedin.com/in/Deepanshu954" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-spice-500 transition-colors"
              >
                <Linkedin size={18} className="text-white" />
              </a>
              <a 
                href="mailto:deepanshu95488@gmail.com" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-spice-500 transition-colors"
              >
                <Mail size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-mystic-100/80 hover:text-spice-500 transition-colors">Home</a></li>
              <li><a href="#about" className="text-mystic-100/80 hover:text-spice-500 transition-colors">About</a></li>
              <li><a href="#gallery" className="text-mystic-100/80 hover:text-spice-500 transition-colors">Gallery</a></li>
              <li><a href="#experience" className="text-mystic-100/80 hover:text-spice-500 transition-colors">Experience</a></li>
              <li><a href="#contact" className="text-mystic-100/80 hover:text-spice-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-2 text-spice-500" />
                <span className="text-mystic-100/80">Bennett University, Greater Noida India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-spice-500" />
                <span className="text-mystic-100/80">+91 95488 64851</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-spice-500" />
                <span className="text-mystic-100/80">+91 63961 44121</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-spice-500" />
                <span className="text-mystic-100/80">deepanshu95488@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mystic-100/60 text-sm">
            © {new Date().getFullYear()} Mystic India. All rights reserved.
          </p>
          <p className="text-mystic-100/60 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-spice-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
