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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVenues.slice(0, itemsPerPage).map((venue) => (
              <TableRow key={venue._id}>
                <TableCell className="font-medium">{venue.name}</TableCell>
                <TableCell>{venue.county}</TableCell>
                <TableCell>{venue.subCounty || "-"}</TableCell>
                <TableCell>{venue.capacity.toLocaleString()}</TableCell>
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
    </div>
  );
};

export default Venues;
