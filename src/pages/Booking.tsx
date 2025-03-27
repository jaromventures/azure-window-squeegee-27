
import React from 'react';
import PageTransition from '@/components/PageTransition';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookingCalendar from '@/components/BookingCalendar';

const Booking = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <NavBar />
        
        <Hero 
          title="Book Your Service" 
          subtitle="Schedule a window cleaning appointment with our professional team" 
          backgroundImage="/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png"
          showCta={false}
          isHome={false}
        />
        
        <section className="section-padding bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4 text-tahoe-dark glow-text">Schedule Your Window Cleaning</h2>
              <p className="text-gray-600">
                Select your preferred date, time, and service details to book your appointment with Big Blue Window Cleaning.
              </p>
            </div>
            
            <div className="apple-blur p-6 rounded-2xl max-w-4xl mx-auto">
              <BookingCalendar />
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Booking;
