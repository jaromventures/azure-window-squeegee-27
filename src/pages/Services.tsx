
import React from 'react';
import PageTransition from '@/components/PageTransition';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Building, Home, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "Residential Window Cleaning",
      description: "Comprehensive window cleaning for homes of all sizes, from cozy cabins to lakefront estates.",
      icon: <Home size={32} />,
      imageSrc: "/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png",
      link: "/booking",
      details: [
        "Interior and exterior window cleaning",
        "Screen cleaning and track cleaning",
        "Hard water spot treatment",
        "Skylight cleaning",
        "Eco-friendly cleaning solutions"
      ]
    },
    {
      title: "Commercial Window Cleaning",
      description: "Professional window cleaning services for businesses of all sizes, from small offices to large commercial buildings.",
      icon: <Building size={32} />,
      imageSrc: "/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png",
      link: "/booking",
      details: [
        "Regular maintenance contracts",
        "One-time deep cleaning services",
        "High-rise window cleaning",
        "Storefront window cleaning",
        "After-hours scheduling available"
      ]
    },
    {
      title: "Pressure Washing",
      description: "Refresh your property's exterior surfaces with our professional pressure washing services.",
      icon: <Droplets size={32} />,
      imageSrc: "/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png",
      link: "/booking",
      details: [
        "Deck and patio cleaning",
        "Driveway and sidewalk cleaning",
        "House siding cleaning",
        "Fence cleaning and restoration",
        "Pre-painting preparation"
      ]
    },
    {
      title: "Gutter Cleaning",
      description: "Prevent water damage and maintain your home's integrity with our thorough gutter cleaning service.",
      icon: <Wind size={32} />,
      imageSrc: "/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png",
      link: "/booking",
      details: [
        "Removal of leaves and debris",
        "Downspout cleaning and unclogging",
        "Minor repairs and adjustments",
        "Gutter guard installation",
        "Regular maintenance packages"
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <NavBar />
        
        <Hero 
          title="Our Services" 
          subtitle="Professional window cleaning and exterior maintenance services for the Lake Tahoe area" 
          backgroundImage="/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png"
          showCta={false}
          isHome={false}
        />
        
        <section className="section-padding bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-tahoe-dark">Our Window Cleaning Services</h2>
              <p className="text-gray-600 text-lg">
                We offer a comprehensive range of window cleaning and exterior maintenance services to keep your property looking its best.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard 
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    imageSrc={service.imageSrc}
                    link={service.link}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Service Details with glass morphism */}
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className={`flex flex-col md:flex-row gap-12 items-center ${
                  index !== services.length - 1 ? 'mb-24' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="backdrop-blur-md bg-white/70 p-8 rounded-3xl shadow-lg border border-white/80">
                    <h3 className="text-2xl font-bold mb-4 text-tahoe-dark">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    
                    <ul className="space-y-3 mb-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-tahoe flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild
                      className="bg-tahoe/90 hover:bg-tahoe-deep backdrop-blur-sm"
                    >
                      <Link to="/booking" className="flex items-center gap-2">
                        Book {service.title} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="overflow-hidden rounded-3xl shadow-xl">
                    <img 
                      src={service.imageSrc} 
                      alt={service.title} 
                      className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-tahoe to-tahoe-deep text-white">
          <div className="container mx-auto text-center">
            <div className="backdrop-blur-md bg-white/10 p-10 rounded-3xl max-w-4xl mx-auto border border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Schedule your professional window cleaning service today and experience the Big Blue difference. We serve the entire Lake Tahoe area.
              </p>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white/50 bg-white/10 text-white hover:bg-white/20 px-8 py-6 text-lg font-medium transition-all"
              >
                <Link to="/booking">Book Your Service Now</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
