import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsappGroup } from "@shared/schema";
import { ArrowRight, Users } from "lucide-react";

interface GroupCardProps {
  group: WhatsappGroup;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[56.25%]">
        <img 
          src={group.image_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450"} 
          alt={group.group_name} 
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <Badge className="bg-[#25D366] hover:bg-[#128C7E] text-white">
            {group.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.group_name}</h3>
        <p className="text-sm text-gray-500 mb-4">{group.description || "Join this WhatsApp group!"}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            <Users className="inline mr-1 h-4 w-4" /> {group.member_count || 0}+ members
          </span>
          <Link href={`/group/${group.id}`}>
            <Button variant="default" size="sm" className="bg-[#128C7E] hover:bg-[#25D366] text-white">
              Join Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
