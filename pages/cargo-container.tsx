import React, { FC } from 'react';
import Cargo from '@/components/listings/CargoContainer';
import { getCurrentUser } from "@/actions/getCurrentUser";
import { User } from 'next-auth';

interface CargoContainerProps {
    currentUser: User | null;
}
const CargoContainer: FC<CargoContainerProps> = ({ }) => {
    
    return (
        <div>
            <Cargo/>
        </div>
    );
};

export default CargoContainer;