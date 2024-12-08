import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import nasaApi from "../api/nasaApi";
import ProgressBar from "react-native-progress/Bar";
import { useNavigation } from "@react-navigation/native";

const Gallery = () => {
  const [astro, setAstro] = useState("earth");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const loadImages = async () => {
    setLoading(true);
    const fetchedImages = await nasaApi.fetchImages(astro, page);
    setImages((prevImages) => [...prevImages, ...fetchedImages]);
    setLoading(false);
  };

  const handleAstroChange = (astro) => {
    setAstro(astro);
    setPage(1);
    setImages([]);
  };

  const handlePageChange = (direction) => {
    setPage((prevPage) => Math.max(prevPage + direction, 1));
  };

  useEffect(() => {
    loadImages();
  }, [astro, page]);

  const renderItem = ({ item }) => {
    const imageUrl = item.links && item.links[0] && item.links[0].href;
    return (
      <View style={styles.imageContainer} key={item.data[0]?.nasa_id}>
        {imageUrl ? (
          <TouchableOpacity
            style={styles.image}
            onPress={() => navigation.navigate("ImageDetail", { image: item })}
          >
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <Text>No Image Available</Text>
        )}
        <Text>{item.data[0]?.title}</Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setImages([]);
    await loadImages();
    setRefreshing(false);
  };

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const scrolled = scrollOffset / (contentHeight - visibleHeight);
    setScrollProgress(scrolled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NASA Image Gallery</Text>

      <Picker
        selectedValue={astro}
        style={styles.picker}
        onValueChange={handleAstroChange}
      >
        <Picker.Item label="Earth" value="earth" />
        <Picker.Item label="Moon" value="moon" />
        <Picker.Item label="Sun" value="sun" />
        <Picker.Item label="Mars" value="mars" />
        <Picker.Item label="Jupiter" value="jupiter" />
      </Picker>

      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={() => handlePageChange(-1)}
          disabled={page === 1}
        />
        <Text>Page {page}</Text>
        <Button title="Next" onPress={() => handlePageChange(1)} />
      </View>

      <ProgressBar
        progress={scrollProgress}
        width={null}
        style={styles.progressBar}
        color="#0000ff"
      />

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loader}
            />
          ) : null
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        onScroll={handleScroll}
        ref={flatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    marginBottom: 10,
    height: 150,
    resizeMode: "contain",
  },
  row: {
    justifyContent: "space-between",
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  loader: {
    marginVertical: 20,
  },
});

export default Gallery;
