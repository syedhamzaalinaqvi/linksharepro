import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function FilterSection() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch categories from the API
  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch countries from the API
  const { data: countries = [] } = useQuery<string[]>({
    queryKey: ['/api/countries'],
  });

  // Function to check if category is active
  const isActiveCategory = (category: string) => {
    return location === `/category/${category.toLowerCase()}`;
  };

  // Function to check if country is active
  const isActiveCountry = (country: string) => {
    return location === `/country/${country.toLowerCase()}`;
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-white py-6 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Search for WhatsApp groups..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="bg-[#25D366] hover:bg-[#128C7E] text-white"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {/* Filter Tabs */}
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="mt-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex items-center space-x-2 py-1">
                <Link href="/groups">
                  <span className={`inline-block ${location === '/groups' || location === '/' ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                    All Categories
                  </span>
                </Link>
                
                {categories.map((category) => (
                  <Link key={category} href={`/category/${category.toLowerCase()}`}>
                    <span className={`inline-block ${isActiveCategory(category) ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                      {category}
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="countries" className="mt-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex items-center space-x-2 py-1">
                <Link href="/groups">
                  <span className={`inline-block ${location === '/groups' || location === '/' ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                    Global
                  </span>
                </Link>
                
                {countries.filter(country => country !== "Global").map(country => (
                  <Link key={country} href={`/country/${country.toLowerCase()}`}>
                    <span className={`inline-block ${isActiveCountry(country) ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                      {country}
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}