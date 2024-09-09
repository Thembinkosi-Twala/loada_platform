"use client"
import React from 'react';
import button from '@/components/Button';

const HelpdeskButton = () => {
    // Function to dial the helpdesk
    const dialHelpdesk = () => {
        window.location.href = 'tel:+123456789'; // Replace with actual LOADA number
    };

    return (
        <button onClick={dialHelpdesk} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Contact Helpdesk
        </button>
    );
};

export default HelpdeskButton;
