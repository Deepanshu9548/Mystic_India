import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Plus, Save, Trash, Wand2, Sun, Moon, Utensils, Paintbrush, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { stateData } from '@/data/stateData';
import { JourneyItineraryDay } from '@/components/chatbot/types';
import PlannerAIAssistant from '@/components/journey/PlannerAIAssistant';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const JourneyPlanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addTrip } = useAuth();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  useScrollToTop(true);
  
  const [journeyData, setJourneyData] = useState({
    title: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    duration: 3,
    status: 'Upcoming',
    itinerary: Array.from({ length: 3 }, (_, i) => ({
      day: i + 1,
      title: i === 0 ? 'Arrival & Welcome' : i === 2 ? 'Departure' : 'Exploration Day',
      activities: [''],
      timeOfDay: 'morning' as 'morning' | 'afternoon' | 'evening' | 'night',
      places: [''],
      cuisine: [''],
      artForms: [''],
      morningActivities: [''],
      afternoonActivities: [''],
      eveningActivities: [''],
      nightActivities: ['']
    }))
  });

  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to create a custom journey",
        variant: "destructive"
      });
      navigate('/login');
    }
    
    if (location.state?.journey) {
      const existingJourney = location.state.journey;
      setJourneyData({
        ...journeyData,
        ...existingJourney,
        title: existingJourney.title || '',
        destination: existingJourney.destination || '',
        date: existingJourney.date || new Date().toISOString().split('T')[0],
        duration: typeof existingJourney.duration === 'string' 
          ? parseInt(existingJourney.duration) 
          : existingJourney.duration || 3,
        status: existingJourney.status || 'Upcoming',
        itinerary: existingJourney.itinerary || journeyData.itinerary
      });
    }
    
    window.scrollTo(0, 0);
  }, [user, navigate, location.state]);

  const addDay = () => {
    const newDay = {
      day: journeyData.itinerary.length + 1,
      title: `Day ${journeyData.itinerary.length + 1}`,
      activities: [''],
      timeOfDay: 'morning' as 'morning' | 'afternoon' | 'evening' | 'night',
      places: [''],
      cuisine: [''],
      artForms: [''],
      morningActivities: [''],
      afternoonActivities: [''],
      eveningActivities: [''],
      nightActivities: ['']
    };
    
    setJourneyData({
      ...journeyData,
      duration: journeyData.duration + 1,
      itinerary: [...journeyData.itinerary, newDay]
    });
  };

  const removeDay = (index: number) => {
    if (journeyData.itinerary.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "A journey must have at least one day",
        variant: "destructive"
      });
      return;
    }
    
    const newItinerary = journeyData.itinerary.filter((_, i) => i !== index);
    const renumberedItinerary = newItinerary.map((day, i) => ({
      ...day,
      day: i + 1
    }));
    
    setJourneyData({
      ...journeyData,
      duration: journeyData.duration - 1,
      itinerary: renumberedItinerary
    });
  };

  const updateDay = (index: number, field: string, value: any) => {
    const updatedItinerary = [...journeyData.itinerary];
    updatedItinerary[index] = {
      ...updatedItinerary[index],
      [field]: value
    };
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const addActivity = (dayIndex: number, timeOfDay: string = 'activities') => {
    const updatedItinerary = [...journeyData.itinerary];
    const fieldName = timeOfDay === 'activities' ? 'activities' : `${timeOfDay}Activities`;
    
    if (updatedItinerary[dayIndex][fieldName]) {
      updatedItinerary[dayIndex][fieldName] = [...updatedItinerary[dayIndex][fieldName], ''];
    } else {
      updatedItinerary[dayIndex][fieldName] = [''];
    }
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const updateActivity = (dayIndex: number, activityIndex: number, value: string, timeOfDay: string = 'activities') => {
    const updatedItinerary = [...journeyData.itinerary];
    const fieldName = timeOfDay === 'activities' ? 'activities' : `${timeOfDay}Activities`;
    
    if (updatedItinerary[dayIndex][fieldName]) {
      updatedItinerary[dayIndex][fieldName][activityIndex] = value;
    }
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const removeActivity = (dayIndex: number, activityIndex: number, timeOfDay: string = 'activities') => {
    const updatedItinerary = [...journeyData.itinerary];
    const fieldName = timeOfDay === 'activities' ? 'activities' : `${timeOfDay}Activities`;
    
    if (!updatedItinerary[dayIndex][fieldName] || updatedItinerary[dayIndex][fieldName].length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "A time period must have at least one activity",
        variant: "destructive"
      });
      return;
    }
    
    updatedItinerary[dayIndex][fieldName] = updatedItinerary[dayIndex][fieldName].filter((_, i) => i !== activityIndex);
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const addItem = (dayIndex: number, field: 'places' | 'cuisine' | 'artForms') => {
    const updatedItinerary = [...journeyData.itinerary];
    
    if (!updatedItinerary[dayIndex][field]) {
      updatedItinerary[dayIndex][field] = [];
    }
    
    updatedItinerary[dayIndex][field] = [...updatedItinerary[dayIndex][field], ''];
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const updateItem = (dayIndex: number, itemIndex: number, value: string, field: 'places' | 'cuisine' | 'artForms') => {
    const updatedItinerary = [...journeyData.itinerary];
    
    if (!updatedItinerary[dayIndex][field]) {
      updatedItinerary[dayIndex][field] = [];
    }
    
    updatedItinerary[dayIndex][field][itemIndex] = value;
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const removeItem = (dayIndex: number, itemIndex: number, field: 'places' | 'cuisine' | 'artForms') => {
    const updatedItinerary = [...journeyData.itinerary];
    
    if (!updatedItinerary[dayIndex][field] || updatedItinerary[dayIndex][field].length <= 1) {
      toast({
        title: "Cannot Remove",
        description: `At least one ${field} item must be present`,
        variant: "destructive"
      });
      return;
    }
    
    updatedItinerary[dayIndex][field] = updatedItinerary[dayIndex][field].filter((_, i) => i !== itemIndex);
    
    setJourneyData({
      ...journeyData,
      itinerary: updatedItinerary
    });
  };

  const handleSaveJourney = async () => {
    if (!journeyData.title || !journeyData.destination || !journeyData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const stateInfo = stateData.find(s => 
      s.name.toLowerCase() === journeyData.destination.toLowerCase()
    );

    if (!stateInfo) {
      toast({
        title: "Invalid Destination",
        description: "Please select a valid Indian state as your destination",
        variant: "destructive"
      });
      return;
    }

    const timeline = journeyData.itinerary.map(day => {
      const activities = day.activities && day.activities.length > 0 && day.activities[0] 
        ? day.activities 
        : day[`${day.timeOfDay}Activities`] || ['Explore and enjoy'];
      
      return {
        title: day.title,
        description: activities.join(', ')
      };
    });

    const tripData = {
      destination: journeyData.destination,
      date: journeyData.date,
      status: journeyData.status,
      title: journeyData.title,
      duration: journeyData.duration,
      location: journeyData.destination,
      imageSrc: stateInfo.bannerImage,
      description: `A ${journeyData.duration}-day custom journey through the beautiful state of ${journeyData.destination}, exploring its culture, cuisine, and attractions.`,
      timeline,
      itinerary: journeyData.itinerary
    };

    const result = await addTrip(tripData);
    
    if (result.success) {
      toast({
        title: "Journey Created",
        description: `Your journey to ${journeyData.destination} has been saved`,
      });
      navigate('/profile');
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to save journey",
        variant: "destructive"
      });
    }
  };

  const handleAIComplete = (generatedJourney: any) => {
    console.log("AI Generated Journey:", generatedJourney);
    setJourneyData({
      ...journeyData,
      ...generatedJourney
    });
    
    toast({
      title: "Journey Generated",
      description: "Your AI-generated journey plan is ready! Feel free to customize it further."
    });
    
    setShowAIAssistant(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Plan Your Journey
              </h1>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="gap-2 border-indigo-400 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" 
                onClick={() => setShowAIAssistant(true)}
              >
                <Wand2 className="h-4 w-4" />
                AI Assistant
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" onClick={handleSaveJourney}>
                <Save className="h-4 w-4" />
                Save Journey
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="mb-6 border-[#e0d9ff] dark:border-indigo-900/40 shadow-md shadow-indigo-100 dark:shadow-none overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Journey Title</label>
                      <Input 
                        placeholder="E.g., Exploring Rajasthan" 
                        value={journeyData.title}
                        onChange={(e) => setJourneyData({ ...journeyData, title: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Destination</label>
                      <Select 
                        value={journeyData.destination} 
                        onValueChange={(value) => setJourneyData({ ...journeyData, destination: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                          {stateData.map((state) => (
                            <SelectItem key={state.id} value={state.name}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input 
                        type="date" 
                        value={journeyData.date}
                        onChange={(e) => setJourneyData({ ...journeyData, date: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select 
                        value={journeyData.status} 
                        onValueChange={(value) => setJourneyData({ ...journeyData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Upcoming">Upcoming</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Itinerary</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addDay}
                    className="border-indigo-400 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Day
                  </Button>
                </div>

                {journeyData.itinerary.map((day, dayIndex) => (
                  <Card key={dayIndex} className="relative border-[#e0d9ff] dark:border-indigo-900/40 shadow-md shadow-indigo-100 dark:shadow-none overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 hover:bg-red-100/10"
                      onClick={() => removeDay(dayIndex)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <h3 className="text-lg font-medium">Day {day.day}</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input 
                              value={day.title}
                              onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Primary Time of Day</label>
                            <Select 
                              value={day.timeOfDay} 
                              onValueChange={(value) => updateDay(dayIndex, 'timeOfDay', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="morning">Morning</SelectItem>
                                <SelectItem value="afternoon">Afternoon</SelectItem>
                                <SelectItem value="evening">Evening</SelectItem>
                                <SelectItem value="night">Night</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Tabs defaultValue="morning" className="w-full">
                          <TabsList className="w-full grid grid-cols-4 mb-4">
                            <TabsTrigger 
                              value="morning"
                              className="flex gap-1 items-center"
                            >
                              <Sun className="h-3.5 w-3.5 text-amber-500" />
                              <span>Morning</span>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="afternoon"
                              className="flex gap-1 items-center"
                            >
                              <Sun className="h-3.5 w-3.5 text-orange-500" />
                              <span>Afternoon</span>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="evening"
                              className="flex gap-1 items-center"
                            >
                              <Sun className="h-3.5 w-3.5 text-red-500" />
                              <span>Evening</span>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="night"
                              className="flex gap-1 items-center"
                            >
                              <Moon className="h-3.5 w-3.5 text-indigo-500" />
                              <span>Night</span>
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="morning" className="mt-0">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Morning Activities</label>
                                <Button variant="ghost" size="sm" onClick={() => addActivity(dayIndex, 'morning')}>
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                              
                              {(day.morningActivities || ['']).map((activity, activityIndex) => (
                                <div key={activityIndex} className="flex gap-2">
                                  <Textarea
                                    placeholder="Morning activity..."
                                    value={activity}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value, 'morning')}
                                    className="min-h-[60px]"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="shrink-0 text-red-400 hover:text-red-600"
                                    onClick={() => removeActivity(dayIndex, activityIndex, 'morning')}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="afternoon" className="mt-0">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Afternoon Activities</label>
                                <Button variant="ghost" size="sm" onClick={() => addActivity(dayIndex, 'afternoon')}>
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                              
                              {(day.afternoonActivities || ['']).map((activity, activityIndex) => (
                                <div key={activityIndex} className="flex gap-2">
                                  <Textarea
                                    placeholder="Afternoon activity..."
                                    value={activity}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value, 'afternoon')}
                                    className="min-h-[60px]"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="shrink-0 text-red-400 hover:text-red-600"
                                    onClick={() => removeActivity(dayIndex, activityIndex, 'afternoon')}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="evening" className="mt-0">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Evening Activities</label>
                                <Button variant="ghost" size="sm" onClick={() => addActivity(dayIndex, 'evening')}>
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                              
                              {(day.eveningActivities || ['']).map((activity, activityIndex) => (
                                <div key={activityIndex} className="flex gap-2">
                                  <Textarea
                                    placeholder="Evening activity..."
                                    value={activity}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value, 'evening')}
                                    className="min-h-[60px]"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="shrink-0 text-red-400 hover:text-red-600"
                                    onClick={() => removeActivity(dayIndex, activityIndex, 'evening')}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="night" className="mt-0">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Night Activities</label>
                                <Button variant="ghost" size="sm" onClick={() => addActivity(dayIndex, 'night')}>
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                              
                              {(day.nightActivities || ['']).map((activity, activityIndex) => (
                                <div key={activityIndex} className="flex gap-2">
                                  <Textarea
                                    placeholder="Night activity..."
                                    value={activity}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value, 'night')}
                                    className="min-h-[60px]"
                                  />
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="shrink-0 text-red-400 hover:text-red-600"
                                    onClick={() => removeActivity(dayIndex, activityIndex, 'night')}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <h4 className="text-sm font-medium">Places to Visit</h4>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0" 
                                onClick={() => addItem(dayIndex, 'places')}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {(day.places || ['']).map((place, placeIndex) => (
                              <div key={placeIndex} className="flex gap-2">
                                <Input
                                  placeholder="Add a place to visit"
                                  value={place}
                                  onChange={(e) => updateItem(dayIndex, placeIndex, e.target.value, 'places')}
                                  className="text-sm h-8"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="shrink-0 text-red-400 hover:text-red-600"
                                  onClick={() => removeItem(dayIndex, placeIndex, 'places')}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Utensils className="h-4 w-4 text-green-500" />
                                <h4 className="text-sm font-medium">Local Cuisine</h4>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0" 
                                onClick={() => addItem(dayIndex, 'cuisine')}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {(day.cuisine || ['']).map((item, itemIndex) => (
                              <div key={itemIndex} className="flex gap-2">
                                <Input
                                  placeholder="Add a cuisine or dish"
                                  value={item}
                                  onChange={(e) => updateItem(dayIndex, itemIndex, e.target.value, 'cuisine')}
                                  className="text-sm h-8"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                                  onClick={() => removeItem(dayIndex, itemIndex, 'cuisine')}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Paintbrush className="h-4 w-4 text-rose-500" />
                                <h4 className="text-sm font-medium">Art & Culture</h4>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0" 
                                onClick={() => addItem(dayIndex, 'artForms')}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {(day.artForms || ['']).map((item, itemIndex) => (
                              <div key={itemIndex} className="flex gap-2">
                                <Input
                                  placeholder="Add an art form or cultural activity"
                                  value={item}
                                  onChange={(e) => updateItem(dayIndex, itemIndex, e.target.value, 'artForms')}
                                  className="text-sm h-8"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                                  onClick={() => removeItem(dayIndex, itemIndex, 'artForms')}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="border-[#e0d9ff] dark:border-indigo-900/40 shadow-md shadow-indigo-100 dark:shadow-none overflow-hidden sticky top-24">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Journey Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">{journeyData.duration} days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Destination</p>
                        <p className="text-muted-foreground">
                          {journeyData.destination || "Not selected"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-muted-foreground">
                          {journeyData.date || "Not selected"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <Button 
                      className="w-full mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => setShowAIAssistant(true)}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate with AI
                    </Button>
                    
                    <h4 className="font-medium mb-3">Preview</h4>
                    <div className="max-h-[400px] overflow-y-auto space-y-4">
                      {journeyData.itinerary.map((day, index) => (
                        <div key={index} className="space-y-2 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10">
                          <p className="font-medium">Day {day.day}: {day.title}</p>
                          
                          {day.places && day.places.length > 0 && day.places[0] && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> Places to Visit
                              </p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-1">
                                {day.places.map((place, i) => (
                                  <li key={i}>{place || "No place listed"}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {day.cuisine && day.cuisine.length > 0 && day.cuisine[0] && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                                <Utensils className="h-3 w-3" /> Local Cuisine
                              </p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-1">
                                {day.cuisine.map((item, i) => (
                                  <li key={i}>{item || "No cuisine listed"}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {day.artForms && day.artForms.length > 0 && day.artForms[0] && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                <Paintbrush className="h-3 w-3" /> Art & Culture
                              </p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-1">
                                {day.artForms.map((item, i) => (
                                  <li key={i}>{item || "No art form listed"}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {showAIAssistant && (
        <PlannerAIAssistant
          onClose={() => setShowAIAssistant(false)}
          onComplete={handleAIComplete}
          currentJourney={journeyData}
        />
      )}
      
      <Footer />
    </>
  );
};

export default JourneyPlanner;
