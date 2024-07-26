import React, { useState } from 'react';
import { addRestaurant } from '../services/restaurantService';

const AddRestaurant = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRestaurant = { name, location, cuisine, rating: Number(rating) };
    const addedRestaurant = await addRestaurant(newRestaurant);
    onAdd(addedRestaurant);
    setName('');
    setLocation('');
    setCuisine('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="text" placeholder="Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />
      <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default AddRestaurant;