import React from "react";
import { SearchBar as SearchBarComponent, } from "react-native-elements";

import { SearchButton, } from "./components";
import { styles, } from "./styles";
import { useSearchBar, } from "./hooks";

export const SearchBar: React.FC = () => {
  const { searchTitle, clearSearchTitle, search, updateSearchTitle, } = useSearchBar();

  return (
    <SearchBarComponent
      testID="SearchBar"
      placeholder="Search"
      value={searchTitle}
      onChangeText={updateSearchTitle}
      onClear={clearSearchTitle}
      searchIcon={<SearchButton onPress={search} />}
      containerStyle={styles.container}
    />
  );
};
