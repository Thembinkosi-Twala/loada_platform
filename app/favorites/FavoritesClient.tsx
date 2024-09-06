import React from 'react'

import ListingCard from '@/components/listings/ListingCard'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import { User, Booking } from '@prisma/client'

interface FavoritesClientProps {
  listings: Booking[];
  currentUser?: User | null;
}


const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
      />
      <div
        className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4"
      >
    
      </div>
    </Container>
  )
}

export default FavoritesClient