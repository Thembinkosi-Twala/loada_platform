"use client";
import { User } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Container} from "@prisma/client";
import AddContainerModal from "@/components/modals/AddContainerModal";
import Link from "next/link";

interface ContainerManagementProps {
    currentUser: User | null;
}

const ContainerManagement: FC<ContainerManagementProps> = ({ currentUser }) => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [isAddContainerModalOpen, setIsAddContainerModalOpen] = useState(false);

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

    const handleAddContainer = (newContainer: Container) => {
        // Update containers state to include the new container
        setContainers((prevContainers) => [...prevContainers, newContainer]);
    };

    const handleEditContainer = (container: Container) => {
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
                setContainers((prevContainers) => prevContainers.filter((container) => container.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete container:", error);
        }
    };

    const handleOpenModal = () => {
        setIsAddContainerModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddContainerModalOpen(false);
    };

    return (
        <div className="flex-grow p-4 mb-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Container Management</h1>
            <Link
                href="/"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Back
            </Link>
            &nbsp;
            {/* Button to open the modal */}
            <button
                onClick={handleOpenModal}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Add Container
            </button>
            &nbsp;
            {/* Button to open the modal */}
            <button
               
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Add Slots
            </button>


            {/* Add Container Modal */}
            <AddContainerModal
                isOpen={isAddContainerModalOpen}
                onClose={handleCloseModal}
                onAddContainer={handleAddContainer} // Pass the handler
            />

            <h2 className="text-lg font-medium mb-4">Current Containers</h2>

            {/* Check if containers exist */}
            {containers.length === 0 ? (
                <p>No containers found</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Container Number</th>
                            <th className="px-4 py-2 border border-gray-300">Status</th>
                            <th className="px-4 py-2 border border-gray-300">Location</th>
                            <th className="px-4 py-2 border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {containers.map((container) => (
                            <tr key={container.id} className="odd:bg-gray-100 even:bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300">{container.containerNumber}</td>
                                <td className="px-4 py-2 border border-gray-300">{container.status}</td>
                                <td className="px-4 py-2 border border-gray-300">{container.location}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => handleEditContainer(container)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
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
        </div>
    );
};

export default ContainerManagement;
