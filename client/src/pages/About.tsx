import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About LinkShare</h1>
        
        <div className="prose lg:prose-lg">
          <p>
            LinkShare is a platform designed to make discovering and sharing WhatsApp groups easier than ever. 
            Our mission is to connect people with communities that match their interests, while helping group
            owners grow their communities.
          </p>
          
          <h2>Our Story</h2>
          <p>
            LinkShare was founded in 2023 by a team of developers who noticed how difficult it was to find
            relevant WhatsApp groups. With the growing popularity of WhatsApp as a communication tool for
            communities, we saw an opportunity to create a dedicated platform for group discovery.
          </p>
          
          <h2>What We Offer</h2>
          <ul>
            <li>A simple way to discover WhatsApp groups across various categories</li>
            <li>An easy submission process for group owners to share their communities</li>
            <li>Category-based organization to help users find relevant groups</li>
            <li>A secure platform that follows community guidelines</li>
          </ul>
          
          <h2>Community Guidelines</h2>
          <p>
            At LinkShare, we're committed to maintaining a safe and respectful platform. All submitted
            groups are reviewed to ensure they comply with our community guidelines, which prohibit:
          </p>
          
          <ul>
            <li>Illegal content or activities</li>
            <li>Hate speech or discriminatory content</li>
            <li>Explicit or adult content</li>
            <li>Spam or misleading information</li>
          </ul>
          
          <h2>Connect With Us</h2>
          <p>
            We're always looking to improve our platform and would love to hear your feedback.
            Feel free to reach out to us through our <a href="/contact" className="text-[#25D366] hover:text-[#128C7E]">contact page</a>.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
