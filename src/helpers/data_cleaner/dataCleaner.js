export const filmScrape = film => {
  const modifiedObj = {
    data: 'films',
    title: film.title,
    openingCrawl: film.opening_crawl,
    episode: film.episode_id,
    releaseDate: film.release_date,
    details: {
      characters: film.characters,
      planets: film.planets,
      starships: film.starships,
      vehicles: film.vehicles,
      species: film.species
    }
  };
  return modifiedObj;
};

export const peopleScrape = (result, species, homeworld) => {
  const modifiedObj = {
    data: 'characters',
    name: result.name,
    species: species.name,
    homeworld: homeworld.name,
    population: homeworld.population
  };
  return modifiedObj;
};

export const planetScrape = (result, residents) => {
  const modifiedObj = {
    data: 'planets',
    name: result.name,
    populaton: result.population,
    terrain: result.terrain,
    climate: result.climate,
    residents: residents.join(', ')
  };
  return modifiedObj;
};

export const vehicleScrape = vehicle => {
  const modifiedObj = {
    data: 'vehicles',
    name: vehicle.name,
    model: vehicle.model,
    class: vehicle.vehicle_class,
    'number of passengers': vehicle.passengers
  };
  return modifiedObj;
};

export const characterScrape = data => {
  console.log(data);
  const { name, height, mass, gender } = data;

  const modifiedObj = {
    name,
    height,
    mass,
    gender,
    'eye color': data.eye_color,
    'skin color': data.skin_color
  };

  return modifiedObj;
};
