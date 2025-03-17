import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CategoryFilter() {
  const [location] = useLocation();
  
  // Fetch categories from the API
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/categories'],
  });

  // Function to check if category is active
  const isActiveCategory = (category: string) => {
    return location === `/groups/${category.toLowerCase()}`;
  };

  return (
    <div className="bg-white py-4 shadow-sm sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center space-x-2 py-1">
            <Link href="/groups">
              <span className={`inline-block ${location === '/groups' ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                All Groups
              </span>
            </Link>
            
            {categories.map((category: string) => (
              <Link key={category} href={`/groups/${category.toLowerCase()}`}>
                <span className={`inline-block ${isActiveCategory(category) ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} px-4 py-2 rounded-full text-sm font-medium mb-2`}>
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
