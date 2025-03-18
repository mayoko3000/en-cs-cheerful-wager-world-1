
import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="pt-20 min-h-screen page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-casino-highlight text-sm font-medium inline-block mb-4">
            Legal Information
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-lg text-casino-muted max-w-2xl mx-auto">
            Last updated: July 1, 2023
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm mb-8 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-casino-highlight" />
            <h2 className="text-xl font-semibold">Agreement to Terms</h2>
          </div>
          <p className="text-casino-muted mb-6">
            By accessing or using Lucky Social Spins, you agree to be bound by these Terms and Conditions and our Privacy Policy. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-casino-highlight" />
            <h2 className="text-xl font-semibold">Use License</h2>
          </div>
          <p className="text-casino-muted mb-6">
            Permission is granted to temporarily use Lucky Social Spins for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-6 text-casino-muted">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained in Lucky Social Spins</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
          
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-semibold">Virtual Currency</h2>
          </div>
          <p className="text-casino-muted mb-6">
            Lucky Social Spins may include a virtual currency system (coins, tokens, etc.) 
            that has no real-world value. These currencies:
          </p>
          <ul className="list-disc pl-6 mb-6 text-casino-muted">
            <li>Cannot be exchanged for real money or monetary value</li>
            <li>Are for entertainment purposes only</li>
            <li>May be subject to expiration or terms of use that can change</li>
            <li>Are non-transferable between users or accounts</li>
          </ul>
          
          <Separator className="my-6" />
          
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">Age Restrictions</h2>
          </div>
          <p className="text-casino-muted mb-6">
            You must be at least 18 years old to use Lucky Social Spins. By using our service, 
            you represent and warrant that you meet this age requirement.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-casino-highlight" />
            <h2 className="text-xl font-semibold">User Accounts</h2>
          </div>
          <p className="text-casino-muted mb-6">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p className="text-casino-muted mb-6">
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-casino-highlight" />
            <h2 className="text-xl font-semibold">Termination</h2>
          </div>
          <p className="text-casino-muted mb-6">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if you breach the Terms.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-casino-highlight" />
            <h2 className="text-xl font-semibold">Changes to Terms</h2>
          </div>
          <p className="text-casino-muted mb-6">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice 
            prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-casino-highlight" />
            <h2 className="text-xl font-semibold">Governing Law</h2>
          </div>
          <p className="text-casino-muted">
            These Terms shall be governed and construed in accordance with the laws of [Your Country], 
            without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
