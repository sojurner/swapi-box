import { FetchApi, fetchSpecific, fetchResidents } from './apiCalls';
import {
  mockPeople,
  mockResultPlanet,
  mockResultVehicle,
  mockResultsPerson,
  mockResultResident,
  mockResultFilm
} from '../../MockData/MockData';

describe('FetchApi', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPeople)
      });
    });
  });

  it('should call fetch with the correct params', async () => {
    const expected = ['https://swapi.co/api/people/?page='];
    await FetchApi('people', '');
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('returns an array if the response is okay', async () => {
    const initialFetch = await FetchApi('people', '');
    const expectedLength = Object.keys(mockPeople.results).length;
    expect(initialFetch.length).toEqual(expectedLength);
  });

  it('throws an error if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('failed'));
    });
    let expected = new Error('failed');

    await expect(FetchApi('stuff', '')).rejects.toEqual(expected);
  });

  describe('fetchSpecific', () => {
    it('returns a person object people when provided person type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('people', mockResultsPerson);
      const expectedObjectPromise = {
        name: 'Luke Skywalker',
        species: undefined,
        homeworld: undefined,
        population: undefined
      };
      expect(initialFetch).toEqual(expectedObjectPromise);
    });

    it('returns a planet object people when provided planet type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('planets', mockResultPlanet);

      const expectedObjectPromise = {
        name: 'Alderaan',
        populaton: '2000000000',
        terrain: 'grasslands, mountains',
        climate: 'temperate',
        residents: `, , `
      };
      expect(initialFetch).toEqual(expectedObjectPromise);
    });

    it('returns a vehicle object people when provided vehicle type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('vehicles', mockResultVehicle);
      const expectedObjectPromise = {
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        class: 'wheeled',
        'number of passengers': '30'
      };

      expect(initialFetch).toEqual(expectedObjectPromise);
    });

    it('returns a film object people when provided film type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('films', mockResultFilm);
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockResultFilm)
        });
      });

      const expectedFilmPromise = {
        title: 'A New Hope',
        openingCrawl: 'It is a period of civil war.',
        episode: 4,
        releaseDate: '1977-05-25'
      };
      expect(initialFetch).toEqual(expectedFilmPromise);
    });

    it('returns undefined if given an invalid type', async () => {
      let expected = await Promise.resolve(fetchSpecific('stuff', {}));
      expect(expected).toEqual(undefined);
    });
  });

  describe('fetchResidents', () => {
    it('should take a url and fetch residents array', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockResultResident)
        });
      });
      const initialFetch = await fetchResidents(
        'https://swapi.co/api/people/5/'
      );
      expect(initialFetch).toEqual(mockResultResident);
    });
  });
});
