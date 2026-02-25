"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Zod Schema ---
const bookingSchema = z.object({
  petId: z.string().min(1, "Please select a pet"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  pets: { id: string; name: string }[]; // list of user's pets
  onSubmit: (data: BookingFormValues) => void;
}

export default function BookingModal({ pets, onSubmit }: BookingModalProps) {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book Service</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Your Pet Service</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          {/* Pet Select */}
          <div className="space-y-1">
            <Label htmlFor="petId">Select Pet</Label>
            <Select
              onValueChange={(val) => setValue("petId", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your pet" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.petId && (
              <p className="text-red-500 text-sm">{errors.petId.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="datetime-local"
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          {/* End Date */}
          <div className="space-y-1">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="datetime-local"
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              placeholder="Any special instructions"
              {...register("notes")}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}