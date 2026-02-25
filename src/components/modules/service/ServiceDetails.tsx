"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Briefcase, DollarSign, PawPrint } from "lucide-react";
import BookingModal, { BookingFormValues } from "./ServiceBookingModal";
import { useEffect, useState } from "react";
import { getOwnPets } from "@/services/pets";
import { createBooking } from "@/services/booking";
import { toast } from "sonner";

interface ServiceDetailsProps {
  service: any;
  user: any;
}

export default function ServiceDetails({ service, user }: ServiceDetailsProps) {
  const { serviceType, price, description, sitter } = service;
  // const pets = [
  //   { id: "639507f2-086a-4397-ac2f-71be7c5bf330", name: "Fluffy" },
  //   { id: "639507f2-086a-4397-ac2f-71be7c5bf331", name: "Bella" },
  // ];
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const { data } = await getOwnPets();
      setPets(data);
    };
    fetchPets();
  }, []);

  async function handleBooking(data: BookingFormValues) {
    const payload = {
      ownerId: user.id,
      sitterId: service.sitterId,
      petId: data.petId,
      serviceId: service.id,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      notes: data.notes,
    };
    console.log(payload);
    try {
      const res = await createBooking(payload);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        {/* HERO SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-1 text-sm">
              {serviceType}
            </Badge>

            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <PawPrint size={16} />
              Trusted Pet Care
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Loving & Professional Pet {serviceType}
          </h1>

          <div className="flex items-center gap-2 text-2xl font-semibold text-primary">
            <DollarSign size={22} />${price}{" "}
            <span className="text-base text-muted-foreground font-normal">
              per session
            </span>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="md:col-span-2 space-y-8">
            {/* ABOUT SERVICE */}
            <Card className="rounded-2xl shadow-sm border">
              <CardContent className="p-8 space-y-4">
                <h2 className="text-2xl font-semibold">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>

            {/* SITTER PROFILE */}
            <Card className="rounded-2xl shadow-sm border">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold">Meet Your Sitter</h2>

                <div className="flex items-center gap-5">
                  <Avatar className="h-16 w-16 text-lg">
                    <AvatarFallback>
                      {sitter?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {sitter?.user?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Professional Pet Sitter
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase size={16} />
                    {sitter?.experience} Years Experience
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} />${sitter?.hourlyRate}/Hour
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sitter?.bio}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT BOOKING PANEL */}
          <div>
            <Card className="sticky top-28 rounded-2xl shadow-xl border bg-background">
              <CardContent className="p-8 space-y-6">
                <div className="text-3xl font-bold text-primary">${price}</div>

                <p className="text-sm text-muted-foreground">
                  Secure your booking now and ensure the best care for your pet.
                </p>

                <BookingModal pets={pets} onSubmit={handleBooking} />

                <Button variant="outline" className="w-full rounded-xl">
                  Message Sitter
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  No upfront payment required
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
