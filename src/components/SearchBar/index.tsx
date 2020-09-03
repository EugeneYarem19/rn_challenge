import React, { useCallback, useState, } from "react";
import { Keyboard, } from "react-native";
import { SearchBar as SearchBarComponent, } from "react-native-elements";
import { useDispatch, } from "react-redux";

import { actions, } from "@redux";
import { displayInfo, } from "@utils";

import { SearchButton, } from "./components";
import { styles, } from "./styles";

export const SearchBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const [searchTitle, setSearchTitle,] = useState("");

  const search = useCallback(() => {
    if (!searchTitle || !searchTitle.length || !searchTitle.trim()) {
      displayInfo("Please, provide movie title to search");
      return;
    }

    Keyboard.dismiss();
    dispatch(actions.findMovies(searchTitle));
  }, [dispatch, searchTitle,]);
  const updateSearchTitle = useCallback((title) => setSearchTitle(title), [setSearchTitle,]);
  const clearSearchTitle = useCallback(() => setSearchTitle(""), [setSearchTitle,]);

  return (
    <SearchBarComponent
      placeholder="Search"
      value={searchTitle}
      onChangeText={updateSearchTitle}
      onClear={clearSearchTitle}
      searchIcon={() => <SearchButton onPress={search} />}
      containerStyle={styles.container}
    />
  );
};
