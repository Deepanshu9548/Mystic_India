
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Static variant defaults to avoid animations that delay rendering
  const containerVariants = {
    visible: { opacity: 1, transition: { duration: 0 } }
  };

  const itemVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0 } }
  };

  return (
    <section id="home" ref={targetRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 z-10 mt-16 relative"
      >
        <motion.div 
          variants={containerVariants}
          initial="visible"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p 
            variants={itemVariants}
            className="subtitle mb-3 text-white"
          >
            Experience the timeless spirit of India
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-6 text-white"
          >
            Journey Through India's <span className="text-spice-400">Rich</span> Cultural Heritage
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-white/90 mb-8 max-w-2xl"
          >
            Explore the vibrant tapestry of traditions, art forms, and cuisines that make up India's diverse cultural landscape, from ancient temples to living traditions passed down through generations.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a href="#states" className="btn-primary flex items-center group">
              Explore States <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="btn-outline bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              Learn More
            </a>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            variants={containerVariants}
            initial="visible"
            animate="visible"
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "28+", label: "States" },
              { number: "1000+", label: "Cultural Traditions" },
              { number: "22+", label: "Official Languages" },
              { number: "5000+", label: "Years of History" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="glass-panel p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-3xl font-medium text-spice-400 mb-1">{stat.number}</h3>
                <p className="text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-spice-400 mb-2 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-spice-400 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <p className="text-xs uppercase tracking-widest text-white/80 font-light">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;
