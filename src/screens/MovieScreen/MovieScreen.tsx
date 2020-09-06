import React from "react";
import { ScrollView, Text, } from "react-native";

import { LoadingIndicator, Poster, } from "@components";

import { Movie, } from "@redux";

import { DetailsItem, Rating, } from "./components";
import { styles, } from "./styles";

interface Props extends Movie {
  defaultTitle: string;
  isFetchingMovie: boolean;
}

export const MovieScreen: React.FC<Props> = ({ defaultTitle, isFetchingMovie, poster, title, genre, director, fullPlot, cast, ratings, }) => {
  const Content = (
    <>
      {ratings && <Rating ratings={ratings} />}
      {genre && <DetailsItem title="Genre" value={genre} />}
      {director && <DetailsItem title="Director" value={director} />}
      {cast && <DetailsItem title="Cast" value={cast} />}
      {fullPlot && <DetailsItem title="Plot" value={fullPlot} />}
    </>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContainer} bounces={false}>
      <Text style={styles.title}>{title || defaultTitle}</Text>
      <Poster poster={poster} size="large" style={styles.poster} />
      {isFetchingMovie ? <LoadingIndicator /> : <>{Content}</>}
    </ScrollView>
  );
};
