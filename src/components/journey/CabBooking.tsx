
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

type CabBookingProps = {
  journey: any;
};

const CabBooking: React.FC<CabBookingProps> = ({ journey }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState("1");
  const [pickupLocation, setPickupLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!date || !pickupLocation || !name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Success message
    toast({
      title: "Booking Successful!",
      description: `Your cab for ${journey.title} has been booked for ${format(date, 'PPP')}. We'll contact you shortly with confirmation details.`,
    });
    
    // Reset form
    setDate(undefined);
    setPassengers("1");
    setPickupLocation("");
    setName("");
    setEmail("");
    setPhone("");
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">Journey Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Journey</p>
            <p className="text-muted-foreground">{journey.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-muted-foreground">{journey.duration}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Destinations</p>
            <p className="text-muted-foreground">{journey.location}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Price</p>
            <p className="text-muted-foreground">Starting from ₹{Math.floor(Math.random() * 10000) + 5000}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleBooking} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Passengers</label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of passengers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Pickup Location</label>
            <Input 
              placeholder="Enter your pickup address" 
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2">
            <Button type="submit" className="w-full btn-primary">
              Book Your Cab
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              By booking, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CabBooking;
