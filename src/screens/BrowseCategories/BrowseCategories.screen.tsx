import { useCallback, useMemo, useState, type ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, Pressable, ActivityIndicator, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MoviesSearch } from "../../components";
import { useMovieGenresList } from "../../hooks/useMovies";
import { MainTabParamList } from "../../navigation/TabBarNavigator";
import { RootStackParamList } from "../../navigation";
import type { MovieGenre } from "../../services/movieService";
import { genreRowIcon, genreRowIconTint } from "../../utils/browseGenreUi";
import { CINEMA } from "../../utils/cinemaTheme";
import { CategoriesGrid } from "../../components";
import styles from "./BrowseCategories.screen.styles";

const FEATURED_COUNT = 6;

type BrowseNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Browse">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function BrowseCategoriesScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<BrowseNav>();
  const { width: winWidth } = useWindowDimensions();
  const [genreQuery, setGenreQuery] = useState("");
  const { data: genres, isLoading, isError } = useMovieGenresList();

  const colWidth = useMemo(() => {
    const gap = 12;
    const pad = 16;
    return (winWidth - pad * 2 - gap) / 2;
  }, [winWidth]);

  const filteredGenres = useMemo(() => {
    const list = genres ?? [];
    const q = genreQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((g) => g.name.toLowerCase().includes(q));
  }, [genres, genreQuery]);

  const featured = filteredGenres.slice(0, FEATURED_COUNT);
  const moreGenres = filteredGenres.slice(FEATURED_COUNT);

  const gridPairs = useMemo(() => {
    const pairs: [MovieGenre, MovieGenre | undefined][] = [];
    for (let i = 0; i < featured.length; i += 2) {
      pairs.push([featured[i], featured[i + 1]]);
    }
    return pairs;
  }, [featured]);

  const onSelectGenre = useCallback(
    (g: MovieGenre) => {
      navigation.navigate("GenreResults", { genreId: g.id, genreName: g.name });
    },
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.root}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={CINEMA.red} />
          <Text style={styles.centerText}>{t("browse.loading")}</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.root}>
        <View style={styles.center}>
          <Text style={[styles.centerText, { color: CINEMA.textPrimary }]}>{t("browse.error")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>{t("browse.title")}</Text>
          <Text style={styles.pageSubtitle}>{t("browse.subtitle")}</Text>
        </View>
        <MoviesSearch
          value={genreQuery}
          onChangeText={setGenreQuery}
          placeholderKey="moviesSearch.placeholderGenres"
        />
        {featured.length > 0 ? (
          <>
            <Text style={styles.sectionLabel}>{t("browse.featured")}</Text>
            {gridPairs.map(([a, b], idx) => (
              <CategoriesGrid
                key={`${a.id}-${b?.id ?? "x"}-${idx}`}
                left={a}
                right={b}
                colWidth={colWidth}
                onSelect={onSelectGenre}
              />
            ))}
          </>
        ) : (
          <View style={styles.center}>
            <Text style={styles.centerText}>{t("browse.noMatch")}</Text>
          </View>
        )}
        {moreGenres.length > 0 ? (
          <>
            <Text style={styles.sectionLabel}>{t("browse.moreGenres")}</Text>
            {moreGenres.map((g) => (
              <Pressable key={g.id} style={styles.genreRow} onPress={() => onSelectGenre(g)}>
                <View style={styles.genreRowIconWrap}>
                  <Ionicons
                    name={genreRowIcon(g.id) as ComponentProps<typeof Ionicons>["name"]}
                    size={22}
                    color={genreRowIconTint(g.id)}
                  />
                </View>
                <Text style={styles.genreRowLabel}>{g.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={CINEMA.textMuted} />
              </Pressable>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
