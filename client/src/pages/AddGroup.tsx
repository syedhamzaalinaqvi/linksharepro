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
                            onBlur={() => {
                              if (field.value && field.value.includes('chat.whatsapp.com')) {
                                checkWhatsAppLink(field.value);
                              }
                            }}
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
                      
                      {/* Link Preview - Show when link is entered and not checking */}
                      {field.value && !isCheckingLink && (
                        <div className="mt-4 border rounded-md overflow-hidden bg-white">
                          <div className="p-3 border-b">
                            <h4 className="font-medium text-sm text-gray-500">Link Preview</h4>
                          </div>
                          <div className="p-4 space-y-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                {form.watch("image_url") && form.watch("image_url") !== "" ? (
                                  <img 
                                    src={form.watch("image_url") || ""} 
                                    alt="Group preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://via.placeholder.com/80x80?text=WhatsApp';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-[#25D366]">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="white"/>
                                      <path fillRule="evenodd" clipRule="evenodd" d="M27.7969 12.1985C26.0938 10.4923 23.8548 9.39539 21.4693 9.09539C19.0839 8.79539 16.664 9.30308 14.5953 10.5423C12.5266 11.7815 10.9266 13.6869 10.0369 15.9504C9.14711 18.2138 9.01402 20.7031 9.65781 23.0485L9.76117 23.3754L8.75 29.5L15.0245 28.5081L15.3404 28.6023C16.9166 29.0742 18.5755 29.2376 20.2188 29.0812C21.862 28.9247 23.4553 28.4519 24.8958 27.6935C26.3364 26.935 27.5892 25.9088 28.5667 24.6823C29.5443 23.4558 30.2224 22.0551 30.5581 20.5621C30.8937 19.0692 30.8798 17.5218 30.5173 16.0347C30.1547 14.5476 29.4518 13.1591 28.4528 11.9496L28.4516 11.9481L27.7969 12.1985ZM14.5234 25.405L14.9688 25.0219C15.6406 24.4631 16.5612 24.3127 17.375 24.625L17.3766 24.6254C18.1953 24.9369 19.0513 25.0957 19.9167 25.0957C21.6589 25.0957 23.3302 24.4419 24.5987 23.2629C25.8672 22.0838 26.5781 20.4961 26.5781 18.8415C26.5781 18.1011 26.4586 17.3671 26.2245 16.67C25.9905 15.9729 25.6459 15.3242 25.207 14.7543C24.3255 13.6211 23.1193 12.7733 21.7492 12.3238C20.3791 11.8742 18.917 11.8446 17.5306 12.2384C16.1443 12.6323 14.9095 13.4288 13.989 14.5221C13.0686 15.6155 12.5013 16.9611 12.3594 18.3804C12.2233 19.7385 12.5148 21.1062 13.1953 22.2915L13.4818 22.8158L12.9818 24.7315L14.5234 25.405Z" fill="#25D366"/>
                                      <path d="M24.6642 20.9565C24.4103 20.5511 23.7826 20.0565 23.7826 20.0565C23.5018 19.8565 23.2489 19.9293 23.1301 20.0565L22.8773 20.3348C22.7585 20.4565 22.5045 20.5457 22.3489 20.4348C21.5367 20.0239 20.1413 18.7457 19.7676 17.9511C19.6859 17.7402 19.8045 17.5293 19.9233 17.4076L20.1403 17.1293C20.2489 17.0022 20.2862 16.7511 20.0323 16.4728C20.0323 16.4728 19.5776 15.8728 19.2039 15.6076C18.9593 15.3654 18.6785 15.3413 18.5045 15.4826L18.1863 15.7609C17.4114 16.4022 17.6467 17.3022 17.82 17.6185C17.82 17.6185 18.5414 19.4315 20.3863 21.1141C22.2125 22.7772 24.0574 23.4185 24.0574 23.4185C24.3755 23.5707 25.3035 23.7793 25.9506 23.0413L26.2139 22.7424C26.3593 22.5881 26.319 22.3063 26.0926 22.072C25.8117 21.7076 25.2269 21.3011 24.6642 20.9565Z" fill="#25D366"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {form.watch("group_name") || "WhatsApp Group"}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {form.watch("description") || "No description available"}
                                </p>
                                <div className="mt-2 flex items-center text-xs text-gray-500">
                                  <span className="inline-block bg-[#25D366] text-white px-2 py-1 rounded-sm mr-2">
                                    {form.watch("category") || "Category"}
                                  </span>
                                  <span>{form.watch("country") || "Global"}</span>
                                  {Number(form.watch("member_count") || 0) > 0 && (
                                    <span className="ml-2">• {form.watch("member_count")} members</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
                          value={field.value || ""}
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
