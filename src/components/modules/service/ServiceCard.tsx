/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Briefcase } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  service: any;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { serviceType, price, description, sitter } = service;

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border">
      <CardHeader className="flex flex-row items-center justify-between">
        <Badge className="px-3 py-1 text-sm font-semibold">{serviceType}</Badge>

        <div className="flex items-center gap-1 text-lg font-bold text-primary">
          <DollarSign size={18} />
          {price}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{sitter?.user?.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Briefcase size={16} />
            {sitter?.experience} yrs experience
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={16} />${sitter?.hourlyRate}/hr
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Button className="">Book Now</Button>
          <Link href={`/services/${service.id}`}>
            {" "}
            <Button className="">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
