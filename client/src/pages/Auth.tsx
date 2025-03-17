import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { signInWithGoogle } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is already authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to home page
        navigate("/");
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);
  
  // Handle sign in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      toast({
        title: "Successfully signed in",
        description: "Welcome to LinkShare!",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Authentication failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to LinkShare</CardTitle>
            <CardDescription>
              Sign in to add groups, manage your profile, and more
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-500 mb-4">
              <p>By continuing, you agree to our</p>
              <p>
                <a href="/terms" className="text-[#25D366] hover:text-[#128C7E]">Terms of Service</a>
                {" and "}
                <a href="/privacy" className="text-[#25D366] hover:text-[#128C7E]">Privacy Policy</a>
              </p>
            </div>
            
            <Button
              variant="outline"
              className="w-full py-6 flex items-center justify-center space-x-2"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <FcGoogle className="h-5 w-5 mr-2" />
              )}
              <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <p>
              Don't want to sign in? <a href="/" className="text-[#25D366] hover:text-[#128C7E]">Browse as guest</a>
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}