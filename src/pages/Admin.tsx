
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DataImporter from '@/components/admin/DataImporter';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StarsCanvas } from '@/components/ui/StarBackground';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <StarsCanvas />
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-spice-500 hover:text-spice-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-serif font-medium mt-4 mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage content and import data for the Mystic India website
          </p>
        </div>
        
        <div className="mt-12">
          <DataImporter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
