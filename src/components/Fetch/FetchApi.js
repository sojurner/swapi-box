import {
  filmScrape,
  peopleScrape,
  planetScrape,
  vehicleScrape
} from "../DataCleaner/DataCleaner";

export const FetchApi = async (type, page = "") => {
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
    case "films": {
      const films = await filmScrape(result);
      compiledData = films;
      break;
    }
    case "people": {
      const speciesResult = await fetch(result.species[0]);
      const species = await speciesResult.json();
      const homeworldResult = await fetch(result.homeworld);
      const homeworld = await homeworldResult.json();
      const peopleObj = await peopleScrape(result, species, homeworld);
      compiledData = peopleObj;
      break;
    }
    case "planets": {
      const residents = result.residents.map(async residentUrl => {
        const resident = await fetchResidents(residentUrl);
        return resident.name;
      });
      const resolvedResidents = await Promise.all(residents);
      const planetObj = await planetScrape(result, resolvedResidents);
      compiledData = planetObj;
      break;
    }
    case "vehicles": {
      const vehicleObj = await vehicleScrape(result);
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
