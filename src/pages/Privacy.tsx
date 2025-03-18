
import { Shield, Lock, Eye, Server, Zap, MessageCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Privacy = () => {
  return (
    <div className="pt-20 min-h-screen page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-casino-highlight text-sm font-medium inline-block mb-4">
            Your Privacy Matters
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-casino-muted max-w-2xl mx-auto">
            Last updated: July 1, 2023
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Shield className="h-10 w-10 text-casino-highlight mb-4" />,
              title: "Data Protection",
              description: "We implement robust security measures to protect your personal information."
            },
            {
              icon: <Lock className="h-10 w-10 text-casino-highlight mb-4" />,
              title: "Secure Storage",
              description: "All sensitive data is encrypted and stored securely on protected servers."
            },
            {
              icon: <Eye className="h-10 w-10 text-casino-highlight mb-4" />,
              title: "Transparency",
              description: "We're clear about what data we collect and how we use it."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm">
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-casino-muted">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Information We Collect</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex">
              <div className="mr-4">
                <Server className="h-6 w-6 text-casino-highlight" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p className="text-casino-muted">
                  We may collect personal identification information, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-casino-muted">
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Profile information you provide</li>
                  <li>Optional: Date of birth (for age verification)</li>
                </ul>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <Zap className="h-6 w-6 text-casino-highlight" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Usage Data</h3>
                <p className="text-casino-muted">
                  We collect information on how the service is accessed and used, including:
                </p>
                <ul className="list-disc pl-6 mt-2 text-casino-muted">
                  <li>Games played and time spent</li>
                  <li>Features used and actions taken</li>
                  <li>Device information (type, operating system)</li>
                  <li>IP address and general location</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="text-2xl font-bold mb-6">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-8 text-casino-muted">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
          
          <Separator className="my-6" />
          
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do you sell my personal data?</AccordionTrigger>
              <AccordionContent>
                No, we do not sell your personal information to third parties. We may share anonymized, 
                aggregate data for analytics purposes, but this data cannot be used to identify you.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How long do you keep my data?</AccordionTrigger>
              <AccordionContent>
                We retain your personal information only for as long as is necessary for the purposes 
                set out in this Privacy Policy. We will retain and use your information to the extent 
                necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I request my data to be deleted?</AccordionTrigger>
              <AccordionContent>
                Yes, you can request deletion of your personal data. Please contact our 
                support team, and we will respond to your request within 30 days.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you use cookies?</AccordionTrigger>
              <AccordionContent>
                Yes, we use cookies and similar tracking technologies to track activity on our 
                service and hold certain information. Cookies are files with a small amount of 
                data that may include an anonymous unique identifier.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="bg-blue-50 p-8 rounded-xl text-center max-w-4xl mx-auto">
          <MessageCircle className="h-12 w-12 text-casino-highlight mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-casino-muted mb-6">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-casino-highlight text-white rounded-lg hover:bg-casino-accent transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-casino-muted text-casino-dark rounded-lg hover:border-casino-highlight transition-colors">
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
