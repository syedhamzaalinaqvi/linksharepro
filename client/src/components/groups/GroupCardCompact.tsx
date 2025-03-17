import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsappGroup } from "@shared/schema";
import { ArrowRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GroupCardCompactProps {
  group: WhatsappGroup;
}

export default function GroupCardCompact({ group }: GroupCardCompactProps) {
  const timeAgo = formatDistanceToNow(new Date(group.created_at), { addSuffix: true });
  
  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
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
        <h3 className="text-base font-semibold text-gray-900 mb-1">{group.group_name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            <Clock className="inline mr-1 h-3 w-3" /> {timeAgo}
          </span>
          <Link href={`/group/${group.id}`}>
            <span className="text-sm font-medium text-[#128C7E] hover:text-[#25D366]">
              Join <ArrowRight className="inline ml-1 h-3 w-3" />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
