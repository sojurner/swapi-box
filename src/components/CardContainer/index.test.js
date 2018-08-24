import React from "react";

import { CardContainer } from "./index";

describe("CardContainer", () => {
  let wrapper;
  let mockData;
  let toggleFavorites;
  let savedFavorites;
  let handlePage;

  beforeEach(() => {
    mockData = [
      {
        name: "Luke Skywalker",
        species: "Human",
        homeworld: "Tatooine",
        population: "200000",
        favorite: false
      }
    ];
    toggleFavorites = jest.fn();
    savedFavorites = [];
    handlePage = jest.fn();

    wrapper = shallow(
      <CardContainer
        data={mockData}
        handlePage={handlePage}
        toggleFavorites={toggleFavorites}
        savedFavorites={savedFavorites}
        isFavorites={false}
      />
    );
  });

  it("should match snapshot with data object passed", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot without data object passed", () => {
    mockData = null;
    wrapper = shallow(
      <CardContainer
        data={mockData}
        handlePage={handlePage}
        toggleFavorites={toggleFavorites}
        savedFavorites={savedFavorites}
        isFavorites={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with favorites and data", () => {
    savedFavorites = ["Luke Skywalker"];
    wrapper = shallow(
      <CardContainer
        data={mockData}
        handlePage={handlePage}
        toggleFavorites={toggleFavorites}
        savedFavorites={savedFavorites}
        isFavorites={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with favorites and no data", () => {
    savedFavorites = ["Luke Skywalker"];
    wrapper = shallow(
      <CardContainer
        data={[]}
        handlePage={handlePage}
        toggleFavorites={toggleFavorites}
        savedFavorites={savedFavorites}
        isFavorites={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handlePage on click", () => {
    let mockHandlePage = jest.fn();

    wrapper = shallow(
      <CardContainer
        data={mockData}
        handlePage={mockHandlePage}
        toggleFavorites={toggleFavorites}
        savedFavorites={savedFavorites}
      />
    );
    wrapper
      .find(".previous-page-button")
      .first()
      .simulate("click");
    expect(mockHandlePage).toHaveBeenCalled();

    wrapper
      .find(".next-page-button")
      .first()
      .simulate("click");
    expect(mockHandlePage).toHaveBeenCalled();
  });
});
