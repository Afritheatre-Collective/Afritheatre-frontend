"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ImageUploadComponent from "./ImageUploadComponent";

type VenueData = {
  county: string;
  subCounty: string;
  area: string;
  name: string;
  capacity: string;
  mapLink: string;
  imageUrl?: string;
};

const VenuesForm = () => {
  const [formData, setFormData] = useState<VenueData>({
    county: "",
    subCounty: "",
    area: "",
    name: "",
    capacity: "",
    mapLink: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = (fileUrl: string) => {
    setFormData({ ...formData, imageUrl: fileUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Enhanced validation
    if (
      !formData.county.trim() ||
      !formData.name.trim() ||
      !formData.capacity.trim()
    ) {
      toast.error("Please fill in all required fields", {
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    // Convert capacity to number
    const capacityNumber = parseInt(formData.capacity);
    if (isNaN(capacityNumber)) {
      toast.error("Please enter a valid number for capacity", {
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          county: formData.county.trim(),
          subCounty: formData.subCounty.trim(),
          area: formData.area.trim(),
          name: formData.name.trim(),
          capacity: capacityNumber,
          mapLink: formData.mapLink.trim(),
          imageUrl: formData.imageUrl?.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create venue");
      }

      await response.json();
      toast.success("Venue created successfully!", {
        position: "bottom-right",
      });

      // Reset form
      setFormData({
        county: "",
        subCounty: "",
        area: "",
        name: "",
        capacity: "",
        mapLink: "",
        imageUrl: "",
      });

      // Optionally redirect to venues list
      router.push("/venues");
    } catch (error) {
      console.error("Error creating venue:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create venue";
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center">Add New Venue</CardTitle>
          <CardDescription className="text-center">
            Submit details of event venues across Kenya
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Label>Venue Image</Label>
              <ImageUploadComponent
                onUploadSuccess={handleImageUpload}
                initialImageUrl={formData.imageUrl}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County *</Label>
              <Input
                id="county"
                type="text"
                value={formData.county}
                onChange={handleChange}
                placeholder="e.g. Nairobi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subCounty">Sub-County</Label>
              <Input
                id="subCounty"
                type="text"
                value={formData.subCounty}
                onChange={handleChange}
                placeholder="e.g. Westlands"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area/Neighborhood</Label>
              <Input
                id="area"
                type="text"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. Kilimani"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Venue Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. KICC"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Estimated number of people"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mapLink">Google Maps Link</Label>
              <Input
                id="mapLink"
                type="url"
                value={formData.mapLink}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button className="text-white" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Venue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenuesForm;
