import { FC, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Container, User } from "@prisma/client";
import ContainerForm from "@/components/ContainerForm";
import RootLayout from '@/app/layout';
import Navbar from "@/components/navbar/Navbar";

interface ContainerManagementProps {
    currentUser: User | null;
    className: '';
    children: '';
}
const ContainerManagement: FC<ContainerManagementProps> = ({ currentUser }) => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [newContainerName, setNewContainerName] = useState("");
    const [newContainerStatus, setNewContainerStatus] = useState("");
    const [availableSlots, setAvailableSlots] = useState([
        "Slot 1",
        "Slot 2",
        "Slot 3",
    ]);
    const [newSlot, setNewSlot] = useState("");

    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const response = await fetch("/api/getContainers");
                const data = await response.json();
                setContainers(data);
            } catch (error) {
                console.error("Failed to fetch containers:", error);
            }
        };

        fetchContainers();
    }, []);

    const handleAddContainer = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/Containers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    containerNumber: newContainerName,
                    status: newContainerStatus,
                    location: newSlot,
                }),
            });
            const data = await response.json();
            setContainers([...containers, data]);
            setNewContainerName("");
            setNewContainerStatus("");
            setNewSlot("");
        } catch (error) {
            console.error("Failed to add container:", error);
        }
    };
    const handleEditContainer = (container: { id: string; containerNumber: string; size: string; type: string; status: string; location: string; }) => {
        // Navigate to edit page or open edit modal with container data
        console.log("Edit container:", container);
    };

    const handleDeleteContainer = async (id: string) => {
        try {
            const response = await fetch(`/api/containers/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Update containers state to reflect deletion
                setContainers(containers.filter((container) => container.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete container:", error);
        }
    };
    return (
        <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-2">Container Management</h1>
                <ContainerForm />
                <h2 className="text-lg font-medium">Current Containers</h2>
                {containers.length === 0 ? (
                    <p>No containers found</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-slate-400">
                        <thead>
                            <tr className="bg-slate-200">
                                <th className="px-4 py-2 border border-slate-300">
                                    Container Number
                                </th>
                                <th className="px-4 py-2 border border-slate-300">Status</th>
                                <th className="px-4 py-2 border border-slate-300">Location</th>
                                <th className="px-4 py-2 border border-slate-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((container) => (
                                <tr
                                    key={container.id}
                                    className="odd:bg-slate-100 even:bg-slate-50"
                                >
                                    <td className="px-4 py-2 border border-slate-300">
                                        {container.containerNumber}
                                    </td>
                                    <td className="px-4 py-2 border border-slate-300">
                                        {container.status}
                                    </td>
                                    <td className="px-4 py-2 border border-slate-300">
                                        {container.location}
                                    </td>
                                    <td className="px-4 py-2 border border-slate-300">
                                        <button
                                            onClick={() => handleEditContainer(container)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteContainer(container.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <style jsx>
                    {`
table {
width: 100%;
border-collapse: collapse;
}
th,
td {
border: 1px solid #ddd;
padding: 8px;
}
th {
background-color: #f2f2f2;
text-align: left;
}
tr:nth-child(even) {
background-color: #f9f9f9;
}
tr:hover {
background-color: #f1f1f1;
}
form {
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
}
label {
margin-bottom: 10px;
}
input,
select {
margin-bottom: 20px;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
}
button {
padding: 10px 20px;
border: none;
border-radius: 5px;
background-color: #4caf50;
color: #fff;
cursor: pointer;
}
button:hover {
background-color: #3e8e41;
}
`}
                </style>
            </div>

    );
};

export default ContainerManagement;