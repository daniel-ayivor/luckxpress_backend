import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../Dasboard/DashboardSidebar";
import { Navbar } from "../Dasboard/Navbar";
import { Card } from "../Dasboard/Card";
import { UserDataTable } from "./UserDataTable";
import moment from "moment";

type UserType = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

const tableColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
];

const Register = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isSubmitting, setSubmitting] = useState(false);

    const fetchUsers = async () => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                toast.error("No access token found. Please login again.");
                return;
            }

            const response = await fetch(`http://localhost:5000/auth/getAllUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Users retrieved successfully!");
                setUsers(
                    result.user.map((user: UserType) => ({
                        ...user,
                        createdAt: moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
                        updatedAt: moment(user.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
                    }))
                );
            } else {
                toast.error(result.message || "Failed to retrieve users.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    const deleteUser = async (userId: string) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("access_token");
            console.log(token, 'user token')
            if (!token) {
                toast.error("No access token found. Please login again.");
                return;
            }

            const response = await fetch(`http://localhost:5000/auth/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success("User deleted successfully!");
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            } else {
                const result = await response.json();
                toast.error(result.message || "Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <DashboardSidebar />
                <div className="flex-1">
                    <Navbar />
                    <main className="container space-y-6 p-6">
                        <Card className="p-6">
                            <h2 className="mb-4 text-lg font-semibold">Recent Users</h2>
                            <UserDataTable
                                data={users}
                                columns={tableColumns}
                                onDelete={(item) => deleteUser(item?.id)} // Explicit await
                            />

                        </Card>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Register;
