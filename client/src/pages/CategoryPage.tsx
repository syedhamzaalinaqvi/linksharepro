import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryFilter from "@/components/groups/CategoryFilter";
import GroupCard from "@/components/groups/GroupCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { WhatsappGroup } from "@shared/schema";
import SEOHead from "@/components/seo/SEOHead";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : "";
  
  // Fetch groups by category
  const { data: groups = [], isLoading, error } = useQuery<WhatsappGroup[]>({
    queryKey: [`/api/categories/${decodedCategory}`],
  });
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SEOHead 
        title={`${decodedCategory ? `${decodedCategory} WhatsApp Groups` : 'All WhatsApp Groups'} | LinkShare`}
        description={`Browse and join the best ${decodedCategory || ''} WhatsApp groups. Find active and popular ${decodedCategory || 'community'} groups to connect with like-minded people on WhatsApp.`}
        keywords={`${decodedCategory} WhatsApp groups, ${decodedCategory} chat groups, join ${decodedCategory} WhatsApp, WhatsApp ${decodedCategory} communities, ${decodedCategory} group links`}
        canonicalURL={window.location.href}
        ogTitle={`${decodedCategory ? `${decodedCategory} WhatsApp Groups` : 'All WhatsApp Groups'} | LinkShare`}
        ogDescription={`Browse and join the best ${decodedCategory || ''} WhatsApp groups. Find active groups for ${decodedCategory || 'any interest'}.`}
        ogImage={`/og-category-${decodedCategory.toLowerCase().replace(/\s+/g, '-') || 'all'}.jpg`}
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle={`${decodedCategory ? `${decodedCategory} WhatsApp Groups` : 'All WhatsApp Groups'} | LinkShare`}
        twitterDescription={`Browse and join the best ${decodedCategory || ''} WhatsApp groups. Find active groups for ${decodedCategory || 'any interest'}.`}
        twitterImage={`/og-category-${decodedCategory.toLowerCase().replace(/\s+/g, '-') || 'all'}.jpg`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${decodedCategory} WhatsApp Groups`,
          "description": `Directory of ${decodedCategory} WhatsApp groups for joining and sharing.`,
          "url": window.location.href,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": groups.map((group, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SocialMediaPosting",
                "headline": group.group_name,
                "description": group.description,
                "url": `${window.location.origin}/groups/${group.id}`
              }
            }))
          }
        }}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <CategoryFilter />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
            {decodedCategory || "All"} Groups
          </h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-[300px] animate-pulse">
                  <Skeleton className="h-40 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Error loading groups. Please try again later.
              </AlertDescription>
            </Alert>
          ) : groups.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                No groups found in the "{decodedCategory}" category.
              </p>
              <p className="text-gray-700">
                Try browsing other categories or add your own group!
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
