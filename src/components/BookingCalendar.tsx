
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { Check, Clock } from 'lucide-react';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const BookingCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [step, setStep] = useState<number>(1);
  const [windows, setWindows] = useState('');
  const [floors, setFloors] = useState('1');

  // Disable past dates and Sundays
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  const handleExtrasChange = (extra: string) => {
    setSelectedExtras(prev => 
      prev.includes(extra) 
        ? prev.filter(e => e !== extra) 
        : [...prev, extra]
    );
  };

  const handleNextStep = () => {
    if (step === 1 && !date) {
      toast.error('Please select a date for your service');
      return;
    }
    
    if (step === 1 && !timeSlot) {
      toast.error('Please select a time slot');
      return;
    }
    
    if (step === 3) {
      if (!name || !email || !phone || !address) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      // Submit booking
      toast.success('Booking submitted successfully!', {
        description: `Your window cleaning service is scheduled for ${date && format(date, 'MMMM d, yyyy')} at ${timeSlot}`,
      });
      
      // Reset form
      setTimeout(() => {
        setDate(undefined);
        setTimeSlot(undefined);
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setNotes('');
        setSelectedExtras([]);
        setStep(1);
      }, 2000);
      
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div 
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              step >= stepNumber 
                ? 'border-tahoe bg-tahoe text-white' 
                : 'border-gray-300 bg-white text-gray-400'
            }`}
          >
            {step > stepNumber ? (
              <Check className="h-5 w-5" />
            ) : (
              <span>{stepNumber}</span>
            )}
          </div>
          
          {stepNumber < 3 && (
            <div 
              className={`w-12 h-0.5 transition-all duration-300 ${
                step > stepNumber ? 'bg-tahoe' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={disabledDays}
                  className="rounded-md border"
                  initialFocus
                />
              </div>
              
              <div>
                <Label className="text-base font-medium mb-3 block">Select Time</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={timeSlot === time ? 'default' : 'outline'}
                      className={`justify-start ${timeSlot === time ? 'bg-tahoe hover:bg-tahoe-deep' : ''}`}
                      onClick={() => setTimeSlot(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
                
                {date && (
                  <p className="mt-4 text-sm text-gray-500">
                    Available slots for {date && format(date, 'MMMM d, yyyy')}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue="residential" onValueChange={(value) => setPropertyType(value as 'residential' | 'commercial')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="residential">Residential</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="residential" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="windows" className="text-base font-medium mb-2 block">
                      Approximate Number of Windows
                    </Label>
                    <Input 
                      id="windows" 
                      type="number" 
                      placeholder="e.g., 12" 
                      value={windows}
                      onChange={(e) => setWindows(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="floors" className="text-base font-medium mb-2 block">
                      Number of Floors
                    </Label>
                    <Select 
                      value={floors} 
                      onValueChange={setFloors}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of floors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Floor</SelectItem>
                        <SelectItem value="2">2 Floors</SelectItem>
                        <SelectItem value="3">3 Floors</SelectItem>
                        <SelectItem value="4+">4+ Floors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium mb-3 block">Additional Services</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="screens" 
                        checked={selectedExtras.includes('screens')}
                        onCheckedChange={() => handleExtrasChange('screens')}
                      />
                      <Label htmlFor="screens" className="font-normal">
                        Screen Cleaning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="tracks" 
                        checked={selectedExtras.includes('tracks')}
                        onCheckedChange={() => handleExtrasChange('tracks')}
                      />
                      <Label htmlFor="tracks" className="font-normal">
                        Track Cleaning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="hardwater" 
                        checked={selectedExtras.includes('hardwater')}
                        onCheckedChange={() => handleExtrasChange('hardwater')}
                      />
                      <Label htmlFor="hardwater" className="font-normal">
                        Hard Water Treatment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="skylights" 
                        checked={selectedExtras.includes('skylights')}
                        onCheckedChange={() => handleExtrasChange('skylights')}
                      />
                      <Label htmlFor="skylights" className="font-normal">
                        Skylight Cleaning
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="commercial" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="windows-commercial" className="text-base font-medium mb-2 block">
                      Approximate Number of Windows
                    </Label>
                    <Input 
                      id="windows-commercial" 
                      type="number" 
                      placeholder="e.g., 50" 
                      value={windows}
                      onChange={(e) => setWindows(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="floors-commercial" className="text-base font-medium mb-2 block">
                      Number of Floors
                    </Label>
                    <Select 
                      value={floors} 
                      onValueChange={setFloors}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of floors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Floor</SelectItem>
                        <SelectItem value="2">2 Floors</SelectItem>
                        <SelectItem value="3">3 Floors</SelectItem>
                        <SelectItem value="4">4 Floors</SelectItem>
                        <SelectItem value="5+">5+ Floors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium mb-3 block">Service Frequency</Label>
                  <RadioGroup defaultValue="onetime">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onetime" id="onetime" />
                      <Label htmlFor="onetime" className="font-normal">One-time Service</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="font-normal">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="biweekly" id="biweekly" />
                      <Label htmlFor="biweekly" className="font-normal">Bi-weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="font-normal">Monthly</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-base font-medium mb-2 block">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-base font-medium mb-2 block">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="phone" 
                  placeholder="Your phone number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="text-base font-medium mb-2 block">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="address" 
                  placeholder="Service address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes" className="text-base font-medium mb-2 block">
                Additional Notes
              </Label>
              <Input 
                id="notes" 
                placeholder="Any special requests or information" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Review your appointment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{date ? format(date, 'MMMM d, yyyy') : 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{timeSlot || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Type:</span>
                  <span className="font-medium capitalize">{propertyType}</span>
                </div>
                {windows && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Windows:</span>
                    <span className="font-medium">{windows}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Floors:</span>
                  <span className="font-medium">{floors}</span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Extras:</span>
                    <span className="font-medium">{selectedExtras.join(', ')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {renderStepIndicator()}
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-tahoe-dark">
            {step === 1 && 'Select Date & Time'}
            {step === 2 && 'Service Details'}
            {step === 3 && 'Contact Information'}
          </h2>
          {date && step > 1 && (
            <div className="text-sm text-gray-500">
              {format(date, 'MMMM d, yyyy')} at {timeSlot}
            </div>
          )}
        </div>
        
        {renderStep()}
        
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevStep}
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button 
            type="button"
            onClick={handleNextStep}
            className="bg-tahoe hover:bg-tahoe-deep"
          >
            {step === 3 ? 'Complete Booking' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
