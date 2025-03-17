import { Search, Share2, Tag, Shield } from "lucide-react";

export default function FeatureSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#25D366] font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why use LinkShare?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            The easiest way to discover and share WhatsApp groups with the community.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#25D366] text-white">
                  <Search className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Discover Groups</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Find WhatsApp groups based on your interests and join communities that matter to you.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#25D366] text-white">
                  <Share2 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Share Your Groups</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Got a WhatsApp group? Share it with our community and grow your members easily.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#25D366] text-white">
                  <Tag className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Organized Categories</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Groups are neatly organized into categories making it easy to find what you're looking for.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#25D366] text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Safe and Secure</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                We review all submitted groups to ensure they meet our community guidelines.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
