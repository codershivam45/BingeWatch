'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const sampleActors = [
  {
    id: 1,
    name: 'Robert Downey Jr.',
    profile_path: 'robert_downey_jr.jpg',
  },
  {
    id: 2,
    name: 'Scarlett Johansson',
    profile_path: 'scarlett_johansson.jpg',
  },
  {
    id: 3,
    name: 'Chris Hemsworth',
    profile_path: 'chris_hemsworth.jpg',
  },
  {
    id: 4,
    name: 'Jennifer Lawrence',
    profile_path: 'jennifer_lawrence.jpg',
  },
  {
    id: 5,
    name: 'Tom Hanks',
    profile_path: 'tom_hanks.jpg',
  },
];

const Page = () => {
  const [actors, setActors] = useState(sampleActors);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch popular actors data
    const fetchActors = async () => {
      const response = await fetch('/api/actors/popular'); // Example API endpoint
      const data = await response.json();
      setActors(data.results);
    };
    fetchActors();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Popular Actors</h1>

        {/* Search Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search actors..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredActors.map((actor) => (
            <div key={actor.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Image
                src={`/images/${actor.profile_path}`}
                alt={actor.name}
                width={200}
                height={300}
                className="rounded-lg object-cover"
              />
              <h2 className="mt-2 text-lg font-semibold">{actor.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
