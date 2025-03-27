
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
          backgroundImage="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3648&q=80"
          showCta={false}
          isHome={false}
        />
        
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4 text-tahoe-dark">Schedule Your Window Cleaning</h2>
              <p className="text-gray-600">
                Select your preferred date, time, and service details to book your appointment with Big Blue Window Cleaning.
              </p>
            </div>
            
            <BookingCalendar />
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Booking;
