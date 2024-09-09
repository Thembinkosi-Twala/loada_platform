import React, { useState } from "react";

const ManageCargos = () => {
    const [cargoName, setCargoName] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [destination, setDestination] = useState("");

    const handleAddCargo = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Implement API call to add cargo
        // Example: await api.addCargo({ cargoName, description, weight, destination });
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Manage Cargos</h2>
            <form onSubmit={handleAddCargo}>
                <div className="mb-4">
                    <label className="block text-gray-700">Cargo Name</label>
                    <input
                        type="text"
                        value={cargoName}
                        onChange={(e) => setCargoName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Destination</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Add Cargo
                </button>
            </form>
        </div>
    );
};

export default ManageCargos;
