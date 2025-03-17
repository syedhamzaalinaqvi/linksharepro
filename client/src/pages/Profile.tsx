import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { auth, signOut } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Settings, User } from "lucide-react";

export default function Profile() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
      
      if (!user) {
        // Redirect to login if not authenticated
        navigate("/login");
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "Could not sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-8">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-60" />
                </div>
              </div>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Not authenticated state (should redirect, but just in case)
  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Not Signed In</CardTitle>
              <CardDescription>
                You need to be signed in to access your profile
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                onClick={() => navigate("/login")} 
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  // User initials for avatar fallback
  const getUserInitials = () => {
    if (!user.displayName) return "U";
    return user.displayName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>
              Manage your account and view your shared groups
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.photoURL || ""} />
                <AvatarFallback className="text-lg bg-[#128C7E] text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="text-xl font-semibold">{user.displayName}</h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {user.metadata && typeof user.metadata.creationTime === 'string' ? 
                    `Member since ${new Date(user.metadata.creationTime).toLocaleDateString()}` : 
                    'New member'}
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="groups">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="groups">My Groups</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="groups" className="py-4">
                <div className="text-center py-8">
                  <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-2">No Groups Shared Yet</h3>
                  <p className="text-gray-500 mb-4">
                    You haven't shared any WhatsApp groups yet.
                  </p>
                  <Button 
                    onClick={() => navigate("/add-group")}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    Add Your First Group
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="py-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive emails about your groups</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h4 className="font-medium">Account Security</h4>
                      <p className="text-sm text-gray-500">Manage your account security settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSignOut} 
                      variant="destructive"
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="py-4">
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Your recent activity will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}