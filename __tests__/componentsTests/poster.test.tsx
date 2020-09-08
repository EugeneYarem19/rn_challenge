import React from "react";

import { Poster, } from "@components";

import { mockedData, } from "@tests/__mocks__";
import { snapshotTest, } from "@tests/__utils__";

describe("Poster tests", () => {
  // tests on the default props is not changed
  test("Poster must renders correctly with set poster", () => {
    snapshotTest(<Poster poster={mockedData.movies[0].poster} />);
  });

  test("Poster must renders correctly without set poster", () => {
    snapshotTest(<Poster poster="" />);
  });

  // tests on different props
  test("Poster must renders correctly with set poster and size = 'small'", () => {
    snapshotTest(<Poster poster={mockedData.movies[0].poster} size="small" />);
  });

  test("Poster must renders correctly with set poster and size = 'large'", () => {
    snapshotTest(<Poster poster={mockedData.movies[0].poster} size="large" />);
  });

  test("Poster must renders correctly without set poster and size = 'small'", () => {
    snapshotTest(<Poster poster="" size="small" />);
  });

  test("Poster must renders correctly without set poster and size = 'small' and smallOnEmptyPoster = 'false'", () => {
    snapshotTest(<Poster poster="" size="small" smallOnEmptyPoster={false} />);
  });

  test("Poster must renders correctly without set poster and size = 'large'", () => {
    snapshotTest(<Poster poster="" size="large" />);
  });

  test("Poster must renders correctly without set poster and size = 'large' and smallOnEmptyPoster = 'false'", () => {
    snapshotTest(<Poster poster="" size="large" smallOnEmptyPoster={false} />);
  });
});
