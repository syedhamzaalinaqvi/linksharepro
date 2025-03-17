import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose lg:prose-lg">
          <p>
            <strong>Last Updated:</strong> July 1, 2023
          </p>
          
          <p>
            At LinkShare, we respect your privacy and are committed to protecting it through our
            compliance with this policy. This Privacy Policy describes the types of information we
            may collect from you or that you may provide when you visit our website and our
            practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          
          <h2>Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our website, including:
          </p>
          
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your name, email address, and
              any other information you voluntarily provide when contacting us or submitting a
              WhatsApp group.
            </li>
            <li>
              <strong>WhatsApp Group Information:</strong> When you submit a WhatsApp group, we
              collect the group link, name, description, and category.
            </li>
            <li>
              <strong>Usage Information:</strong> We automatically collect information about your
              visits to our website, including traffic data, logs, and other communication data.
            </li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us:
          </p>
          
          <ul>
            <li>To present our website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us.</li>
            <li>To fulfill any other purpose for which you provide it.</li>
            <li>To notify you about changes to our website or any products or services we offer or provide.</li>
            <li>In any other way we may describe when you provide the information.</li>
            <li>For any other purpose with your consent.</li>
          </ul>
          
          <h2>Disclosure of Your Information</h2>
          <p>
            We may disclose aggregated information about our users, and information that does not
            identify any individual, without restriction.
          </p>
          
          <p>
            We may disclose personal information that we collect or you provide as described in this
            privacy policy:
          </p>
          
          <ul>
            <li>To our subsidiaries and affiliates.</li>
            <li>To contractors, service providers, and other third parties we use to support our business.</li>
            <li>To fulfill the purpose for which you provide it.</li>
            <li>For any other purpose disclosed by us when you provide the information.</li>
            <li>With your consent.</li>
          </ul>
          
          <h2>Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from
            accidental loss and from unauthorized access, use, alteration, and disclosure.
          </p>
          
          <h2>Changes to Our Privacy Policy</h2>
          <p>
            It is our policy to post any changes we make to our privacy policy on this page. If we
            make material changes to how we treat our users' personal information, we will notify
            you through a notice on the website home page.
          </p>
          
          <h2>Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact
            us at: <a href="mailto:privacy@linkshare.example" className="text-[#25D366] hover:text-[#128C7E]">privacy@linkshare.example</a>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
