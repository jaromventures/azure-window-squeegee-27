
import React from 'react';
import PageTransition from '@/components/PageTransition';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      description: 'We will get back to you as soon as possible.',
    });
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <NavBar />
        
        <Hero 
          title="Contact Us" 
          subtitle="Get in touch with the Big Blue team for all your window cleaning needs" 
          backgroundImage="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5760&q=80"
          showCta={false}
          isHome={false}
        />
        
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-tahoe-dark">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions or ready to schedule your service? Fill out the form below and our team will get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium mb-2 block">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input id="name" required placeholder="Your name" />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-base font-medium mb-2 block">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input id="email" type="email" required placeholder="Your email" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                      Phone
                    </Label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-base font-medium mb-2 block">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input id="subject" required placeholder="What is this regarding?" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-base font-medium mb-2 block">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="How can we help you?" 
                      className="min-h-[150px]" 
                    />
                  </div>
                  
                  <Button type="submit" className="bg-tahoe hover:bg-tahoe-deep w-full">
                    Send Message
                  </Button>
                </form>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="glass p-8 rounded-2xl tahoe-shadow h-full">
                  <h3 className="text-2xl font-bold mb-6 text-tahoe-dark">Contact Information</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-tahoe/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-tahoe" />
                      </div>
                      <div>
                        <h4 className="font-medium text-tahoe-dark mb-1">Phone</h4>
                        <p className="text-gray-600 mb-1">(530) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 8am-6pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-tahoe/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-tahoe" />
                      </div>
                      <div>
                        <h4 className="font-medium text-tahoe-dark mb-1">Email</h4>
                        <p className="text-gray-600 mb-1">info@bigbluewindow.com</p>
                        <p className="text-sm text-gray-500">We reply within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-tahoe/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-tahoe" />
                      </div>
                      <div>
                        <h4 className="font-medium text-tahoe-dark mb-1">Location</h4>
                        <p className="text-gray-600 mb-1">Lake Tahoe, CA</p>
                        <p className="text-sm text-gray-500">Serving the entire Lake Tahoe area</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-tahoe/10 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-tahoe" />
                      </div>
                      <div>
                        <h4 className="font-medium text-tahoe-dark mb-1">Business Hours</h4>
                        <p className="text-gray-600 mb-1">Monday-Friday: 8am-6pm</p>
                        <p className="text-gray-600">Saturday: 9am-4pm</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-tahoe-dark mb-4">Service Area</h4>
                    <div className="rounded-xl overflow-hidden h-[250px] mb-4">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199031.98624491465!2d-120.13498271520993!3d39.08730577349441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809978a1b91f1151%3A0x8c3f1fafeeabb6e2!2sLake%20Tahoe!5e0!3m2!1sen!2sus!4v1621458077975!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy"
                        title="Map of Lake Tahoe service area"
                      ></iframe>
                    </div>
                    <p className="text-sm text-gray-500">
                      We proudly serve South Lake Tahoe, Tahoe City, Incline Village, and surrounding areas.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-tahoe-dark">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to our most commonly asked questions. If you don't see what you're looking for, feel free to contact us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "How often should I have my windows cleaned?",
                  answer: "For residential properties in Lake Tahoe, we recommend cleaning windows at least twice a year. Commercial properties may require more frequent cleaning, typically quarterly or monthly depending on location and exposure."
                },
                {
                  question: "Do I need to be home during the window cleaning?",
                  answer: "While it's not necessary for you to be present during the service, we do need access to your property. You can arrange for someone to be there or provide instructions for entry if you'll be away."
                },
                {
                  question: "What does your window cleaning service include?",
                  answer: "Our standard window cleaning includes interior and exterior glass, sills, and frames. We also offer additional services like screen cleaning, track cleaning, and hard water spot removal."
                },
                {
                  question: "What happens if it rains after my windows are cleaned?",
                  answer: "Our professional-grade solutions help repel water and minimize spotting. However, if you're not satisfied with how your windows look after a rain within 7 days of our service, we'll come back and touch them up at no additional charge."
                },
                {
                  question: "Do you offer commercial window cleaning services?",
                  answer: "Yes, we provide window cleaning services for businesses of all sizes, from small offices to large commercial buildings. We offer flexible scheduling, including after-hours and weekend options to minimize disruption."
                },
                {
                  question: "Are your cleaning products safe for the environment?",
                  answer: "Absolutely. We use eco-friendly, biodegradable cleaning solutions that are safe for the environment, your family, and pets. This is especially important to us given Lake Tahoe's pristine ecosystem."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="glass p-6 rounded-xl tahoe-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium mb-3 text-tahoe-dark">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
