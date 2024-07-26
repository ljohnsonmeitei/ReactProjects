import React, { useEffect, useState } from 'react';
import { getRestaurants, deleteRestaurant, updateRestaurant } from '../services/restaurantService';
import EditRestaurant from './EditRestaurant';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    await deleteRestaurant(id);
    setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
  };

  const handleEditClick = (restaurant) => {
    setEditingRestaurant(restaurant);
  };

  const handleUpdate = async (updatedRestaurant) => {
    const data = await updateRestaurant(updatedRestaurant._id, updatedRestaurant);
    setRestaurants(restaurants.map((restaurant) => (restaurant._id === data._id ? data : restaurant)));
    setEditingRestaurant(null);
  };

  return (
    <div>
      <h2>Restaurant List</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            {editingRestaurant && editingRestaurant._id === restaurant._id ? (
              <EditRestaurant
                restaurant={editingRestaurant}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                {restaurant.name} - {restaurant.location} - {restaurant.cuisine} - {restaurant.rating}
                <button onClick={() => handleEditClick(restaurant)}>Edit</button>
                <button onClick={() => handleDelete(restaurant._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;