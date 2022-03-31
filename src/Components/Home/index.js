import Hoverable from "Components/Hoverable";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { makePaschal } from "Utils";
import { getSearchResults } from "../../Actions";
import * as actionTypes from "../../Actions/types";
import { styles } from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { results } = useSelector((state) => state.main);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchText, 2000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setPage(1);
      dispatch(getSearchResults(debouncedSearchTerm)).then(() => {
        setIsSearching(false);
      });
    } else {
      setIsSearching(false);
      dispatch({
        type: actionTypes.GET_SEARCH_RESULTS,
        payload: [],
      });
    }
  }, [debouncedSearchTerm, dispatch]);

  const paginate = async () => {
    setIsFetching(true);
    setPage(page + 1);
    await dispatch(getSearchResults(debouncedSearchTerm, page + 1));
    await setIsFetching(false);
  };

  return (
    <View
      style={styles.homeContainer}
    >
      <View
        style={styles.homeHeaderView}
      >
        <Text
          style={styles.headerText}
        >
          HOME
        </Text>
        <TextInput
          placeholder="Enter Search Text"
          onChangeText={setSearchText}
          value={searchText}
          style={styles.inputStyle}
        />
      </View>
      {debouncedSearchTerm !== "" && debouncedSearchTerm !== undefined && (
        <Text
          style={styles.showResText}
        >
          Showing results for "{debouncedSearchTerm}"
        </Text>
      )}
      {isSearching ? (
        <View
          style={styles.centerContainer}
        >
          <ActivityIndicator size={50} color="#000" />
        </View>
      ) : (
        <>
          {!debouncedSearchTerm ||
          !results ||
          (results && results.length === 0) ? (
            <View
              style={styles.centerContainer}
            >
              <Text>No results available</Text>
            </View>
          ) : (
            <ScrollView>
              <View
                style={styles.innerScrollView}
              >
                {results &&
                  results.length > 0 &&
                  results.map(({ avatar_url, html_url, login, score }, key) => {
                    return (
                      <Hoverable key={key}>
                        {(hover) => {
                          return (
                            <View
                              style={styles.whiteCard}
                            >
                              <Image
                                source={{ uri: avatar_url }}
                                style={styles.profileImg}
                              />
                              <Text
                                style={styles.profileName}
                              >
                                {makePaschal(login)}
                              </Text>
                              {(hover || width < 500) && (
                                <>
                                  <Text
                                    style={styles.scoreText}
                                  >
                                    Score: {score}
                                  </Text>
                                  <Text
                                    accessibilityRole="link"
                                    onPress={() =>
                                      Linking.canOpenURL(html_url) &&
                                      Linking.openURL(html_url)
                                    }
                                    style={styles.gitLink}
                                  >
                                    Open Github Profile
                                  </Text>
                                </>
                              )}
                            </View>
                          );
                        }}
                      </Hoverable>
                    );
                  })}
                {[0, 1, 2, 3, 4, 5].map((_a, key) => {
                  return (
                    <View
                      key={key}
                      style={[styles.alignment, {
                        height: width < 768 ? 7 : 30,
                        marginVertical: width < 768 ? 7 : 11,
                      }]}
                    />
                  );
                })}
              </View>
              {isFetching ? (
                <View
                  style={styles.pagLoaderView}
                >
                  <ActivityIndicator size={50} color="#000" />
                </View>
              ) : (
                <View
                  style={styles.pagButtonView}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={paginate}
                    style={styles.pagButton}
                  >
                    <Text
                      style={styles.pagButtonText}
                    >
                      Load More Results
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default Home;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
