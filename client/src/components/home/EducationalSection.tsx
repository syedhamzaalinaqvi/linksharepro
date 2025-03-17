import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EducationalSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Learn About WhatsApp Groups
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get to know more about WhatsApp groups, how to use them effectively, and best practices for group administrators.
          </p>
        </div>
        
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basics">Group Basics</TabsTrigger>
            <TabsTrigger value="admin">Admin Tips</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Group Basics</CardTitle>
                <CardDescription>
                  Everything you need to know about using WhatsApp groups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">What are WhatsApp Groups?</h3>
                  <p className="text-gray-600">
                    WhatsApp groups allow up to 256 people to chat together. They're perfect for staying in touch with family, coordinating with teammates, or discussing common interests with like-minded people.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How to Join a Group</h3>
                  <p className="text-gray-600">
                    You can join a WhatsApp group by:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Clicking on an invite link (like the ones shared on our platform)</li>
                    <li>Being added by a group admin who has your phone number</li>
                    <li>Scanning a QR code for the group</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Group Features</h3>
                  <p className="text-gray-600">
                    WhatsApp groups offer features like:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Group voice and video calls</li>
                    <li>File and media sharing</li>
                    <li>Group descriptions and icons</li>
                    <li>Pinned messages</li>
                    <li>Message reactions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tips for Group Admins</CardTitle>
                <CardDescription>
                  Best practices for managing and growing your WhatsApp group
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Setting Group Rules</h3>
                  <p className="text-gray-600">
                    Clear rules help maintain a positive environment. Add them to your group description and pin important announcements to ensure all members see them.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Managing Members</h3>
                  <p className="text-gray-600">
                    As an admin, you can:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Control who can add members to the group</li>
                    <li>Remove problematic members</li>
                    <li>Assign other members as admins</li>
                    <li>Control who can send messages with "Only Admins" setting</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Growing Your Group</h3>
                  <p className="text-gray-600">
                    To grow a healthy, active community:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Share your group on platforms like LinkShare</li>
                    <li>Regularly initiate interesting discussions</li>
                    <li>Welcome new members and encourage participation</li>
                    <li>Keep content relevant to the group's purpose</li>
                    <li>Address conflicts promptly and fairly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Staying safe and protecting your privacy in WhatsApp groups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Group Privacy Settings</h3>
                  <p className="text-gray-600">
                    WhatsApp offers privacy settings that let you control:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Who can add you to groups (Everyone, My Contacts, or My Contacts Except...)</li>
                    <li>Who can see your personal info like profile photo, about, and last seen</li>
                    <li>Whether to share your live location in a group</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Safe Sharing Practices</h3>
                  <p className="text-gray-600">
                    When sharing content in groups:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Be mindful of sharing sensitive personal information</li>
                    <li>Verify sources before sharing news or information</li>
                    <li>Use disappearing messages for time-sensitive content</li>
                    <li>Remember that forwarded messages are labeled as such</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Reporting Problems</h3>
                  <p className="text-gray-600">
                    If you encounter inappropriate content or behavior:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Report specific messages by long-pressing them</li>
                    <li>Contact the group admin about problematic members</li>
                    <li>Leave groups that don't maintain appropriate standards</li>
                    <li>Block contacts who send unwanted messages</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}