import React from "react";
import { ScrollView, Text, } from "react-native";

import { ImageSize, } from "@src/components/Poster/types";
import { LoadingIndicator, Poster, } from "@components";

import { DetailsItem, } from "../DetailsItem";
import { Rating, } from "../Rating";
import { IMovieScreenComponent, } from "./types";
import { styles, } from "./styles";

export const MovieScreenComponent: React.FC<IMovieScreenComponent> = ({
  defaultTitle,
  isFetchingMovie,
  poster,
  title,
  genre,
  director,
  fullPlot,
  cast,
  ratings,
}) => {
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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContainer}
      bounces={false}
    >
      <Text style={styles.title}>{title || defaultTitle}</Text>
      <Poster poster={poster} size={ImageSize.large} style={styles.poster} />
      {isFetchingMovie ? <LoadingIndicator /> : <>{Content}</>}
    </ScrollView>
  );
};
