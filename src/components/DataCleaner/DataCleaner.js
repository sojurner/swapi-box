export const filmScrape = film => {
  const modifiedObj = {
    title: film.title,
    openingCrawl: film.opening_crawl,
    episode: film.episode_id,
    releaseDate: film.release_date
  };
  return modifiedObj;
};

export const peopleScrape = (result, species, homeworld) => {
  const modifiedObj = {
    name: result.name,
    species: species.name,
    homeworld: homeworld.name,
    population: homeworld.population
  };
  return modifiedObj;
};

export const planetScrape = (result, residents) => {
  const modifiedObj = {
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
    name: vehicle.name,
    model: vehicle.model,
    class: vehicle.vehicle_class,
    'number of passengers': vehicle.passengers
  };
  return modifiedObj;
};
