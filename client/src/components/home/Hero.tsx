import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Search } from "lucide-react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter a search term to find WhatsApp groups",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };
  
  return (
    <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Discover &amp; Share WhatsApp Groups
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-white">
          Find interesting WhatsApp groups or share your own with the community.
        </p>
        <div className="mt-10 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex rounded-md shadow-sm">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:ring-[#25D366] focus:border-[#25D366] block w-full rounded-l-md pl-4 pr-20 py-3 border-gray-300 text-gray-900 placeholder-gray-500"
              placeholder="Search for groups..."
            />
            <Button 
              type="submit"
              className="relative -ml-px inline-flex items-center space-x-2 px-6 py-3 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#128C7E] hover:bg-[#25D366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
