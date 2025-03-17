import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Share2, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { WhatsappGroup } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function GroupDetails() {
  const { id } = useParams<{ id: string }>();
  const [location, navigate] = useLocation();
  
  // Fetch group details
  const { data: group, isLoading, error } = useQuery<WhatsappGroup>({
    queryKey: [`/api/groups/${id}`],
  });
  
  // Redirect to 404 if group not found
  useEffect(() => {
    if (!isLoading && !group && !error) {
      navigate("/not-found");
    }
  }, [group, isLoading, error, navigate]);
  
  // Function to handle joining the group
  const handleJoinGroup = () => {
    if (group?.whatsapp_link) {
      window.open(group.whatsapp_link, "_blank");
    }
  };
  
  // Format date for display
  const formatDate = (dateString: Date | string | undefined) => {
    if (!dateString) return "Unknown date";
    return format(new Date(dateString), "MMMM d, yyyy");
  };
  
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-10 w-32" />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !group) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading group details. The group may not exist or has been removed.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* SEO Metadata */}
      <Helmet>
        <title>{group.group_name} | LinkShare</title>
        <meta name="description" content={group.description || "Join this WhatsApp group via LinkShare"} />
        <meta property="og:title" content={group.group_name} />
        <meta property="og:description" content={group.description || "Join this WhatsApp group via LinkShare"} />
        <meta property="og:image" content={group.image_url || ""} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
        <Card className="overflow-hidden">
          <div className="relative h-64 w-full">
            <img 
              src={group.image_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=400"} 
              alt={group.group_name} 
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                {group.category}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{group.group_name}</h1>
            
            <p className="text-gray-700 mb-6">{group.description || "No description available."}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              {group.member_count && (
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{group.member_count}+ members</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-500">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Added on {formatDate(group.created_at)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleJoinGroup}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8"
              >
                Join Group
              </Button>
              
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
