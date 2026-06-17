import { useState, useEffect } from 'react';
import { authService } from '@/lib/auth';
import { stateData } from '@/data/stateData';

export function useAuthState() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user state from localStorage
    const currentUser = authService.getCurrentUser();
    
    // Validate token if user exists
    if (currentUser && !authService.validateToken()) {
      // Token has expired, attempt to refresh
      const refreshSuccess = authService.refreshToken();
      if (!refreshSuccess) {
        // If refresh fails, log out
        authService.logout();
        setUser(null);
      } else {
        // Get updated user with new token
        setUser(authService.getCurrentUser());
      }
    } else {
      setUser(currentUser);
    }
    
    setLoading(false);

    // Set up listener for storage events to sync across tabs
    const handleStorageChange = () => {
      const newUser = authService.getCurrentUser();
      setUser(newUser);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check token validity periodically
    const tokenValidator = setInterval(() => {
      if (authService.getCurrentUser() && !authService.validateToken()) {
        const refreshSuccess = authService.refreshToken();
        if (!refreshSuccess) {
          authService.logout();
          setUser(null);
        }
      }
    }, 10 * 60 * 1000); // Check every 10 minutes
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(tokenValidator);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signUp(name, email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const result = await authService.socialLogin(provider);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData: any) => {
    setLoading(true);
    try {
      const result = await authService.updateUserProfile(userData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavoriteState = async (stateId: string) => {
    try {
      if (!user) return { success: false, message: "User not authenticated" };
      
      // Check if user has savedStates array
      const savedStates = user.savedStates || [];
      
      // Check if the state is already saved
      const isStateSaved = savedStates.includes(stateId);
      
      // Update the array
      const updatedSavedStates = isStateSaved
        ? savedStates.filter((id: string) => id !== stateId)
        : [...savedStates, stateId];
      
      // Update user profile
      const result = await authService.updateUserProfile({
        ...user,
        savedStates: updatedSavedStates,
      });
      
      if (result.success && result.user) {
        setUser(result.user);
      }
      
      return {
        success: result.success,
        message: isStateSaved 
          ? "State removed from favorites" 
          : "State added to favorites",
        user: result.user
      };
    } catch (error) {
      console.error("Toggle favorite error:", error);
      return { 
        success: false, 
        message: "Failed to update favorite states"
      };
    }
  };

  // Generate a sample itinerary for a trip based on duration
  const generateSampleItinerary = (destination: string, duration: number = 3) => {
    const itinerary = [];
    
    // Activities for each time of day
    const morningActivities = [
      `Explore ${destination} local markets`,
      `Visit historical sites in ${destination}`,
      `Take a guided tour of ${destination}`,
      `Enjoy breakfast at a local café in ${destination}`
    ];
    
    const afternoonActivities = [
      `Try local cuisine at a restaurant in ${destination}`,
      `Visit museums and galleries in ${destination}`,
      `Relax at a scenic spot in ${destination}`,
      `Shopping for souvenirs in ${destination}`
    ];
    
    const eveningActivities = [
      `Watch the sunset from a viewpoint in ${destination}`,
      `Attend a cultural performance in ${destination}`,
      `Dine at a famous restaurant in ${destination}`,
      `Take an evening walk through ${destination}`
    ];
    
    const nightActivities = [
      `Experience the nightlife of ${destination}`,
      `Stargazing in ${destination}`,
      `Night photography tour in ${destination}`,
      `Attend a local event in ${destination}`
    ];
    
    const places = [
      `Main Square of ${destination}`,
      `${destination} Heritage Museum`,
      `${destination} Nature Park`,
      `${destination} Cultural Center`,
      `Famous temple in ${destination}`,
      `Historic fort in ${destination}`
    ];
    
    const cuisine = [
      `Traditional ${destination} thali`,
      `Street food of ${destination}`,
      `Special sweets of ${destination}`,
      `Regional specialties of ${destination}`
    ];
    
    const artForms = [
      `Traditional dance of ${destination}`,
      `Folk music of ${destination}`,
      `Handicrafts of ${destination}`,
      `Painting styles of ${destination}`
    ];
    
    // Create day-by-day itinerary
    for (let i = 1; i <= duration; i++) {
      itinerary.push({
        day: i,
        title: i === 1 ? `Arrival in ${destination}` : 
               i === duration ? `Departure from ${destination}` : 
               `Exploring ${destination} - Day ${i}`,
        morningActivities: [
          morningActivities[Math.floor(Math.random() * morningActivities.length)],
          morningActivities[Math.floor(Math.random() * morningActivities.length)]
        ],
        afternoonActivities: [
          afternoonActivities[Math.floor(Math.random() * afternoonActivities.length)],
          afternoonActivities[Math.floor(Math.random() * afternoonActivities.length)]
        ],
        eveningActivities: [
          eveningActivities[Math.floor(Math.random() * eveningActivities.length)],
          eveningActivities[Math.floor(Math.random() * eveningActivities.length)]
        ],
        nightActivities: [
          nightActivities[Math.floor(Math.random() * nightActivities.length)]
        ],
        places: [
          places[Math.floor(Math.random() * places.length)],
          places[Math.floor(Math.random() * places.length)]
        ],
        cuisine: [
          cuisine[Math.floor(Math.random() * cuisine.length)],
          cuisine[Math.floor(Math.random() * cuisine.length)]
        ],
        artForms: [
          artForms[Math.floor(Math.random() * artForms.length)]
        ]
      });
    }
    
    return itinerary;
  };

  const addTrip = async (trip: any) => {
    try {
      if (!user) return { success: false, message: "User not authenticated" };
      
      // Check if user has trips array
      const trips = user.trips || [];
      
      // Generate a new ID for the trip
      const newTripId = trips.length > 0 
        ? Math.max(...trips.map((t: any) => t.id)) + 1 
        : 1;
      
      // Parse the duration if it's a string
      let durationValue = trip.duration;
      if (typeof durationValue === 'string') {
        const match = durationValue.match(/^(\d+)/);
        if (match) {
          durationValue = parseInt(match[1]);
        } else {
          durationValue = 3; // Default
        }
      }
      
      // Use provided itinerary if available, otherwise generate a sample one
      const itinerary = trip.itinerary || generateSampleItinerary(trip.destination, durationValue);
      
      // Find matching state to get banner image if not provided
      let imageSrc = trip.imageSrc;
      if (!imageSrc) {
        const stateInfo = stateData.find(s => 
          s.name.toLowerCase() === trip.destination.toLowerCase()
        );
        if (stateInfo) {
          imageSrc = stateInfo.bannerImage;
        }
      }
      
      // Prepare timeline for the journey overview
      const timeline = trip.timeline || itinerary.map((day: any) => ({
        title: day.title,
        description: day.activities?.join(', ') || 'Explore and enjoy'
      }));
      
      // Add new trip with ID and itinerary
      const newTrip = {
        ...trip,
        id: newTripId,
        duration: durationValue,
        imageSrc,
        itinerary,
        timeline
      };
      
      // Update user profile
      const result = await authService.updateUserProfile({
        ...user,
        trips: [...trips, newTrip],
        recentActivities: [
          { 
            id: Date.now(),
            type: 'trip_added',
            description: `Added a trip to ${trip.destination}`,
            date: new Date().toISOString()
          },
          ...(user.recentActivities || []).slice(0, 4) // Keep only the 5 most recent activities
        ]
      });
      
      if (result.success && result.user) {
        setUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error("Add trip error:", error);
      return { 
        success: false, 
        message: "Failed to add trip"
      };
    }
  };

  const deleteTrip = async (tripId: number) => {
    try {
      if (!user) return { success: false, message: "User not authenticated" };
      
      // Check if user has trips array
      const trips = user.trips || [];
      
      // Find the trip to be deleted
      const tripToDelete = trips.find((t: any) => t.id === tripId);
      
      if (!tripToDelete) {
        return { success: false, message: "Trip not found" };
      }
      
      // Filter out the trip to be deleted
      const updatedTrips = trips.filter((t: any) => t.id !== tripId);
      
      // Update user profile
      const result = await authService.updateUserProfile({
        ...user,
        trips: updatedTrips,
        recentActivities: [
          { 
            id: Date.now(),
            type: 'trip_deleted',
            description: `Removed a trip to ${tripToDelete.destination}`,
            date: new Date().toISOString()
          },
          ...(user.recentActivities || []).slice(0, 4) // Keep only the 5 most recent activities
        ]
      });
      
      if (result.success && result.user) {
        setUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error("Delete trip error:", error);
      return { 
        success: false, 
        message: "Failed to delete trip"
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Dispatch a storage event to sync across tabs
    window.dispatchEvent(new Event('storage'));
  };

  return { 
    user, 
    loading, 
    login,
    signUp,
    socialLogin,
    updateProfile,
    toggleFavoriteState,
    addTrip,
    deleteTrip,
    logout, 
    isAuthenticated: !!user 
  };
}
