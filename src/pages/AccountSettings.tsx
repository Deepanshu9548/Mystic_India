
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Camera, Save, UserCircle, MapPin, Bell, Mail, Trash, ArrowLeft } from 'lucide-react';

// Define schema for profile form
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().optional(),
  phone: z.string().optional(),
  profilePicture: z.string().optional(),
});

// Define schema for address form
const addressFormSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

// Define schema for preferences form
const preferencesFormSchema = z.object({
  notifications: z.boolean().default(true),
  newsletter: z.boolean().default(true),
  travelAlerts: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type AddressFormValues = z.infer<typeof addressFormSchema>;
type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const AccountSettings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Initialize profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
      profilePicture: user?.profilePicture || "",
    },
  });

  // Initialize address form
  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
    },
  });

  // Initialize preferences form
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      notifications: user?.preferences?.notifications !== undefined ? user.preferences.notifications : true,
      newsletter: user?.preferences?.newsletter !== undefined ? user.preferences.newsletter : true,
      travelAlerts: user?.preferences?.travelAlerts !== undefined ? user.preferences.travelAlerts : false,
    },
  });

  // Handle profile form submission
  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      // Create FormData for image upload if there's a new image
      if (imageFile) {
        // In a real app, this would upload the image to a server
        // For now, we'll use a data URL for the demo
        data.profilePicture = profileImage || user?.profilePicture;
      }

      const result = await updateProfile({
        ...user,
        name: data.name,
        email: data.email,
        bio: data.bio,
        phone: data.phone,
        profilePicture: data.profilePicture || user?.profilePicture,
      });

      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    }
  };

  // Handle address form submission
  const onAddressSubmit = async (data: AddressFormValues) => {
    try {
      const result = await updateProfile({
        ...user,
        address: {
          ...user?.address,
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        },
      });

      if (result.success) {
        toast({
          title: "Address Updated",
          description: "Your address has been updated successfully.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating your address.",
        variant: "destructive",
      });
    }
  };

  // Handle preferences form submission
  const onPreferencesSubmit = async (data: PreferencesFormValues) => {
    try {
      const result = await updateProfile({
        ...user,
        preferences: {
          ...user?.preferences,
          notifications: data.notifications,
          newsletter: data.newsletter,
          travelAlerts: data.travelAlerts,
        },
      });

      if (result.success) {
        toast({
          title: "Preferences Updated",
          description: "Your preferences have been updated successfully.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating your preferences.",
        variant: "destructive",
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="mr-2"
                  onClick={() => navigate('/profile')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Profile
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account information and preferences</p>
          </motion.div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="p-6">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center space-y-4 mb-6 sm:items-start">
                      <FormLabel>Profile Picture</FormLabel>
                      <div className="relative">
                        <Avatar className="w-32 h-32 border-4 border-background">
                          <AvatarImage src={profileImage || user.profilePicture} />
                          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                            <UserCircle className="w-16 h-16" />
                          </AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor="profile-image"
                          className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                        >
                          <Camera className="h-5 w-5" />
                          <span className="sr-only">Upload picture</span>
                        </label>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A short bio about yourself" 
                              className="resize-none min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="w-full sm:w-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </TabsContent>
            
            {/* Address Tab */}
            <TabsContent value="address">
              <Card className="p-6">
                <Form {...addressForm}>
                  <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                    <FormField
                      control={addressForm.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Example Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addressForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={addressForm.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="w-full sm:w-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Save Address
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="p-6">
                <Form {...preferencesForm}>
                  <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={preferencesForm.control}
                        name="notifications"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                <Bell className="h-4 w-4 mr-2 inline-block" />
                                Notifications
                              </FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Receive notifications about your trips and bookings.
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={preferencesForm.control}
                        name="newsletter"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                <Mail className="h-4 w-4 mr-2 inline-block" />
                                Newsletter
                              </FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Receive our newsletter with travel tips and offers.
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={preferencesForm.control}
                        name="travelAlerts"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                <MapPin className="h-4 w-4 mr-2 inline-block" />
                                Travel Alerts
                              </FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Receive alerts about travel conditions for your destinations.
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data & Privacy</h3>
                      <Button variant="outline" type="button" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="w-full sm:w-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
