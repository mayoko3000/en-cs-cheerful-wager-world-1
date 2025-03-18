
import { useState } from 'react';
import { MessageSquare, MailQuestion, Phone, HelpCircle, BookOpen, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support request submitted:", { name, email, message });
    // Here you would normally send the form data to your backend
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    
    // Show success message (you could use toast notification here)
    alert("Your message has been sent! We'll get back to you soon.");
  };
  
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox."
    },
    {
      question: "Are these real casino games?",
      answer: "Our games are designed to simulate the experience of real casino games, but they operate with virtual currency only and do not involve real money gambling."
    },
    {
      question: "How do I get more free coins?",
      answer: "You can get more free coins by logging in daily, completing achievements, inviting friends, or watching promotional content."
    },
    {
      question: "Can I play with my friends?",
      answer: "Yes! You can add friends to your network and join the same tables or compete in tournaments together."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely. Please review our Privacy Policy for more details."
    }
  ];

  return (
    <div className="pt-20 min-h-screen page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-casino-highlight text-sm font-medium inline-block mb-4">
            We're Here to Help
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Support</h1>
          <p className="text-lg text-casino-muted max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you with any issues or inquiries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <MessageSquare className="h-10 w-10 text-casino-highlight mb-4" />,
              title: "Live Chat",
              description: "Chat with our support team in real-time during business hours."
            },
            {
              icon: <MailQuestion className="h-10 w-10 text-casino-highlight mb-4" />,
              title: "Email Support",
              description: "Send us an email and we'll respond within 24 hours."
            },
            {
              icon: <Phone className="h-10 w-10 text-casino-highlight mb-4" />,
              title: "Phone Support",
              description: "Call us directly for urgent issues during business hours."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-casino-muted">{item.description}</p>
            </div>
          ))}
        </div>
        
        <Tabs defaultValue="contact" className="w-full max-w-4xl mx-auto mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="contact" className="px-6">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="faq" className="px-6">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="resources" className="px-6">
                <BookOpen className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <TabsContent value="contact" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea 
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Please describe your issue or question in detail..." 
                    rows={6} 
                    required 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-casino-highlight hover:bg-casino-accent">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="h-5 w-5 text-casino-highlight mr-2" />
                        {faq.question}
                      </h3>
                      <p className="text-casino-muted">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <h2 className="text-2xl font-bold mb-6">Helpful Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "User Guide",
                    description: "Complete guide to using all features of Lucky Social Spins",
                    icon: <BookOpen className="h-8 w-8 text-casino-highlight" />
                  },
                  {
                    title: "Video Tutorials",
                    description: "Step-by-step video guides for gameplay and features",
                    icon: <HelpCircle className="h-8 w-8 text-casino-highlight" />
                  },
                  {
                    title: "Game Rules",
                    description: "Detailed rules and instructions for all our casino games",
                    icon: <BookOpen className="h-8 w-8 text-casino-highlight" />
                  },
                  {
                    title: "Community Forums",
                    description: "Connect with other players and share tips and strategies",
                    icon: <MessageSquare className="h-8 w-8 text-casino-highlight" />
                  }
                ].map((resource, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-xl flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                      <p className="text-casino-muted mb-3">{resource.description}</p>
                      <Button variant="outline" className="text-casino-highlight hover:bg-blue-100">
                        View Resource
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-casino-muted mb-6">
            Our support team is available Monday through Friday, 9 AM to 6 PM (EST).
            For urgent issues outside business hours, please use our email support.
          </p>
          <div className="bg-blue-50 p-6 rounded-xl">
            <p className="text-lg font-semibold mb-2">Support Contact Information</p>
            <p className="text-casino-muted">Email: support@luckysocialspins.com</p>
            <p className="text-casino-muted">Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
