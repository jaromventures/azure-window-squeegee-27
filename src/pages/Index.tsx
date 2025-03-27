
import React from 'react';
import Hero from '@/components/Hero';
import PricingCalculator from '@/components/PricingCalculator';
import ServiceCard from '@/components/ServiceCard';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Building, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-tahoe-dark">Our Services</h2>
            <p className="text-gray-600 text-lg">
              Professional window cleaning services tailored to your specific needs, delivered with exceptional care and attention to detail.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard 
              title="Residential Window Cleaning"
              description="Elevate your home's appearance and let natural light shine through with our thorough residential window cleaning service."
              icon={<Home size={32} />}
              imageSrc="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3648&q=80"
              link="/services"
            />
            
            <ServiceCard 
              title="Commercial Window Cleaning"
              description="Make a lasting impression on clients and create a bright workspace for employees with pristine, professionally cleaned windows."
              icon={<Building size={32} />}
              imageSrc="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5760&q=80"
              link="/services"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline" 
              className="gap-2 border-tahoe text-tahoe hover:bg-tahoe/5"
            >
              <Link to="/services">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-tahoe-dark">Why Choose Big Blue</h2>
            <p className="text-gray-600 text-lg">
              With our commitment to quality and customer satisfaction, we've built a reputation as Lake Tahoe's premier window cleaning service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Technicians",
                description: "Our highly trained technicians deliver exceptional results with attention to every detail.",
              },
              {
                title: "Eco-Friendly Products",
                description: "We use environmentally safe cleaning solutions that protect Lake Tahoe's pristine environment.",
              },
              {
                title: "Satisfaction Guaranteed",
                description: "If you're not completely satisfied, we'll return and make it right at no additional cost.",
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="glass p-8 rounded-2xl tahoe-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-tahoe-light/50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-tahoe text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-tahoe-dark">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Calculator */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-tahoe-dark">Pricing Calculator</h2>
            <p className="text-gray-600 text-lg">
              Get an instant estimate for your window cleaning service based on your specific needs.
            </p>
          </motion.div>
          
          <PricingCalculator />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-padding tahoe-gradient text-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-white/90 text-lg">
              Hear from homeowners and businesses who've experienced the Big Blue difference.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The team at Big Blue did an amazing job on our lakefront home's windows. They're now crystal clear and the view is breathtaking!",
                author: "Jennifer L.",
                location: "Tahoe City"
              },
              {
                quote: "As a business owner, I appreciate their punctuality and professionalism. Our storefront has never looked better!",
                author: "Michael T.",
                location: "South Lake Tahoe"
              },
              {
                quote: "We've been using Big Blue for years and they never disappoint. Reliable service and spotless results every time.",
                author: "Sarah W.",
                location: "Incline Village"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="glass-dark rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-yellow-300 text-xl">★</span>
                  ))}
                </div>
                <blockquote className="mb-6 text-white/90 text-lg italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-white/70 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto tahoe-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-tahoe-dark">Ready for Crystal Clear Views?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Book your professional window cleaning service today and experience the Big Blue difference. We serve the entire Lake Tahoe area.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-tahoe hover:bg-tahoe-deep text-white px-8 py-6 text-lg font-medium transition-all"
            >
              <Link to="/booking">Schedule Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
