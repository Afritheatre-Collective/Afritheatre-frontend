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
  // State
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingData, setEditingData] = useState<Partial<User>>({});

  // Fetch users
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

  // Search
  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Sort
  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    )
      direction = "descending";

    setSortConfig({ key, direction });
    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sorted);
  };

  // Open dialog
  const openDialog = (user: User, edit = false) => {
    setSelectedUser(user);
    setIsEditMode(edit);
    setEditingData(edit ? user : {});
    setIsDialogOpen(true);
  };

  // Save edits
  const handleSave = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/users/${selectedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingData),
        }
      );
      if (res.ok) {
        const { user: updatedUser } = await res.json();
        const updatedList = users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
        setUsers(updatedList);
        setFilteredUsers(updatedList);
        setIsDialogOpen(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user
  const handleDelete = async (userId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/users/${userId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        const updated = users.filter((u) => u._id !== userId);
        setUsers(updated);
        setFilteredUsers(updated);
        setIsDialogOpen(false);
      } else console.error("Failed to delete user");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="p-4 space-y-4">
      {/* Search / items */}
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
            onValueChange={(v) => setItemsPerPage(Number(v))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Items" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50, 100].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {["name", "email", "phone"].map((key) => (
                <TableHead
                  key={key}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(key as keyof User)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  {sortConfig?.key === key &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
              ))}
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
                    onClick={() => openDialog(user, false)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-gray-500">
        Showing {Math.min(itemsPerPage, filteredUsers.length)} of{" "}
        {filteredUsers.length} users
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              {isEditMode ? (
                <>
                  {(["name", "email", "phone", "role"] as (keyof User)[]).map(
                    (field) => (
                      <div key={field}>
                        <h4 className="font-medium">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </h4>
                        <Input
                          value={editingData[field] as string}
                          onChange={(e) =>
                            setEditingData({
                              ...editingData,
                              [field]: e.target.value,
                            })
                          }
                        />
                      </div>
                    )
                  )}
                </>
              ) : (
                <>
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
                </>
              )}

              <div className="flex justify-end gap-2 pt-4">
                {isEditMode ? (
                  <Button className="text-white" onClick={handleSave}>
                    Save
                  </Button>
                ) : (
                  <Button
                    className="text-white"
                    onClick={() => openDialog(selectedUser, true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedUser._id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
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
