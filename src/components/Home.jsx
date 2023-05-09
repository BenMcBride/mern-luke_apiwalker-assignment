import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => { 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const category = e.target.select.value;
    const id = e.target.id.value;
    navigate(`/${category}/${id}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="select">Search for:</label>
      <select name="select" id="select">
        <option value="people">People</option>
        <option value="planets">Planets</option>
        <option value="starships">Starships</option>
      </select>
      <label htmlFor="id">ID:</label>
      <input type="number" name="id" id="id" />
      <button type='submit'>Search</button>
    </form>
  );
}

export default Home