import React, { useState } from 'react';
import { updateRestaurant } from '../services/restaurantService';
import './CSS/EditRestaurant.css'; // Import the CSS file

const EditRestaurant = ({ restaurant, onUpdate }) => {
  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [cuisine, setCuisine] = useState(restaurant.cuisine);
  const [rating, setRating] = useState(restaurant.rating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = { ...restaurant, name, location, cuisine, rating: Number(rating) };
    const data = await updateRestaurant(restaurant._id, updatedRestaurant);
    onUpdate(data);
  };

  return (
    <form className="edit-restaurant-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          placeholder="Cuisine" 
          value={cuisine} 
          onChange={(e) => setCuisine(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="number" 
          placeholder="Rating" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Update Restaurant</button>
    </form>
  );
};

export default EditRestaurant;
