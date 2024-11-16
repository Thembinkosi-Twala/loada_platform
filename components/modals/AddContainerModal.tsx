import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Import the Modal component
import { useForm } from "react-hook-form"; // Assuming you're using react-hook-form

// Function to generate a unique container number
function generateContainerNumber() {
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `C-LOADA-${randomSuffix}`; // Format the container number
}

// Predefined status options
const statusOptions = [
    "Available",
    "In Transit",
    "Delivered",
    "Stored",
    "In Clearance",
    "Damaged",
    "Awaiting Pickup",
    "Returned",
];

const containerTypes = [
    "General Cargo",
    "Bulk Cargo",
    "Tanker Cargo",
    "Ro-Ro Cargo",
    "Containerized Cargo",
    "Liquid Bulk Cargo",
    "Dry Bulk Cargo",
    "Livestock Cargo"
];

// Define the structure for container data
interface ContainerData {
    id: "";
    containerNumber: string;
    size: string; // Added size field
    type: string; // Added type field
    status: string; // Set default status
    location: string;
}

// Props interface for the modal component
interface AddContainerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddContainer: (newContainer: ContainerData) => void; // Accepts a new container of type ContainerData
}

const AddContainerModal: React.FC<AddContainerModalProps> = ({ isOpen, onClose, onAddContainer }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm<ContainerData>();

    useEffect(() => {
        // Generate a new container number when the modal opens
        if (isOpen) {
            const newContainerNumber = generateContainerNumber();
            setValue("containerNumber", newContainerNumber); // Set generated container number
            setValue("status", "Available"); // Set default status to "Available"
        }
    }, [isOpen, setValue]);

    const onSubmit = async (data: ContainerData) => {
        setIsLoading(true);
        // Call the onAddContainer prop to add the new container
        onAddContainer(data);
        reset(); // Clear form fields
        setIsLoading(false);
        onClose(); // Close the modal after submission
    };

    // Define footer content if needed
    const footerContent = <div>Adding Containers</div>;

    // Define body content (form fields), without the form tag
    const bodyContent = (
        <>
            <div className="mb-4">
                <label className="block text-gray-700">Container Number</label>
                <input
                    type="text"
                    {...register("containerNumber")}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Generated automatically"
                    readOnly // Container number is generated automatically
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Size</label>
                <input
                    type="text"
                    {...register("size", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter container size"
                />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
                {...register("type", { required: true })}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
            >
                <option value="" disabled>Select a container type</option>
                {containerTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
            <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                    {...register("status", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                >
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                    type="text"
                    {...register("location", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter location"
                />
            </div>
        </>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Add Container"
            actionLabel="Add Container"
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
            body={bodyContent}
        />
    );
};

export default AddContainerModal;
