import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';

type ReviewType = {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
};

const Reviews: React.FC = () => {
  const { theme } = useTheme();
  
  const reviews: ReviewType[] = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "New Delhi",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
      rating: 5,
      text: "The virtual tour of Rajasthan was phenomenal! The guide was knowledgeable and the 360° views made me feel like I was actually walking through Jaipur's markets. Can't wait to visit in person!",
      date: "October 15, 2023",
    },
    {
      id: 2,
      name: "Shivesh Sharma",
      location: "Greater Noida",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      rating: 5,
      text: "As someone planning their first trip to India, the state guides provided invaluable insights. The cuisine section helped me prepare my taste buds for the journey ahead. Excellent resource!",
      date: "November 3, 2023",
    },
    {
      id: 3,
      name: "Aisha Khan",
      location: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
      rating: 4,
      text: "The culinary journey section is a treasure trove of information. I tried making Butter Chicken following the recommendations and it turned out delicious. Would love to see more regional recipes added!",
      date: "December 12, 2023",
    },
    {
      id: 4,
      name: "Miguel Rodriguez",
      location: "Barcelona, Spain",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
      rating: 5,
      text: "The virtual Kerala backwater tour transported me straight to God's Own Country. The visuals were stunning and the cultural insights were fascinating. This website is a gem for anyone interested in Indian culture.",
      date: "January 8, 2024",
    },
  ];

  const starColor = theme === 'dark' ? "#e94cff" : "#ff7e11";
  const quoteColor = theme === 'dark' ? "rgba(83, 166, 255, 0.2)" : "rgba(200, 200, 200, 0.3)";

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "fill-current" : "text-gray-300 dark:text-gray-600"} 
        fill={index < rating ? starColor : "transparent"}
        stroke={index < rating ? starColor : theme === 'dark' ? "#4a4a6a" : "#d1d1d1"}
      />
    ));
  };

  return (
  <section id="reviews" className="py-24 px-6 section-reviews relative">
    <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/25 z-0"></div>
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Traveler Insights</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              User Experiences
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              Read authentic experiences from travelers who have explored India through our platform,
              from virtual tours to culinary discoveries.
            </p>
            <div className="w-30 h-[3px] bg-spice-400 mx-auto mt-5"></div>
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <div className={`p-8 rounded-3xl relative ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow-sm border border-mystic-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <ScrollReveal key={review.id} delay={index % 2 * 0.1 + 0.2}>
                <motion.div 
                  className={`p-8 rounded-xl relative ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white shadow-sm border border-mystic-100'}`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Quote className="absolute top-6 right-6" size={40} color={quoteColor} />
                  
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white dark:border-purple-900 shadow-sm">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <p className="text-sm text-foreground/60">{review.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {renderStars(review.rating)}
                  </div>
                  
                  <blockquote className="text-foreground/80 italic mb-4 relative z-10">
                    "{review.text}"
                  </blockquote>
                  
                  <p className="text-sm text-foreground/60">{review.date}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal className="mt-12">
          <div className="text-center">
            <p className="mb-6 text-foreground/70">
              Ready to explore India's rich cultural tapestry?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="#states" 
                className="btn-primary px-6 py-3 rounded-md font-medium"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ y: 0 }}
              >
                Discover States
              </motion.a>
              <motion.a 
                href="#contact" 
                className={`px-6 py-3 rounded-md font-medium border ${theme === 'dark' ? 'border-purple-700 hover:bg-purple-900/50' : 'border-mystic-300 hover:bg-mystic-50 hover:border-mystic-400'} transition-colors`}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ y: 0 }}
              >
                Contact Us
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Reviews;
