import { View, ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

import Button from "../components/ui/button";
import LogoView from "../components/LogoView";
import { WelcomeScreenProps } from "../navigation/AuthNavigator";
import routes from "../navigation/routes";

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      resizeMode="cover"
      blurRadius={5}
      style={styles.screen}
    >
      <View style={styles.screen}>
        <SafeAreaView style={styles.screen}>
          <View style={styles.col}>
            <LogoView subTitle="Sell What You Don't Need" />
            <View style={styles.btnGroup}>
              <Button onPress={() => navigation.navigate(routes.LOGIN)}>
                Login
              </Button>
              <Button
                onPress={() => navigation.navigate(routes.REGISTER)}
                backgroundColor="secondary"
              >
                Register
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  col: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnGroup: {
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 35,
  },
});
