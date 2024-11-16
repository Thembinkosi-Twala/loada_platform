import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Import the Modal component
import { useForm } from "react-hook-form"; // Assuming you're using react-hook-form

// Define the structure for truck data
interface TruckData {
    id: string; // Added id field for truck
    license: string;
    make: string;
    model: string;
    year: number;
    status: string;
    tracker: string;// Added status field
}

// Props interface for the modal component
interface AddTruckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTruck: (newTruck: TruckData) => void; // Accepts a new truck of type TruckData
}

const AddTruckModal: React.FC<AddTruckModalProps> = ({ isOpen, onClose, onAddTruck }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm<TruckData>();

    useEffect(() => {
        // Reset form when modal opens
        if (isOpen) {
            reset(); // Clear form fields
            // You can set default values if needed
        }
    }, [isOpen, reset]);

    const onSubmit = async (data: TruckData) => {
        setIsLoading(true);
        // Call the onAddTruck prop to add the new truck
        onAddTruck({ ...data, id: Date.now().toString(), status: "Available" }); // Assign a unique id and default status
        reset(); // Clear form fields
        setIsLoading(false);
        onClose(); // Close the modal after submission
    };

    // Define footer content if needed
    const footerContent = <div>Adding Trucks</div>;

    // Define body content (form fields)
    const bodyContent = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700">License Plate</label>
                <input
                    type="text"
                    {...register("license", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter license plate"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Make</label>
                <input
                    type="text"
                    {...register("make", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter truck make"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Model</label>
                <input
                    type="text"
                    {...register("model", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter truck model"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Year</label>
                <input
                    type="number"
                    {...register("year", { required: true, valueAsNumber: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter year"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tracker</label>
                <input
                    type="text"
                    {...register("tracker", { required: true })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter tracker ID"
                />
            </div>
        </form>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Add Truck"
            actionLabel="Add Truck"
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
            body={bodyContent}
        />
    );
};

export default AddTruckModal;
