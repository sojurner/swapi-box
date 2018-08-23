import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { NavBar } from "./NavBar.js";
import { ContentRoute } from "./ContentRoute.js";

describe("NavBar", () => {
  let navWrapper;
  let getData;
  let activeButton;
  let favorites;

  beforeEach(() => {
    getData = jest.fn();
    activeButton = "people";
    favorites = [];
    navWrapper = shallow(
      <NavBar
        getData={getData}
        activeButton={activeButton}
        favorites={favorites}
      />
    );
  });

  it("should match snapshot when activeButton is people", () => {
    expect(navWrapper).toMatchSnapshot();
  });
  it("should match snapshot when activeButton is planets", () => {
    activeButton = "planets";
    navWrapper = shallow(
      <NavBar
        getData={getData}
        activeButton={activeButton}
        favorites={favorites}
      />
    );
    expect(navWrapper).toMatchSnapshot();
  });

  it("should match snapshot when activeButton is vehicles", () => {
    activeButton = "vehicles";
    navWrapper = shallow(
      <NavBar
        getData={getData}
        activeButton={activeButton}
        favorites={favorites}
      />
    );
    expect(navWrapper).toMatchSnapshot();
  });

  it("should match snapshot when activeButton is favorites", () => {
    activeButton = "favorites";
    navWrapper = shallow(
      <NavBar
        getData={getData}
        activeButton={activeButton}
        favorites={favorites}
      />
    );
    expect(navWrapper).toMatchSnapshot();
  });

  it("should call getData on click", () => {
    activeButton = "people";
    const mockGetData = jest.fn();
    navWrapper = shallow(
      <NavBar
        getData={mockGetData}
        activeButton={activeButton}
        favorites={favorites}
      />
    );

    navWrapper
      .find("NavLink")
      .first()
      .simulate("click");
    expect(mockGetData).toHaveBeenCalled();
  });
});
describe("ContentRoute", () => {
  let contentWrapper;
  let toggleFavorites;
  let people;
  let planets;
  let vehicles;
  let favorites;
  let handlePage;

  beforeEach(() => {
    toggleFavorites = jest.fn();
    people = [];
    planets = [];
    vehicles = [];
    favorites = [];
    handlePage = jest.fn();
    contentWrapper = shallow(
      <ContentRoute
        toggleFavorites={toggleFavorites}
        people={people}
        planets={planets}
        vehicles={vehicles}
        favorites={favorites}
        handlePage={handlePage}
      />
    );
  });

  it("should match snapshot without data object passed", () => {
    expect(contentWrapper).toMatchSnapshot();
  });

  it("should match snapshot with data object passed", () => {
    expect(contentWrapper).toMatchSnapshot();
  });
});
