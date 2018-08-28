import React from "react";

import App from "./index.js";
import { mockPeople } from "../../MockData/MockData";

describe("App", () => {
  let wrapper;
  let mockEvent;

  beforeEach(async () => {
    localStorage.clear();
    wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount;
  });

  it("should match snapshot with default states", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot with background scroll in state ", () => {
    const backgroundFilm = {dont: 'stop'};
    wrapper.setState({backgroundFilm});
    expect(wrapper).toMatchSnapshot();
  });

  describe("getData", () => {
    beforeEach(() => {
      wrapper = shallow(<App />);
      mockEvent = { target: { name: "people" } };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPeople)
        })
      );
    });

    it("should call FetchApi", async () => {
      await wrapper.instance().getData(mockEvent, 1);
      expect(fetch).toHaveBeenCalled();
    });

    it("should set correct state with the value passed", async () => {
      await wrapper.instance().getData(mockEvent, 1);

      expect(wrapper.state("people").length).toEqual(10);
    });

    it("should set correct error state if value returns failed fetch", async () => {
      window.fetch = jest
        .fn()
        .mockImplementation(() => Promise.reject(new Error("failed")));
      await wrapper.instance().getData(mockEvent);
      expect(wrapper.state("errorStatus")).toEqual("failed");
    });

    it("should call setButtonPressed", () => {
      wrapper.instance().setButtonPressed = jest.fn();
      wrapper.instance().getData(mockEvent);
      expect(wrapper.instance().setButtonPressed).toHaveBeenCalled();
    });

    it("should run fetch only if state is empty or not null", async () => {
      const people = [{}, {}];
      wrapper.setState({ people });
      expect(wrapper.state("people").length).toEqual(2);
      await wrapper.instance().getData(mockEvent);
      expect(wrapper.state("people").length).toEqual(10);
    });

    it("should return if alreadyHasData is true and not a new page", async () => {
      const people = [{}, {}];
      const expected = people;
      await wrapper.setState({ people });
      await wrapper.instance().getData(mockEvent, 1);
      expect(wrapper.state("people")).toEqual(expected);
    });

    it("should not return if alreadyHasData is true and a new page exists", async () => {
      const people = [{}, {}];
      wrapper.setState({ people });
      await wrapper.instance().getData(mockEvent, 2);
      expect(wrapper.state("people").length).toEqual(10);
    });

    describe('setRandomFilm', () => {
      it("should set state backgroundFilm of single film from the films array in state", () => {
        wrapper = shallow(<App />);
        const films = [{}, {}, {}];
        wrapper.setState({ films });
        wrapper.instance().setRandomFilm();
        expect(wrapper.state('backgroundFilm')).toEqual({});
      });

      it("should return if films array in state is null", () => {
        wrapper = shallow(<App />);
        const films = null;
        wrapper.setState({ films });
        wrapper.instance().setRandomFilm();
        expect(wrapper.state('backgroundFilm')).toEqual(null);
      });
    });

    describe('setButtonPressed', () => {
      it("should take a string and set activeButton state", () => {
        wrapper = shallow(<App />);
        wrapper.instance().setButtonPressed('people');
        expect(wrapper.state('activeButton')).toEqual('people');
      });

      it("should revert pageCounter to 1", () => {
        wrapper = shallow(<App />);
        wrapper.setState({ pageCounter: 2 });
        wrapper.instance().setButtonPressed('people');
        expect(wrapper.state('pageCounter')).toEqual(1);
      });
    });

    describe('handleFavorites and toggleFavorites and setFavoritesFromStorage', () => {
      let favorites;
      beforeEach(() => {
        wrapper = shallow(<App />);
        favorites = [{name: 'one', favorite: true}, {name: 'two', favorite: true}, {name: 'three', favorite: true}];
      });

      it("toggleFavorites should toggle card's favorite property ", () => {
        const mockCard = {favorite: false};
        wrapper.instance().toggleFavorites(mockCard);
        expect(mockCard.favorite).toEqual(true);
      });

      it("handleFavorites should add a card to favorites array in state ", () => {
        const mockCard = {name: 'four', favorite: true};
        wrapper.setState({ favorites });
        wrapper.instance().handleFavorites(mockCard);
        expect(wrapper.state('favorites').length).toEqual(4);
      });

      it("handleFavorites should remove a card to favorites array in state ", () => {
        const mockCard = {name: 'three', favorite: false};
        wrapper.setState({ favorites });
        wrapper.instance().handleFavorites(mockCard);
        expect(wrapper.state('favorites').length).toEqual(2);
      });

      it("handleFavorites should update localStorage with a new favorites array ", () => {
        const mockCard = {name: 'four', favorite: true};
        wrapper.setState({ favorites });
        wrapper.instance().handleFavorites(mockCard);
        const expected = JSON.parse(localStorage.getItem('favorites')).length;
        expect(expected).toEqual(4);
      });

      it("setFavoritesFromStorage retreive favorites from localStorage and set to state", () => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        wrapper.instance().setFavoritesFromStorage();
        let expected = JSON.parse(localStorage.getItem('favorites')).length;
        expect(expected).toEqual(3);
      });

      it("setFavoritesFromStorage should return if favorites from localStorage does not exist", () => {
        favorites = [{nada:'NOTHING HERE'}];
        wrapper.setState({ favorites });
        wrapper.instance().setFavoritesFromStorage();
        expect(wrapper.state('favorites')).toEqual([{nada:'NOTHING HERE'}]);
      });
    });

    describe('handlePage', () => {
      it("should increment state's pageCount by one", () => {
        wrapper = shallow(<App />);
        wrapper.instance().handlePage(true);
        expect(wrapper.state('pageCounter')).toEqual(2);
        wrapper.instance().handlePage(true);
        expect(wrapper.state('pageCounter')).toEqual(3);
      });

      it("should decrement state's pageCount by one if pageCounter not the first page", () => {
        wrapper = shallow(<App />);

        wrapper.instance().handlePage(true);
        wrapper.instance().handlePage(true);
        wrapper.instance().handlePage(true);
        wrapper.instance().handlePage(false);
        expect(wrapper.state('pageCounter')).toEqual(3);
      });

      it("should become empty string if dercremented on first page", () => {
        wrapper = shallow(<App />);

        wrapper.instance().handlePage(false);
        expect(wrapper.state('pageCounter')).toEqual('');  
      });

      it("should set pageCounter to 2 if incrementing on empty string or 0", () => {
        wrapper = shallow(<App />);

        wrapper.instance().handlePage(false);
        expect(wrapper.state('pageCounter')).toEqual('');  

        wrapper.instance().handlePage(true);
        expect(wrapper.state('pageCounter')).toEqual(2);
          
        wrapper.instance().handlePage(false);
        expect(wrapper.state('pageCounter')).toEqual('');  
        wrapper.instance().handlePage(false);
        expect(wrapper.state('pageCounter')).toEqual('');  

        wrapper.instance().handlePage(true);
        expect(wrapper.state('pageCounter')).toEqual(2); 
      });

      it("should default in switch case if no other cases are met", () => {
        wrapper = shallow(<App />);
        wrapper.instance().handlePage('true');
        expect(wrapper.state('pageCounter')).toEqual(1);
        wrapper.instance().handlePage('true');
        expect(wrapper.state('pageCounter')).toEqual(1);
      });
        
    });
  });
});
/* global shallow */