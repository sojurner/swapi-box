import React from "react";
import {
  mockPeople,
  mockSpecies,
  mockResultVehicle,
  mockResultFilm,
  mockHomeWorld,
  mockPlanets
} from "../../MockData/MockData";

import {
  filmScrape,
  peopleScrape,
  planetScrape,
  vehicleScrape
} from "./DataCleaner";

describe("DataCleaner", () => {
  let mockResultData;

  it("should clean film data into scraped object", () => {
    mockResultData = mockResultFilm;
    const expectedResult = {
      title: "A New Hope",
      openingCrawl: "It is a period of civil war.",
      episode: 4,
      releaseDate: "1977-05-25"
    };
    let modifiedFilmScrape = filmScrape(mockResultData);
    expect(modifiedFilmScrape).toEqual(expectedResult);
  });

  it("should clean people data into scraped people object", () => {
    mockResultData = mockPeople;

    const expectedResult = {
      homeworld: undefined,
      name: undefined,
      population: undefined,
      species: undefined
    };
    let modifiedPeopleObject = peopleScrape(
      mockResultData,
      mockSpecies,
      mockHomeWorld
    );
    expect(modifiedPeopleObject).toEqual(expectedResult);
  });

  it("should clean planet data into scraped planet object", async () => {
    mockResultData = mockPlanets;
    const mockResidents = [["Anakin Skywalker"],["Luke Skywalker"]];
    const expected = {
      climate: undefined,
      name: undefined,
      populaton: undefined,
      residents: `Anakin Skywalker, Luke Skywalker`,
      terrain: undefined
    };
    const modifiedPlanetObject = planetScrape(mockResultData, mockResidents);
    expect(modifiedPlanetObject).toEqual(expected);
  });

  it("should clean vehicle data into scraped vehicle object", () => {
    mockResultData = mockResultVehicle;
    const expected = {
      class: "wheeled",
      model: "Digger Crawler",
      name: "Sand Crawler",
      'number of passengers': "30"
    };
    const modifiedVehicleObject = vehicleScrape(mockResultData);
    expect(modifiedVehicleObject).toEqual(expected);
  });
});
