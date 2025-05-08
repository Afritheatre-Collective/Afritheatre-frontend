"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

interface Venue {
  _id: string;
  county: string;
  subCounty?: string;
  area?: string;
  name: string;
  capacity: number;
  mapLink?: string;
}

const Venues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Venue;
    direction: "ascending" | "descending";
  } | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/venues");
        const data = await res.json();
        setVenues(data);
        setFilteredVenues(data);
      } catch (err) {
        console.error("Error fetching venues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Search function
  useEffect(() => {
    const results = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venue.subCounty &&
          venue.subCounty.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (venue.area &&
          venue.area.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredVenues(results);
  }, [searchTerm, venues]);

  // Sort function
  const requestSort = (key: keyof Venue) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedVenues = [...filteredVenues].sort((a, b) => {
      // Handle undefined values
      if (a[key] === undefined) return direction === "ascending" ? 1 : -1;
      if (b[key] === undefined) return direction === "ascending" ? -1 : 1;

      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredVenues(sortedVenues);
  };

  const handleViewMore = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedVenue) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/venues/${selectedVenue._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setVenues(venues.filter((venue) => venue._id !== selectedVenue._id));
        setFilteredVenues(
          filteredVenues.filter((venue) => venue._id !== selectedVenue._id)
        );
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete venue");
      }
    } catch (err) {
      console.error("Error deleting venue:", err);
    }
  };

  const handleEdit = () => {
    // Implement your edit logic here
    console.log("Edit venue:", selectedVenue);
    // You might want to open another modal or navigate to an edit page
  };

  if (loading) return <div className="p-4">Loading venues...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Venue Management</h2>

      {/* Search and items per page controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        <div className="flex items-center gap-2">
          <span>Show:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("name")}
              >
                Venue Name{" "}
                {sortConfig?.key === "name" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("county")}
              >
                County{" "}
                {sortConfig?.key === "county" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("subCounty")}
              >
                Sub-County{" "}
                {sortConfig?.key === "subCounty" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("capacity")}
              >
                Capacity{" "}
                {sortConfig?.key === "capacity" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVenues.slice(0, itemsPerPage).map((venue) => (
              <TableRow key={venue._id}>
                <TableCell className="font-medium">{venue.name}</TableCell>
                <TableCell>{venue.county}</TableCell>
                <TableCell>{venue.subCounty || "-"}</TableCell>
                <TableCell>{venue.capacity.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    className="text-white"
                    size="sm"
                    onClick={() => handleViewMore(venue)}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination info */}
      <div className="text-sm text-gray-500">
        Showing {Math.min(itemsPerPage, filteredVenues.length)} of{" "}
        {filteredVenues.length} venues
      </div>

      {/* Venue Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Venue Details</DialogTitle>
          </DialogHeader>
          {selectedVenue && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p>{selectedVenue.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">County</h4>
                  <p>{selectedVenue.county}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Sub-County
                  </h4>
                  <p>{selectedVenue.subCounty || "-"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Area</h4>
                  <p>{selectedVenue.area || "-"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Capacity
                  </h4>
                  <p>{selectedVenue.capacity.toLocaleString()}</p>
                </div>
                {selectedVenue.mapLink && (
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">
                      Map Link
                    </h4>
                    <a
                      href={selectedVenue.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on Map
                    </a>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button className="text-white" onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Venues;
