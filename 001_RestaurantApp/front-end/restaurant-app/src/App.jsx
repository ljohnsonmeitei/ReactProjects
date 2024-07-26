import React, { useState } from 'react';
import AddRestaurant from './components/AddRestaurant';
import RestaurantList from './components/RestaturantList';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  const handleAdd = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
  };

  return (
    <div>
      <h1>Restaurant Management</h1>
      <AddRestaurant onAdd={handleAdd} />
      <RestaurantList restaurants={restaurants} setRestaurants={setRestaurants} />
    </div>
  );
};


export default App;