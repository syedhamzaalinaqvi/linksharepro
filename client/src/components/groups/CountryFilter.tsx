import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CountryFilter() {
  const [location] = useLocation();
  
  // Fetch countries from the API
  const { data: countries = [] } = useQuery<string[]>({
    queryKey: ['/api/countries'],
  });

  // Function to check if country is active
  const isActiveCountry = (country: string) => {
    return location === `/country/${country.toLowerCase()}`;
  };

  return (
    <div className="bg-white py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Filter by Country</h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center space-x-2 py-1">
            <Link href="/groups">
              <span className={`inline-block ${location === '/groups' ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                Global
              </span>
            </Link>
            
            {countries.filter((country: string) => country !== "Global").map((country: string) => (
              <Link key={country} href={`/country/${country.toLowerCase()}`}>
                <span className={`inline-block ${isActiveCountry(country) ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                  {country}
                </span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}