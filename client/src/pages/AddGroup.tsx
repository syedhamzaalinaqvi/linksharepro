import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { fetchOpenGraphData } from "@/lib/ogFetcher";
import { insertWhatsappGroupSchema, categories, countries } from "@shared/schema";
import type { InsertWhatsappGroup } from "@shared/schema";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function AddGroup() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isCheckingLink, setIsCheckingLink] = useState(false);
  
  // Setup form with validation
  const form = useForm<InsertWhatsappGroup>({
    resolver: zodResolver(insertWhatsappGroupSchema),
    defaultValues: {
      group_name: "",
      category: "",
      country: "Global",
      whatsapp_link: "",
      description: "",
      image_url: "",
      member_count: 0,
    },
  });
  
  // Create mutation for adding a new group
  const mutation = useMutation({
    mutationFn: async (data: InsertWhatsappGroup) => {
      const response = await apiRequest("POST", "/api/groups", data);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/groups'] });
      queryClient.invalidateQueries({ queryKey: ['/api/groups/featured'] });
      queryClient.invalidateQueries({ queryKey: ['/api/groups/recent'] });
      
      toast({
        title: "Group Added Successfully!",
        description: "Your WhatsApp group has been added to our directory.",
      });
      
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Failed to add group",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });
  
  // Function to check WhatsApp link and fetch Open Graph data
  const checkWhatsAppLink = async (url: string) => {
    if (!url || !url.includes("chat.whatsapp.com")) {
      toast({
        title: "Invalid WhatsApp link",
        description: "Please enter a valid WhatsApp invite link that includes 'chat.whatsapp.com'",
        variant: "destructive",
      });
      return;
    }
    
    setIsCheckingLink(true);
    
    try {
      const ogData = await fetchOpenGraphData(url);
      
      // Update form with fetched data if available
      if (ogData.title) {
        form.setValue("group_name", ogData.title);
      }
      
      if (ogData.description) {
        form.setValue("description", ogData.description);
      }
      
      if (ogData.image) {
        form.setValue("image_url", ogData.image);
      }
      
      toast({
        title: "Group info fetched",
        description: "We've automatically filled in some details from your WhatsApp group link.",
      });
    } catch (error) {
      toast({
        title: "Error checking link",
        description: "Could not fetch information from this WhatsApp link. Please fill in the details manually.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingLink(false);
    }
  };
  
  // Handle form submission
  const onSubmit = (data: InsertWhatsappGroup) => {
    mutation.mutate(data);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-12">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Add Your WhatsApp Group</CardTitle>
            <CardDescription>
              Share your WhatsApp group with our community and reach more members
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* WhatsApp Link */}
                <FormField
                  control={form.control}
                  name="whatsapp_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Invite Link</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input 
                            placeholder="https://chat.whatsapp.com/..." 
                            {...field} 
                            className="flex-1"
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => checkWhatsAppLink(field.value)}
                          disabled={isCheckingLink || !field.value}
                        >
                          {isCheckingLink ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Checking...
                            </>
                          ) : (
                            "Fetch Info"
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Group Name */}
                <FormField
                  control={form.control}
                  name="group_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your group name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what your group is about" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Group Image URL */}
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          {...field} 
                          value={field.value || ""} 
                        />
                      </FormControl>
                      {field.value && (
                        <div className="mt-2 rounded-md overflow-hidden">
                          <img 
                            src={field.value} 
                            alt="Group preview" 
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                            }}
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Member Count */}
                <FormField
                  control={form.control}
                  name="member_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approximate Member Count (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <CardFooter className="flex justify-end px-0">
                  <Button 
                    type="submit" 
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Group"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
