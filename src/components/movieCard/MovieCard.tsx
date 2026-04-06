import { memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Movie } from "../../services/movieService";
import { getImageUrl } from "../../utils/movies";
import { formatMovieSubtitle } from "../../utils/movieGenres";
import { movieCardStyles as styles } from "./MovieCard.styles";

export type MovieCardProps = {
  movie: Movie;
  posterWidth: number;
  onPress: (movieId: number) => void;
};

export const MovieCard = memo(function MovieCard({ movie, posterWidth, onPress }: MovieCardProps) {
  const rating = movie.vote_average;

  return (
    <TouchableOpacity
      style={[styles.card, { width: posterWidth }]}
      onPress={() => onPress(movie.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.posterWrap, { width: posterWidth }]}>
        <Image
          source={{ uri: getImageUrl(movie.poster_path) }}
          style={[styles.poster, { width: posterWidth }]}
          resizeMode="cover"
        />
        {rating != null && rating > 0 && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={11} color="#f5c518" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {movie.title}
      </Text>
      <Text style={styles.cardMeta} numberOfLines={1}>
        {formatMovieSubtitle(movie.genre_ids, movie.release_date)}
      </Text>
    </TouchableOpacity>
  );
});
