import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSection from "@/components/groups/FilterSection";
import GroupCard from "@/components/groups/GroupCard";
import GroupCardCompact from "@/components/groups/GroupCardCompact";
import FeatureSection from "@/components/home/FeatureSection";
import CTASection from "@/components/home/CTASection";
import EducationalSection from "@/components/home/EducationalSection";
import SEOHead from "@/components/seo/SEOHead";
import type { WhatsappGroup } from "@shared/schema";

export default function Home() {
  // Fetch featured groups
  const { data: featuredGroups = [], isLoading: isLoadingFeatured } = useQuery<WhatsappGroup[]>({
    queryKey: ['/api/groups/featured'],
  });
  
  // Fetch recent groups
  const { data: recentGroups = [], isLoading: isLoadingRecent } = useQuery<WhatsappGroup[]>({
    queryKey: ['/api/groups/recent'],
  });
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SEOHead 
        title="LinkShare - Discover and Join WhatsApp Groups | WhatsApp Group Link Directory"
        description="Find and join popular WhatsApp groups across various categories. Share your WhatsApp group links and grow your community with LinkShare - the ultimate WhatsApp group directory."
        keywords="WhatsApp groups, WhatsApp group links, join WhatsApp groups, WhatsApp communities, WhatsApp group directory, WhatsApp link sharing"
        canonicalURL={window.location.href}
        ogTitle="LinkShare - Discover and Join WhatsApp Groups"
        ogDescription="Find and join popular WhatsApp groups across various categories. Share your WhatsApp group links and grow your community."
        ogImage="/og-home-image.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="LinkShare - Discover and Join WhatsApp Groups"
        twitterDescription="Find and join popular WhatsApp groups across various categories. Share your WhatsApp group links and grow your community."
        twitterImage="/og-home-image.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "LinkShare - WhatsApp Group Directory",
          "url": window.location.origin,
          "description": "The ultimate platform for discovering and sharing WhatsApp groups.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "LinkShare",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          }
        }}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FilterSection />
        
        {/* Featured Groups */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Groups
          </h2>
          
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-[300px] animate-pulse">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredGroups.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No featured groups available at the moment.</p>
              <Link href="/add-group">
                <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                  Add Your Group
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Recently Added Groups */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recently Added
          </h2>
          
          {isLoadingRecent ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-[200px] animate-pulse">
                  <div className="h-24 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentGroups.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recentGroups.map((group) => (
                <GroupCardCompact key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No recent groups available.</p>
              <Link href="/add-group">
                <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                  Be the First to Add a Group
                </Button>
              </Link>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link href="/groups">
              <Button className="bg-[#128C7E] hover:bg-[#25D366] text-white">
                View All Groups
              </Button>
            </Link>
          </div>
        </div>
        
        <FeatureSection />
        
        <EducationalSection />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
