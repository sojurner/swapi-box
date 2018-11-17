import * as clean from '../data_cleaner/dataCleaner';

export const FetchApi = async (type, page = '') => {
  const newPage = page;
  const url = `https://swapi.co/api/${type}/?page=${newPage}`;
  const response = await fetch(url);
  const fetchResponse = await response.json();
  const { results } = fetchResponse;

  const dataResults = results.map(result => {
    return fetchSpecific(type, result);
  });
  return await Promise.all(dataResults);
};

export const fetchSpecific = async (type, result) => {
  let compiledData;
  switch (type) {
    case 'films': {
      const films = await clean.filmScrape(result);
      compiledData = films;
      break;
    }
    case 'people': {
      const speciesResult = await fetch(result.species[0]);
      const species = await speciesResult.json();
      const homeworldResult = await fetch(result.homeworld);
      const homeworld = await homeworldResult.json();
      const peopleObj = await clean.peopleScrape(result, species, homeworld);
      compiledData = peopleObj;
      break;
    }
    case 'planets': {
      const residents = result.residents.map(async residentUrl => {
        const resident = await fetchResidents(residentUrl);
        return resident.name;
      });
      const resolvedResidents = await Promise.all(residents);
      const planetObj = await clean.planetScrape(result, resolvedResidents);
      compiledData = planetObj;
      break;
    }
    case 'vehicles': {
      const vehicleObj = await clean.vehicleScrape(result);
      compiledData = vehicleObj;
      break;
    }
    default: {
      return undefined;
    }
  }
  return compiledData;
};

export const fetchResidents = async url => {
  const response = await fetch(url);
  const resident = await response.json();
  return resident;
};

export const fetchDetails = async (url, detail) => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};
