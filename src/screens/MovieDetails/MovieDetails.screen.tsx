import { useLayoutEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
  Pressable,
  Linking,
  useWindowDimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation";
import { CinemaCircleHeaderButton, CinemaHeaderTitle } from "../../components";
import { useMovieDetail } from "../../hooks/useMovies";
import styles, { GRADIENT_START } from "./MovieDetails.screen.styles";
import { getBackdropUrl, getImageUrl, getProfileUrl } from "../../utils/movies";
import {
  buildMetaLine,
  computeHeroHeight,
  formatRuntimeMinutes,
  getDirectorName,
  getUsCertification,
} from "../../utils/movieDetailFormat";
import { useWatchlistStore } from "../../store/watchlistStore";
import { useNotificationsStore } from "../../store/notificationsStore";
import { cancelNotification, scheduleMovieReminder } from "../../utils/notifications";
import { CINEMA } from "../../utils/cinemaTheme";

type MovieDetailsRouteProp = RouteProp<RootStackParamList, "MovieDetails">;
type MovieDetailsNavProp = NativeStackNavigationProp<RootStackParamList, "MovieDetails">;

const CAST_PREVIEW = 12;

export default function MovieDetailsScreen() {
  const { t } = useTranslation();
  const { width: windowWidth } = useWindowDimensions();
  const route = useRoute<MovieDetailsRouteProp>();
  const navigation = useNavigation<MovieDetailsNavProp>();
  const { movieId } = route.params;

  const { data, isLoading, isError } = useMovieDetail(movieId);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const { notifications, setNotification, removeNotification } = useNotificationsStore();

  const isFavorite = isInWatchlist(movieId);

  const onWatchNow = useCallback(() => {
    if (data) {
      Linking.openURL(`https://www.themoviedb.org/movie/${data.id}/watch`);
    }
  }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: CINEMA.black },
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerTitle: () => <CinemaHeaderTitle />,
      headerTintColor: "#fff",
      headerLeft: () => (
        <View style={{ marginLeft: 8 }}>
          <CinemaCircleHeaderButton
            icon="chevron-back"
            onPress={() => navigation.goBack()}
            accessibilityLabel={t("movieDetails.backA11y")}
          />
        </View>
      ),
    });
  }, [navigation, data, t]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <StatusBar style="light" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={GRADIENT_START} />
          <Text style={styles.centerText}>{t("movieDetails.loading")}</Text>
        </View>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.screen}>
        <StatusBar style="light" />
        <View style={styles.center}>
          <Text style={[styles.centerText, { color: "#fff" }]}>{t("movieDetails.errorDetail")}</Text>
        </View>
      </View>
    );
  }

  const hasBackdrop = Boolean(data.backdrop_path);
  const heroHeight = computeHeroHeight(windowWidth, hasBackdrop);
  const heroUri = getBackdropUrl(data.backdrop_path) || getImageUrl(data.poster_path);
  const year = data.release_date?.slice(0, 4) ?? "";
  const runtimeStr = formatRuntimeMinutes(data.runtime);
  const certification = getUsCertification(data.release_dates ?? undefined);
  const metaLine = buildMetaLine(year, runtimeStr, certification);
  const directorName = getDirectorName(data.crew);
  const productionName = data.production_companies[0]?.name ?? t("common.dash");
  const castPreview = data.cast.slice(0, CAST_PREVIEW);
  const vote = data.vote_average;

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} bounces contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroWrap, { width: windowWidth, height: heroHeight }]}>
          <ImageBackground
            source={{ uri: heroUri }}
            style={[styles.heroImage, { width: windowWidth, height: heroHeight }]}
            imageStyle={{ width: windowWidth, height: heroHeight }}
            resizeMode="cover"
          >
            {vote > 0 && (
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#111" style={styles.ratingStar} />
                <Text style={styles.ratingValue}>{vote.toFixed(1)}</Text>
                <Text style={styles.ratingMax}>{t("movieDetails.ratingMax")}</Text>
              </View>
            )}
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{data.title}</Text>
          {metaLine.length > 0 ? <Text style={styles.metaLine}>{metaLine}</Text> : null}

          <View style={styles.genreRow}>
            {data.genres.map((g) => (
              <View key={g.id} style={styles.genrePill}>
                <Text style={styles.genrePillText}>{g.name}</Text>
              </View>
            ))}
          </View>

          <Pressable onPress={onWatchNow} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.92 }]}>
            <View style={styles.primaryBtnInner}>
              <Ionicons name="play" size={22} color="#fff" />
              <Text style={styles.primaryBtnText}>{t("movieDetails.watchNow")}</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={async () => {
              if (isFavorite) {
                removeFromWatchlist(movieId);
                const notifId = notifications[movieId];
                if (notifId) {
                  await cancelNotification(notifId);
                  removeNotification(movieId);
                }
              } else {
                addToWatchlist({
                  id: data.id,
                  title: data.title,
                  poster_path: data.poster_path ?? "",
                });
                if (!notifications[movieId]) {
                  const notifId = await scheduleMovieReminder(movieId, data.title);
                  setNotification(movieId, notifId);
                }
              }
            }}
            style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.9 }]}
          >
            <Ionicons name={isFavorite ? "bookmark" : "bookmark-outline"} size={22} color="#fff" />
            <Text style={styles.secondaryBtnText}>
              {isFavorite ? t("movieDetails.removeWatchlist") : t("movieDetails.addWatchlist")}
            </Text>
          </Pressable>

          <Text style={styles.sectionTitle}>{t("movieDetails.synopsis")}</Text>
          <Text style={styles.synopsisText}>
            {data.overview?.trim() ? data.overview : t("movieDetails.synopsisEmpty")}
          </Text>

          <View style={styles.castHeaderRow}>
            <Text style={styles.castSectionTitle}>{t("movieDetails.cast")}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castScroll}>
            {castPreview.map((actor) => {
              const uri = getProfileUrl(actor.profile_path);
              return (
                <View key={actor.id} style={styles.castItem}>
                  {uri ? (
                    <Image source={{ uri }} style={styles.castAvatarImg} />
                  ) : (
                    <View style={[styles.castAvatar, { justifyContent: "center", alignItems: "center" }]}>
                      <Ionicons name="person" size={32} color="#666" />
                    </View>
                  )}
                  <Text style={styles.castName} numberOfLines={2}>
                    {actor.name}
                  </Text>
                  <Text style={styles.castCharacter} numberOfLines={2}>
                    {actor.character || t("common.dash")}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footerCards}>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardLabel}>{t("movieDetails.director")}</Text>
              <Text style={styles.infoCardValue}>{directorName}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardLabel}>{t("movieDetails.production")}</Text>
              <Text style={styles.infoCardValue} numberOfLines={3}>
                {productionName}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
