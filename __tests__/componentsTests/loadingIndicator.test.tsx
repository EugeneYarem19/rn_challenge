import React from "react";

import { LoadingIndicator, } from "@components";

import { snapshotTest, } from "@tests/__utils__";

describe("LoadingIndicator tests", () => {
  test("LoadingIndicator must renders correctly", () => {
    snapshotTest(<LoadingIndicator />);
  });
});
