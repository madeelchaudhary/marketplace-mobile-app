import { FlatList, StyleSheet } from "react-native";
import React from "react";

import Card from "../components/ui/card";
import colors from "../constants/colors";
import SafeScreen from "../components/ui/safe-screen";
import { ListingsScreenProps } from "../navigation/FeedNavigator";
import routes from "../navigation/routes";
import { getListings } from "../api/listing";
import ActivityIndicator from "../components/ActivityIndicator";
import BaseText from "../components/ui/base-text";
import Button from "../components/ui/button";
import useHttp from "../hooks/useHttp";

export default function ListingsScreen({ navigation }: ListingsScreenProps) {
  const {
    data: listings,
    error,
    loading,
    send: fetchListings,
  } = useHttp(getListings);

  React.useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeScreen style={styles.screen}>
        {error && (
          <>
            <BaseText style={styles.errorText}>Something went wrong.</BaseText>
            <Button onPress={fetchListings}>Retry</Button>
          </>
        )}
        <FlatList
          data={listings}
          renderItem={({ item }) => (
            <Card
              imageUri={item.images[0].url}
              title={item.title}
              subTitle={"$" + item.price}
              onPress={() =>
                navigation.navigate(routes.LISTING_DETAILS, { item })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </SafeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 20,
  },
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  listContent: {
    rowGap: 20,
  },
});
