import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhatsAppBlog() {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">WhatsApp Groups Guide</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>What are WhatsApp Groups?</CardTitle>
            <CardDescription>
              The basics of WhatsApp group functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              WhatsApp groups are virtual spaces where up to 256 people can chat, share media, and communicate
              in real-time. These groups make it easy to stay connected with family, coordinate with teammates,
              network with professionals, or discuss common interests with like-minded people.
            </p>
            <p>
              Each group has one or more administrators who can add members, remove participants, and manage
              group settings. Groups can be created for any purpose - personal, professional, educational,
              or entertainment.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Benefits of WhatsApp Groups</CardTitle>
            <CardDescription>
              Why WhatsApp groups are popular worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Instant communication with multiple people simultaneously</li>
              <li>Share photos, videos, documents, and voice messages</li>
              <li>Create communities around shared interests</li>
              <li>Free to use with just an internet connection</li>
              <li>End-to-end encryption for security</li>
              <li>Accessible across multiple devices</li>
              <li>Voice and video calling capabilities</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="join-group">
          <AccordionTrigger className="text-lg font-medium">How to Join a WhatsApp Group</AccordionTrigger>
          <AccordionContent className="space-y-3 text-gray-700">
            <p>There are several ways to join a WhatsApp group:</p>
            
            <h4 className="font-semibold mt-2">Using an Invite Link</h4>
            <p>
              The easiest way to join a group is by using an invite link (like the one on this page):
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on the invite link (usually starts with "https://chat.whatsapp.com/")</li>
              <li>WhatsApp will open automatically</li>
              <li>Tap the "Join Group" button</li>
              <li>You'll be added to the group immediately</li>
            </ol>
            
            <h4 className="font-semibold mt-2">Being Added by an Admin</h4>
            <p>
              Group administrators can add you directly if they have your phone number saved in their contacts.
              You'll receive a notification when you've been added to a new group.
            </p>
            
            <h4 className="font-semibold mt-2">Using QR Codes</h4>
            <p>
              Some groups share QR codes that can be scanned:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Open WhatsApp and tap the camera icon</li>
              <li>Scan the group's QR code</li>
              <li>Tap "Join Group" when prompted</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="group-etiquette">
          <AccordionTrigger className="text-lg font-medium">WhatsApp Group Etiquette</AccordionTrigger>
          <AccordionContent className="space-y-3 text-gray-700">
            <p>
              To make the most of your group experience and be a valued member, follow these etiquette guidelines:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Stay on topic:</span> Keep conversations relevant to the group's purpose
              </li>
              <li>
                <span className="font-semibold">Respect privacy:</span> Don't share others' personal information or screenshots without permission
              </li>
              <li>
                <span className="font-semibold">Avoid spam:</span> Don't flood the group with excessive messages, forwards, or promotional content
              </li>
              <li>
                <span className="font-semibold">Be respectful:</span> Maintain politeness and avoid offensive language or controversial topics
              </li>
              <li>
                <span className="font-semibold">Check before adding:</span> Ask for permission before adding new members to the group
              </li>
              <li>
                <span className="font-semibold">Use mentions wisely:</span> Only @mention people when necessary
              </li>
              <li>
                <span className="font-semibold">Consider timing:</span> Avoid sending messages at very late hours unless it's urgent
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="privacy-security">
          <AccordionTrigger className="text-lg font-medium">Privacy and Security in WhatsApp Groups</AccordionTrigger>
          <AccordionContent className="space-y-3 text-gray-700">
            <p>
              Staying safe in WhatsApp groups is important. Here are some privacy and security tips:
            </p>
            
            <h4 className="font-semibold mt-2">Protecting Your Personal Information</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Adjust who can see your profile photo, status, and last seen in WhatsApp privacy settings</li>
              <li>Be cautious about sharing personal details with groups, especially large ones</li>
              <li>Consider using a profile picture that doesn't clearly show your face in public groups</li>
            </ul>
            
            <h4 className="font-semibold mt-2">Managing Group Invites</h4>
            <p>
              You can control who can add you to groups:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to WhatsApp Settings > Account > Privacy > Groups</li>
              <li>Choose either "Everyone," "My Contacts," or "My Contacts Except..."</li>
            </ol>
            
            <h4 className="font-semibold mt-2">Reporting Problems</h4>
            <p>
              If you encounter inappropriate content or behavior:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Report specific messages by long-pressing them and selecting "Report"</li>
              <li>Contact the group admin about problematic members</li>
              <li>Leave groups that don't maintain appropriate standards</li>
              <li>Block contacts who send unwanted messages</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-[#e8f6ef] p-6 rounded-lg border border-[#25D366]">
        <h3 className="text-xl font-semibold text-[#128C7E] mb-4">Creating Your Own WhatsApp Group</h3>
        <p className="mb-3">
          Want to start your own community? Here's how to create a WhatsApp group:
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 mb-4">
          <li>Open WhatsApp and go to the Chats tab</li>
          <li>On Android, tap the three dots and select &quot;New group&quot; (on iPhone, tap &quot;New Group&quot;)</li>
          <li>Select the contacts you want to add</li>
          <li>Tap the arrow or &quot;Next&quot; to proceed</li>
          <li>Add a group subject (name) and optional group icon</li>
          <li>Tap &quot;Create&quot; or the checkmark to finish</li>
        </ol>
        
        <p>
          Once your group is created, you can share the invite link by tapping the group name and selecting 
          &quot;Invite to group via link.&quot; Then, add your group to LinkShare to help more people discover it!
        </p>
      </div>
    </div>
  );
}