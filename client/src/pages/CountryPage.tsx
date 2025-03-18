import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { WhatsappGroup } from "@shared/schema";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import GroupCard from "@/components/groups/GroupCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { countries } from "@shared/schema";

export default function CountryPage() {
  const [, params] = useRoute("/countries/:country");
  const country = params?.country ? decodeURIComponent(params.country) : "all";
  const [selectedCountry, setSelectedCountry] = useState(country);
  
  // Update selected country when route changes
  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);
  
  // Get list of groups for the selected country
  const { 
    data: groups = [], 
    isLoading,
    isError 
  } = useQuery<WhatsappGroup[]>({
    queryKey: ['/api/countries', selectedCountry],
    enabled: selectedCountry !== "all",
  });
  
  // Get all groups if "all" is selected
  const { 
    data: allGroups = [],
    isLoading: isLoadingAll,
    isError: isErrorAll 
  } = useQuery<WhatsappGroup[]>({
    queryKey: ['/api/groups'],
    enabled: selectedCountry === "all",
  });
  
  const isLoadingAny = isLoading || isLoadingAll;
  const displayGroups = selectedCountry === "all" ? allGroups : groups;
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SEOHead 
        title={`${selectedCountry === "all" ? "WhatsApp Groups By Country" : `${selectedCountry} WhatsApp Groups`} | LinkShare`}
        description={`${selectedCountry === "all" ? "Browse WhatsApp groups from countries around the world" : `Join ${selectedCountry} WhatsApp groups and connect with people from ${selectedCountry}`}. Find and share WhatsApp communities by country.`}
        keywords={`${selectedCountry} WhatsApp groups, WhatsApp groups by country, ${selectedCountry} chat groups, international WhatsApp groups, ${selectedCountry} community groups`}
        canonicalURL={window.location.href}
        ogTitle={`${selectedCountry === "all" ? "WhatsApp Groups By Country" : `${selectedCountry} WhatsApp Groups`}`}
        ogDescription={`${selectedCountry === "all" ? "Browse WhatsApp groups from countries around the world" : `Join ${selectedCountry} WhatsApp groups and connect with people from ${selectedCountry}`}`}
        ogImage={`/og-country-${selectedCountry.toLowerCase().replace(/\s+/g, '-')}.jpg`}
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle={`${selectedCountry === "all" ? "WhatsApp Groups By Country" : `${selectedCountry} WhatsApp Groups`}`}
        twitterDescription={`${selectedCountry === "all" ? "Browse WhatsApp groups from countries around the world" : `Join ${selectedCountry} WhatsApp groups and connect with people from ${selectedCountry}`}`}
        twitterImage={`/og-country-${selectedCountry.toLowerCase().replace(/\s+/g, '-')}.jpg`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${selectedCountry === "all" ? "WhatsApp Groups By Country" : `${selectedCountry} WhatsApp Groups`}`,
          "description": `${selectedCountry === "all" ? "Browse WhatsApp groups from countries around the world" : `Find and join WhatsApp groups from ${selectedCountry}`}`,
          "url": window.location.href,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": displayGroups.map((group, index) => ({
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
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedCountry === "all" 
              ? "All Countries" 
              : `${selectedCountry} WhatsApp Groups`}
          </h1>
          <p className="text-gray-600 mb-6">
            {selectedCountry === "all" 
              ? "Browse WhatsApp groups from all countries" 
              : `Discover WhatsApp groups specific to ${selectedCountry}`}
          </p>
          
          {/* Countries filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/countries/all">
              <Badge 
                className={`cursor-pointer px-3 py-1 ${
                  selectedCountry === "all" 
                    ? "bg-[#25D366] hover:bg-[#128C7E]" 
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                All Countries
              </Badge>
            </Link>
            {countries.map((country) => (
              <Link key={country} href={`/countries/${encodeURIComponent(country)}`}>
                <Badge 
                  className={`cursor-pointer px-3 py-1 ${
                    selectedCountry === country 
                      ? "bg-[#25D366] hover:bg-[#128C7E]" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {country}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
        
        {isLoadingAny ? (
          // Loading skeleton
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
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
        ) : isError || isErrorAll ? (
          // Error state
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">Failed to load WhatsApp groups. Please try again later.</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Retry
            </Button>
          </div>
        ) : displayGroups.length > 0 ? (
          // Results
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          // No results
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              {selectedCountry === "all" 
                ? "No WhatsApp groups available at the moment." 
                : `No WhatsApp groups found for ${selectedCountry}.`}
            </p>
            <Link href="/add-group">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                Add Your Group
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}