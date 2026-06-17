import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  UserCircle, LogOut, Calendar, MapPin, Package, ChevronRight, 
  Edit, Mail, Phone, Plus, Trash, Clock, Star, Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { stateData } from '@/data/stateData';

const Profile = () => {
  const { user, logout, deleteTrip } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<number | null>(null);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  // Get saved states data from stateData using user.savedStates
  const savedStates = user.savedStates 
    ? stateData.filter(state => user.savedStates.includes(state.id)) 
    : [];

  // Get recent activities from user data
  const recentActivities = user.recentActivities || [];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const handleAddTrip = () => {
    navigate('/journey-planner');
  };

  const handleDeleteTrip = async () => {
    if (tripToDelete === null) return;
    
    const result = await deleteTrip(tripToDelete);
    
    if (result.success) {
      toast({
        title: "Trip Deleted",
        description: "Your trip has been deleted",
      });
      setConfirmDeleteDialogOpen(false);
      setTripToDelete(null);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 shadow-lg border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="w-32 h-32 rounded-full border-4 border-violet-500/50 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <UserCircle className="w-20 h-20 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-400 mt-1">{user.email}</p>
                
                {user.bio && (
                  <p className="text-gray-300 mt-2 italic">"{user.bio}"</p>
                )}
                
                <div className="mt-2 space-y-1">
                  {user.phone && (
                    <div className="flex items-center justify-center md:justify-start text-gray-400 text-sm">
                      <Phone className="mr-2 h-4 w-4 text-violet-400" />
                      {user.phone}
                    </div>
                  )}
                  
                  {user.address?.city && user.address?.state && (
                    <div className="flex items-center justify-center md:justify-start text-gray-400 text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-violet-400" />
                      {[user.address.city, user.address.state].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>
                
                {user.provider && (
                  <div className="inline-flex items-center gap-2 mt-2 bg-violet-900/30 px-3 py-1 rounded-full text-violet-300 text-sm">
                    <span>Signed in with {user.provider}</span>
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button
                    variant="outline"
                    className="border-violet-500/50 hover:bg-violet-500/20"
                    onClick={() => navigate('/account-settings')}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-red-500/50 hover:bg-red-500/20 text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Trips</h2>
              <Button onClick={handleAddTrip} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Plan New Trip
              </Button>
            </div>
            
            {user.trips && user.trips.length > 0 ? (
              <div className="space-y-4">
                {user.trips.map((trip: any) => (
                  <motion.div
                    key={trip.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-5 flex flex-col border border-white/10 hover:border-violet-500/30 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={trip.imageSrc || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071'} 
                        alt={trip.destination} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Star size={14} className="mr-1 text-violet-400" fill="#e94cff" stroke="#e94cff" />
                          {trip.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-serif font-semibold mb-3">{trip.destination}</h3>
                      
                      <p className="text-foreground/80 mb-4">
                        Your upcoming journey to {trip.destination}. Get ready for an amazing adventure!
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm mt-auto">
                        <div className="flex items-center text-foreground/70">
                          <Calendar size={16} className="mr-1" />
                          {trip.date}
                        </div>
                        <div className="flex items-center text-foreground/70">
                          <MapPin size={16} className="mr-1" />
                          {trip.destination}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <motion.div>
                          <Link 
                            to={`/journey/${trip.id}`}
                            className="inline-flex items-center font-medium transition-colors text-violet-400 hover:text-violet-300"
                          >
                            <motion.span
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="flex items-center"
                            >
                              View Details <ChevronRight size={16} className="ml-1" />
                            </motion.span>
                          </Link>
                        </motion.div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTripToDelete(trip.id);
                            setConfirmDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 text-center border border-white/10">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <h3 className="text-xl font-medium mb-2">No trips yet</h3>
                <p className="text-gray-400 mb-4">Looks like you haven't planned any journeys yet.</p>
                <Button onClick={() => navigate('/journey-planner')} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Plan Your Journey
                </Button>
              </div>
            )}
          </motion.div>
          
          <Separator className="my-8 bg-white/10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-rose-400" />
                Saved Destinations
              </h3>
              
              {savedStates.length > 0 ? (
                <div className="space-y-3">
                  {savedStates.map(state => (
                    <div 
                      key={state.id}
                      className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer"
                      onClick={() => navigate(`/state/${state.id}`)}
                    >
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img 
                          src={state.bannerImage} 
                          alt={state.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{state.name}</p>
                        <p className="text-xs text-gray-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {state.capital}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Star className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">You haven't saved any destinations yet.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => navigate('/states')}
                  >
                    Browse States
                  </Button>
                </div>
              )}
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Recent Activities
              </h3>
              
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity: any) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {activity.type === 'login' && <UserCircle className="h-4 w-4 text-primary" />}
                        {activity.type === 'view' && <MapPin className="h-4 w-4 text-emerald-400" />}
                        {activity.type === 'trip_added' && <Plus className="h-4 w-4 text-blue-400" />}
                        {activity.type === 'trip_deleted' && <Trash className="h-4 w-4 text-rose-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-400">{new Date(activity.date).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Clock className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">No recent activities to show.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteDialogOpen} onOpenChange={setConfirmDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trip? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTrip}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};

export default Profile;
