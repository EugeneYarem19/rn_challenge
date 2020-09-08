/**
 * There is boilerplate code for all snapshot tests.
 *
 * @format
 */

import renderer from "react-test-renderer";

export const snapshotTest = (Component: JSX.Element): void => {
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
};
