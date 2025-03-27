
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Building, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingRange {
  min: number;
  max: number;
}

const PricingCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [floors, setFloors] = useState<number>(1);
  const [windowCount, setWindowCount] = useState<number>(10);
  const [extras, setExtras] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PricingRange>({ min: 0, max: 0 });
  const [frequency, setFrequency] = useState<'onetime' | 'monthly' | 'quarterly'>('onetime');

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price by property type
    if (propertyType === 'residential') {
      basePrice = 100 + (windowCount * 7);
      basePrice += (floors - 1) * 50; // Additional floors
    } else {
      basePrice = 250 + (windowCount * 9);
      basePrice += (floors - 1) * 100; // Additional floors for commercial
    }
    
    // Add extras
    if (extras.includes('screens')) basePrice += windowCount * 2;
    if (extras.includes('tracks')) basePrice += windowCount * 3;
    if (extras.includes('hardwater')) basePrice += windowCount * 5;
    
    // Discount for recurring service
    let discount = 0;
    if (frequency === 'monthly') discount = 0.15;
    else if (frequency === 'quarterly') discount = 0.1;
    
    const discountedPrice = basePrice * (1 - discount);
    
    // Create a range for estimate
    const min = Math.floor(discountedPrice * 0.9);
    const max = Math.ceil(discountedPrice * 1.1);
    
    setPriceRange({ min, max });
  };

  // Recalculate when any parameter changes
  useEffect(() => {
    calculatePrice();
  }, [propertyType, floors, windowCount, extras, frequency]);

  const handleExtraToggle = (extra: string) => {
    setExtras(prevExtras => 
      prevExtras.includes(extra)
        ? prevExtras.filter(e => e !== extra)
        : [...prevExtras, extra]
    );
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto glass p-6 md:p-8 rounded-2xl tahoe-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-tahoe-dark">
        Get a Price Estimate
      </h2>

      <div className="space-y-6">
        {/* Property Type */}
        <div className="mb-6">
          <Label className="text-base mb-3 block">Property Type</Label>
          <RadioGroup 
            defaultValue="residential" 
            className="flex flex-col sm:flex-row gap-4"
            onValueChange={(value) => setPropertyType(value as 'residential' | 'commercial')}
          >
            <div className={`flex-1 cursor-pointer rounded-lg border ${propertyType === 'residential' ? 'border-tahoe bg-tahoe/5' : 'border-gray-200'} p-4 transition-all duration-200`}>
              <RadioGroupItem 
                value="residential" 
                id="residential" 
                className="sr-only" 
              />
              <Label 
                htmlFor="residential" 
                className={`flex cursor-pointer items-center gap-3 ${propertyType === 'residential' ? 'text-tahoe-dark' : 'text-gray-600'}`}
              >
                <Home className={`h-5 w-5 ${propertyType === 'residential' ? 'text-tahoe' : 'text-gray-400'}`} />
                <span>Residential</span>
              </Label>
            </div>
            
            <div className={`flex-1 cursor-pointer rounded-lg border ${propertyType === 'commercial' ? 'border-tahoe bg-tahoe/5' : 'border-gray-200'} p-4 transition-all duration-200`}>
              <RadioGroupItem 
                value="commercial" 
                id="commercial" 
                className="sr-only" 
              />
              <Label 
                htmlFor="commercial" 
                className={`flex cursor-pointer items-center gap-3 ${propertyType === 'commercial' ? 'text-tahoe-dark' : 'text-gray-600'}`}
              >
                <Building className={`h-5 w-5 ${propertyType === 'commercial' ? 'text-tahoe' : 'text-gray-400'}`} />
                <span>Commercial</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Floors */}
        <div className="mb-6">
          <Label htmlFor="floors" className="text-base mb-3 block">
            Number of Floors
          </Label>
          <Select defaultValue="1" onValueChange={(value) => setFloors(parseInt(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select floors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Floor</SelectItem>
              <SelectItem value="2">2 Floors</SelectItem>
              <SelectItem value="3">3 Floors</SelectItem>
              <SelectItem value="4">4 Floors</SelectItem>
              <SelectItem value="5">5+ Floors</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Window Count */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <Label htmlFor="window-count" className="text-base">
              Number of Windows
            </Label>
            <span className="text-tahoe-dark font-medium">{windowCount}</span>
          </div>
          <Slider
            id="window-count"
            min={1}
            max={propertyType === 'residential' ? 50 : 100}
            step={1}
            defaultValue={[10]}
            onValueChange={(value) => setWindowCount(value[0])}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>{propertyType === 'residential' ? '50' : '100'}</span>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-6">
          <Label className="text-base mb-3 block">Additional Services</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              type="button"
              variant={extras.includes('screens') ? 'default' : 'outline'}
              className={extras.includes('screens') ? 'bg-tahoe hover:bg-tahoe-deep' : ''}
              onClick={() => handleExtraToggle('screens')}
            >
              Screen Cleaning
            </Button>
            <Button
              type="button"
              variant={extras.includes('tracks') ? 'default' : 'outline'}
              className={extras.includes('tracks') ? 'bg-tahoe hover:bg-tahoe-deep' : ''}
              onClick={() => handleExtraToggle('tracks')}
            >
              Track Cleaning
            </Button>
            <Button
              type="button"
              variant={extras.includes('hardwater') ? 'default' : 'outline'}
              className={extras.includes('hardwater') ? 'bg-tahoe hover:bg-tahoe-deep' : ''}
              onClick={() => handleExtraToggle('hardwater')}
            >
              Hard Water Treatment
            </Button>
          </div>
        </div>

        {/* Service Frequency */}
        <div className="mb-6">
          <Label className="text-base mb-3 block">Service Frequency</Label>
          <RadioGroup 
            defaultValue="onetime" 
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            onValueChange={(value) => setFrequency(value as 'onetime' | 'monthly' | 'quarterly')}
          >
            <div className={`cursor-pointer rounded-lg border ${frequency === 'onetime' ? 'border-tahoe bg-tahoe/5' : 'border-gray-200'} p-3 text-center transition-all duration-200`}>
              <RadioGroupItem 
                value="onetime" 
                id="onetime" 
                className="sr-only" 
              />
              <Label 
                htmlFor="onetime" 
                className="cursor-pointer block"
              >
                <div className={`font-medium ${frequency === 'onetime' ? 'text-tahoe-dark' : 'text-gray-600'}`}>One-Time</div>
                <div className="text-xs text-gray-500 mt-1">Single service</div>
              </Label>
            </div>
            
            <div className={`cursor-pointer rounded-lg border ${frequency === 'monthly' ? 'border-tahoe bg-tahoe/5' : 'border-gray-200'} p-3 text-center transition-all duration-200`}>
              <RadioGroupItem 
                value="monthly" 
                id="monthly" 
                className="sr-only" 
              />
              <Label 
                htmlFor="monthly" 
                className="cursor-pointer block"
              >
                <div className={`font-medium ${frequency === 'monthly' ? 'text-tahoe-dark' : 'text-gray-600'}`}>Monthly</div>
                <div className="text-xs text-gray-500 mt-1">Save 15%</div>
              </Label>
            </div>
            
            <div className={`cursor-pointer rounded-lg border ${frequency === 'quarterly' ? 'border-tahoe bg-tahoe/5' : 'border-gray-200'} p-3 text-center transition-all duration-200`}>
              <RadioGroupItem 
                value="quarterly" 
                id="quarterly" 
                className="sr-only" 
              />
              <Label 
                htmlFor="quarterly" 
                className="cursor-pointer block"
              >
                <div className={`font-medium ${frequency === 'quarterly' ? 'text-tahoe-dark' : 'text-gray-600'}`}>Quarterly</div>
                <div className="text-xs text-gray-500 mt-1">Save 10%</div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Price Estimate Result */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Estimated Price</h3>
          <p className="text-3xl font-bold text-tahoe-dark mb-3">
            ${priceRange.min} - ${priceRange.max}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Final price may vary based on specific requirements and on-site assessment.
          </p>
          <Button 
            asChild
            className="bg-tahoe hover:bg-tahoe-deep w-full sm:w-auto px-8"
          >
            <Link to="/booking" className="flex items-center gap-2">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCalculator;
