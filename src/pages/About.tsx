
import { History, Users, Award, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-casino-highlight text-sm font-medium inline-block mb-4">
            Our Story
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Lucky Social Spins</h1>
          <p className="text-lg text-casino-muted max-w-2xl mx-auto">
            Creating fun, safe, and entertaining social casino experiences since 2023.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-casino-muted mb-6">
              At Lucky Social Spins, we believe that casino games should be accessible to everyone as a 
              form of entertainment without financial risk. Our mission is to create the most engaging 
              social casino platform where players can enjoy the thrill of casino games in a safe, 
              responsible environment.
            </p>
            <p className="text-casino-muted">
              We are committed to developing high-quality games that capture the excitement of real 
              casinos while fostering a community where players can connect, compete, and have fun together.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Casino games" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">Free to Play, Rich in Experience</h3>
            <p className="text-casino-muted">
              All our games are completely free to play. We focus on creating authentic casino 
              experiences without the financial risks of real gambling.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Lucky Social Spins?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <History className="h-10 w-10 text-casino-highlight mb-4" />,
                title: "Daily Bonuses",
                description: "Log in daily to collect free coins and special rewards to use in our games."
              },
              {
                icon: <Users className="h-10 w-10 text-casino-highlight mb-4" />,
                title: "Social Experience",
                description: "Connect with friends, join tournaments, and compete on leaderboards."
              },
              {
                icon: <Award className="h-10 w-10 text-casino-highlight mb-4" />,
                title: "Achievement System",
                description: "Earn badges and unlock special features as you play and progress."
              },
              {
                icon: <Zap className="h-10 w-10 text-casino-highlight mb-4" />,
                title: "Regular Updates",
                description: "We constantly add new games and features to keep the experience fresh."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-casino-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Team</h2>
            <p className="text-casino-muted max-w-2xl mx-auto">
              We're a passionate team of game developers, designers, and casino enthusiasts dedicated to creating the best social casino experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                position: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              },
              {
                name: "Sarah Williams",
                position: "Lead Game Designer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              },
              {
                name: "Michael Chen",
                position: "CTO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-2 border-casino-highlight"
                />
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-casino-muted">{member.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-casino-muted max-w-2xl mx-auto mb-6">
            Become part of our growing community of players. Sign up today and start your Lucky Social Spins adventure!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-casino-highlight text-white rounded-lg hover:bg-casino-accent transition-colors">
              Sign Up Now
            </button>
            <button className="px-6 py-3 border border-casino-muted text-casino-dark rounded-lg hover:border-casino-highlight transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
