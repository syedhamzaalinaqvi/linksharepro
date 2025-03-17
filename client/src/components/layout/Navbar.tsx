import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, Plus, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { countries } from "@shared/schema";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { currentUser, isLoading } = useAuth();

  // Function to handle login/logout
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };
  
  // User initials for avatar fallback
  const getUserInitials = () => {
    if (!currentUser?.displayName) return "U";
    return currentUser.displayName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-[#128C7E] font-bold text-xl">Link<span className="text-[#25D366]">Share</span></span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`${isActive('/') ? 'border-[#25D366] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Home
              </Link>
              <Link href="/add-group" className={`${isActive('/add-group') ? 'border-[#25D366] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Add Group
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className={`${location.startsWith('/countries') ? 'border-[#25D366] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none`}>
                  <span className="flex items-center">
                    By Country <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 max-h-[70vh] overflow-auto">
                  <DropdownMenuItem onClick={() => navigate("/countries/all")}>
                    All Countries
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/countries/Global")}>
                    Global
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {countries.map((country) => (
                    <DropdownMenuItem 
                      key={country} 
                      onClick={() => navigate(`/countries/${encodeURIComponent(country)}`)}
                    >
                      {country}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/about" className={`${isActive('/about') ? 'border-[#25D366] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                About
              </Link>
              <Link href="/contact" className={`${isActive('/contact') ? 'border-[#25D366] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isLoading && (
              currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src={currentUser.photoURL || ""} />
                        <AvatarFallback className="bg-[#128C7E] text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                        <p className="text-xs leading-none text-gray-500">{currentUser.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/add-group")}>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Group</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleSignIn}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors"
                >
                  Sign In
                </Button>
              )
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#25D366]"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className={`${isActive('/') ? 'bg-gray-50 border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Home
          </Link>
          <Link href="/add-group" className={`${isActive('/add-group') ? 'bg-gray-50 border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Add Group
          </Link>
          <div>
            <button 
              onClick={toggleCountryDropdown}
              className={`${location.startsWith('/countries') ? 'bg-gray-50 border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} w-full text-left flex justify-between items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              By Country
              <ChevronDown className={`h-4 w-4 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isCountryDropdownOpen && (
              <div className="ml-4 border-l border-gray-200 pl-4 mt-1 mb-2 space-y-1">
                <Link href="/countries/all" className="block py-2 text-sm text-gray-600 hover:text-gray-900">
                  All Countries
                </Link>
                <Link href="/countries/Global" className="block py-2 text-sm text-gray-600 hover:text-gray-900">
                  Global
                </Link>
                <div className="py-1 border-t border-b border-gray-100 my-1">
                  {countries.map((country) => (
                    <Link 
                      key={country} 
                      href={`/countries/${encodeURIComponent(country)}`}
                      className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {country}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className={`${isActive('/about') ? 'bg-gray-50 border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            About
          </Link>
          <Link href="/contact" className={`${isActive('/contact') ? 'bg-gray-50 border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Contact
          </Link>
          
          {currentUser && (
            <Link href="/profile" className={`${isActive('/profile') ? 'bg-gray-50 border-[#25D366] text-[#128C7E]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Profile
            </Link>
          )}
          
          <div className="mt-4 px-3">
            <Button 
              onClick={currentUser ? handleSignOut : handleSignIn}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors"
            >
              {currentUser ? 'Sign Out' : 'Sign In'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
