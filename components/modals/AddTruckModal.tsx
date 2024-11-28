import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { TruckStatus } from "@prisma/client";

interface TruckData {
  license: string;
  make: string;
  model: string;
  year: number;
  tracker: string;
  status: TruckStatus;
  companyId: string;
}

interface AddTruckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTruck: (newTruck: TruckData) => void;
  companyId: string;
}

const AddTruckModal: React.FC<AddTruckModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddTruck,
  companyId 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TruckData>({
    defaultValues: {
      status: TruckStatus.Available,
      companyId: companyId
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({ 
        status: TruckStatus.Available,
        companyId: companyId 
      });
    }
  }, [isOpen, reset, companyId]);

  const onSubmit = async (data: TruckData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/addtrucks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          year: Number(data.year), // Ensure year is a number
              // Ensure companyId is included
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to add truck");
      }
  
      const newTruck = await response.json();
      onAddTruck(newTruck);
      onClose();
      reset();
    } catch (error) {
      console.error("Error adding truck:", error);
      alert(error instanceof Error ? error.message : "Failed to add truck. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {["license", "make", "model", "tracker"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 capitalize">{field}</label>
          <input
            type="text"
            {...register(field as keyof TruckData, { 
              required: `${field} is required`
            })}
            className={`mt-2 block w-full px-4 py-2 border rounded ${
              errors[field as keyof TruckData] ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${field}`}
          />
          {errors[field as keyof TruckData] && (
            <span className="text-red-500 text-sm">
              {errors[field as keyof TruckData]?.message}
            </span>
          )}
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          {...register("status")}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded"
        >
          <option value={TruckStatus.Available}>Available</option>
          <option value={TruckStatus.In_Transit}>In Transit</option>
          <option value={TruckStatus.Loading}>Maintenance</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Year</label>
        <input
          type="number"
          {...register("year", { 
            required: "Year is required",
            min: { value: 1900, message: "Year must be 1900 or later" },
            max: { 
              value: new Date().getFullYear(), 
              message: "Year cannot be in the future" 
            },
            valueAsNumber: true
          })}
          className={`mt-2 block w-full px-4 py-2 border rounded ${
            errors.year ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter year"
        />
        {errors.year && (
          <span className="text-red-500 text-sm">{errors.year.message}</span>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Add Truck"
      actionLabel="Add Truck"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default AddTruckModal;