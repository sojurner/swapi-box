import React from "react";

import { ContentCard } from "./index";

describe("ContentCard", () => {
  let wrapper;
  let mockPersonData;
  let mockPlanetData;
  let mockVehicleData;
  let mockToggleFavorites;

  beforeEach(() => {
    mockPersonData = {
      name: "Luke Skywalker",
      species: "Human",
      homeworld: "Tatooine",
      population: "200000",
      favorite: false
    };

    mockPlanetData = {
      climate: "temperate",
      favorite: false,
      name: "Alderaan",
      populaton: "2000000000",
      residents: ["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"],
      terrain: "grasslands, mountains"
    };

    mockVehicleData = {
      name: "Sand Crawler",
      model: "Digger Crawler",
      class: "wheeled",
      'number of passengers': "30",
      favorite: false
    };

    mockToggleFavorites = jest.fn();

    wrapper = shallow(
      <ContentCard
        key={0}
        card={mockPersonData}
        toggleFavorites={mockToggleFavorites}
      />
    );
  });

  it("should match snapshot with people data object passed", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with planet data object passed", () => {
    wrapper = shallow(
      <ContentCard
        key={0}
        card={mockPlanetData}
        toggleFavorites={mockToggleFavorites}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with vehicle data object passed", () => {
    wrapper = shallow(
      <ContentCard
        key={0}
        card={mockVehicleData}
        toggleFavorites={mockToggleFavorites}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with Person favorite status true", () => {
    mockPersonData = {
      name: "Luke Skywalker",
      species: "Human",
      homeworld: "Tatooine",
      population: "200000",
      favorite: true
    };
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with Person favorite status true", () => {
    mockPlanetData = {
      climate: "temperate",
      favorite: true,
      name: "Alderaan",
      populaton: "2000000000",
      residents: ["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"],
      terrain: "grasslands, mountains"
    };

    wrapper = shallow(
      <ContentCard
        key={0}
        card={mockPlanetData}
        toggleFavorites={mockToggleFavorites}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with Person favorite status true", () => {
    mockVehicleData = {
      name: "Sand Crawler",
      model: "Digger Crawler",
      class: "wheeled",
      'number of passengers': "30",
      favorite: true
    };

    wrapper = shallow(
      <ContentCard
        key={0}
        card={mockVehicleData}
        toggleFavorites={mockToggleFavorites}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call toggleFavorites on click", () => {
    mockToggleFavorites = jest.fn();
    wrapper = shallow(
      <ContentCard
        toggleFavorites={mockToggleFavorites}
        card={mockPersonData}
        key={"0"}
      />
    );
    wrapper.find("button").simulate("click");
    expect(mockToggleFavorites).toHaveBeenCalled();
  });
});
