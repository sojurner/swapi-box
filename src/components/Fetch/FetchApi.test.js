import { FetchApi, fetchSpecific, fetchResidents } from './FetchApi.js'
import { mockPeople, mockResultPlanet, mockResultVehicle, mockResultsPerson, mockResultResident } from "../../MockData/MockData";

describe('FetchApi', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPeople)
      })
    })
  })

  it('should call fetch with the correct params', async () => {
    const expected = [
      'https://swapi.co/api/people/?page='
    ]
    await FetchApi('people', '');
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  });

  it('returns an array if the response is okay', async () => {
    const initialFetch = await FetchApi('people', '');
    const expectedLength = Object.keys(mockPeople.results).length;
    expect(initialFetch.length).toEqual(expectedLength);
  });

  it('throws an error if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('failed'))
    })
    let expected = new Error('failed')

    await expect(FetchApi('people', '')).rejects.toEqual(expected)
  });

  describe('fetchSpecific', () => {
    it('returns a person object people when provided person type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('people', mockResultsPerson);
      const expectedObjectPromise = { 
        name: 'Luke Skywalker',
        species: undefined,
        homeworld: undefined,
        population: undefined 
      }
      expect(initialFetch).toEqual(expectedObjectPromise);
    });

    it('returns a planet object people when provided planet type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('planets', mockResultPlanet);
      const expectedObjectPromise = {
        name: 'Alderaan',
        populaton: '2000000000',
        terrain: 'grasslands, mountains',
        climate: 'temperate',
        residents: [ undefined, undefined, undefined ] 
      }
      expect(initialFetch).toEqual(expectedObjectPromise);
    });

    it('returns a vehicle object people when provided vehicle type and result from fetch', async () => {
      const initialFetch = await fetchSpecific('vehicles', mockResultVehicle);
      const expectedObjectPromise = { 
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        class: 'wheeled',
        numberof_passengers: '30' 
      }

      expect(initialFetch).toEqual(expectedObjectPromise);
    });
  });
  describe('fetchResidents', () => {
    it('should take a url and fetch residents array', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockResultResident)
        })
      })
      const initialFetch = await fetchResidents('https://swapi.co/api/people/5/');
      expect(initialFetch).toEqual(mockResultResident);
    });
  })
})