import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SEOHead 
        title="Terms of Service | LinkShare WhatsApp Group Directory"
        description="Read the Terms of Service for LinkShare WhatsApp Group Directory. Learn about the rules and guidelines for submitting and using WhatsApp groups on our platform."
        keywords="LinkShare terms, WhatsApp group terms, LinkShare WhatsApp directory terms, WhatsApp group submission guidelines"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Service",
          "description": "Terms of Service for the LinkShare WhatsApp Group Directory platform",
          "publisher": {
            "@type": "Organization",
            "name": "LinkShare",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          },
          "dateModified": "2023-07-01T00:00:00+00:00"
        }}
      />
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose lg:prose-lg">
          <p>
            <strong>Last Updated:</strong> July 1, 2023
          </p>
          
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using
            the LinkShare website (the "Service") operated by LinkShare ("us", "we", or "our").
          </p>
          
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance
            with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree
            with any part of the terms, then you may not access the Service.
          </p>
          
          <h2>WhatsApp Group Submission</h2>
          <p>
            When you submit a WhatsApp group to our Service, you represent and warrant that:
          </p>
          
          <ul>
            <li>You have the right and permission to share the WhatsApp group link.</li>
            <li>The group does not contain illegal content or promote illegal activities.</li>
            <li>The group does not contain hate speech, discriminatory content, or explicit adult content.</li>
            <li>The description accurately represents the purpose and content of the group.</li>
            <li>You understand that all groups are subject to review and may be removed if they violate our guidelines.</li>
          </ul>
          
          <h2>Content Moderation</h2>
          <p>
            We reserve the right, at our sole discretion, to remove any WhatsApp group from our
            Service for any reason, including but not limited to violations of our community guidelines
            or these Terms of Service.
          </p>
          
          <h2>Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the
            exclusive property of LinkShare and its licensors. The Service is protected by copyright,
            trademark, and other laws of both the United States and foreign countries.
          </p>
          
          <h2>Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned
            or controlled by LinkShare.
          </p>
          
          <p>
            LinkShare has no control over, and assumes no responsibility for, the content, privacy
            policies, or practices of any third-party web sites or services. You further acknowledge
            and agree that LinkShare shall not be responsible or liable, directly or indirectly, for
            any damage or loss caused or alleged to be caused by or in connection with the use of or
            reliance on any such content, goods, or services available on or through any such web sites
            or services.
          </p>
          
          <h2>Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or
            liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <h2>Limitation Of Liability</h2>
          <p>
            In no event shall LinkShare, nor its directors, employees, partners, agents, suppliers,
            or affiliates, be liable for any indirect, incidental, special, consequential or punitive
            damages, including without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
          
          <h2>Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
            If a revision is material, we will try to provide at least 30 days' notice prior to any new
            terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <a href="mailto:terms@linkshare.example" className="text-[#25D366] hover:text-[#128C7E]">terms@linkshare.example</a>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
