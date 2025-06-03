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

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

const AfriUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "ascending" | "descending";
  } | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/users");
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search function
  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Sort function
  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  const handleViewMore = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
        setIsDialogOpen(false);
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className=" p-4 space-y-4">
      {/* Search and items per page controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          type="text"
          placeholder="Search users..."
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
                Name{" "}
                {sortConfig?.key === "name" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("email")}
              >
                Email{" "}
                {sortConfig?.key === "email" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("phone")}
              >
                Phone{" "}
                {sortConfig?.key === "phone" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.slice(0, itemsPerPage).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    className="text-white"
                    size="sm"
                    onClick={() => handleViewMore(user)}
                  >
                    View more
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination info */}
      <div className="text-sm text-gray-500">
        Showing {Math.min(itemsPerPage, filteredUsers.length)} of{" "}
        {filteredUsers.length} users
      </div>

      {/* User Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Name</h4>
                <p>{selectedUser.name}</p>
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <h4 className="font-medium">Phone</h4>
                <p>{selectedUser.phone}</p>
              </div>
              <div>
                <h4 className="font-medium">Role</h4>
                <p>{selectedUser.role}</p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button className="text-white">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedUser._id)}
                >
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

export default AfriUsers;
