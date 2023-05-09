import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router'
import axios from 'axios'
import img from './obi-wan-kenobi-these-are-not-the-droids.gif'

const Info = (props) => {
  const { category, id } = useParams()
  const [ info, setInfo ] = useState({})
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [homeworld, setHomeworld] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const category = e.target.select.value;
    const id = e.target.id.value;
    setError(null)
    navigate(`/${category}/${id}`);
  }

  const getInfo = async (category, id) => {
    let allInfo = {}
    try {
      const response = await axios.get(`https://swapi.dev/api/${category}/${id}`)
      allInfo = response.data;
      setInfo(allInfo)
      setIsLoading(false)
    } catch (error) {
      setError(error.message);
      setIsLoading(false)
    }
  }

  const getHomeworld = async (url) => {
    try {
      const response = await axios.get(url)
      setHomeworld(response.data.name)
    } catch (error) {
      setError(error.message);
    }
  }

  const homeworldURL = (url) => {
    if (url) {
      const path = url.replace('https://swapi.dev/api/', ''); // take out the api website's part of the URL
      const [category, id] = path.split('/'); // take the slashes out of the URL
      return `/${category === 'planets' ? category : 'people'}/${id}/`; // replace URL to be /planets/1/ instead of /people/planets/1/
    } else {
      return 'N/A'
    }
  }

  useEffect(() => {
    if (info.homeworld) {
      getHomeworld(info.homeworld)
    }
  }, [info.homeworld])

  useEffect(() => {
    getInfo(category, id)
    }, [category, id])

  return (
    <div>
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
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <>
        <p>{error}</p>
        <img src={img} alt="These aren't the droids you're looking for" />
        </>
      ) : category === 'people' ? (
        <table className='table'>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{info.name}</td>
            </tr>
            <tr>
              <th>Height:</th>
              <td>{info.height}</td>
            </tr>
            <tr>
              <th>Mass:</th>
              <td>{info.mass}</td>
            </tr>
            <tr>
              <th>Hair color:</th>
              <td>{info.hair_color}</td>
            </tr>
            <tr>
              <th>Skin color:</th>
              <td>{info.skin_color}</td>
            </tr>
            <tr>
              <th>Eye color:</th>
              <td>{info.eye_color}</td>
            </tr>
            <tr>
              <th>Birth year:</th>
              <td>{info.birth_year}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{info.gender}</td>
            </tr>
            <tr>
              <th>Homeworld:</th>
              <td>{isLoading ? 'Loading...' : error ? 'Error fetching homeworld' : <a href={homeworldURL(info.homeworld)}>{homeworld}</a> }</td>
            </tr>
          </tbody>
        </table>
      ) : category === 'planets' ? (
        <table className='table'>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{info.name}</td>
            </tr>
            <tr>
              <th>Rotation period:</th>
              <td>{info.rotation_period}</td>
            </tr>
            <tr>
              <th>Orbital Period:</th>
              <td>{info.orbital_period}</td>
            </tr>
            <tr>
              <th>Diameter:</th>
              <td>{info.diameter}</td>
            </tr>
            <tr>
              <th>Climate:</th>
              <td>{info.climate}</td>
            </tr>
            <tr>
              <th>Gravity:</th>
              <td>{info.gravity}</td>
            </tr>
            <tr>
              <th>Terrain:</th>
              <td>{info.terrain}</td>
            </tr>
            <tr>
              <th>Surface Water:</th>
              <td>{info.surface_water}</td>
            </tr>
            <tr>
              <th>Population:</th>
              <td>{info.population}</td>
            </tr>
          </tbody>
        </table>
      ) : category === 'starships' ? (
        <table className='table'>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{info.name}</td>
            </tr>
            <tr>
              <th>Model:</th>
              <td>{info.model}</td>
            </tr>
            <tr>
              <th>Manufacturer:</th>
              <td>{info.manufacturer}</td>
            </tr>
            <tr>
              <th>Cost in Credits:</th>
              <td>{info.cost_in_credits}</td>
            </tr>
            <tr>
              <th>Length:</th>
              <td>{info.length}</td>
            </tr>
            <tr>
              <th>Max Atmosphering Speed</th>
              <td>{info.max_atmosphering_speed}</td>
            </tr>
            <tr>
              <th>Cargo Capacity:</th>
              <td>{info.cargo_capacity}</td>
            </tr>
            <tr>
              <th>Consumables:</th>
              <td>{info.consumables}</td>
            </tr>
            <tr>
              <th>Hyperdrive Rating:</th>
              <td>{info.hyperdrive_rating}</td>
            </tr>
            <tr>
              <th>MGLT:</th>
              <td>{info.MGLT}</td>
            </tr>
            <tr>
              <th>Starship Class:</th>
              <td>{info.starship_class}</td>
            </tr>
          </tbody>
        </table>
      ) : '' }
    </div>
  )
}
export default Info