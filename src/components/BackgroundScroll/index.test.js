import React from "react";

import { BackgroundScroll } from "./index";

describe("BackgroundScroll", () => {
  it("should match snapshot with data object passed", () => {
    let mockFilm = {
      title: "The Empire Strikes Back",
      openingCrawl: "wooooorrrrds",
      episode: 5,
      releaseDate: "1980-05-17"
    };
    const wrapper = shallow(<BackgroundScroll {...mockFilm} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot without data object passed", () => {
    let mockFilm = {};
    const wrapper = shallow(<BackgroundScroll {...mockFilm} />);
    expect(wrapper).toMatchSnapshot();
  });
});
/* global shallow */