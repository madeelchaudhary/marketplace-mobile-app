import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import colors from "../constants/colors";
import Icon from "../components/ui/icon";
import { IconProps } from "../types/icon";
import { ListItemColumns, ListSeperator } from "../components/ui/lists";
import SafeScreen from "../components/ui/safe-screen";
import { AccountScreenProps } from "../navigation/AccountNavigator";
import routes from "../navigation/routes";
import { useAuth, useUser } from "../providers/auth";

interface MenuItem {
  title: string;
  readonly route?: (typeof routes)[keyof typeof routes];
  icon: {
    name: IconProps["name"];
    backgroundColor: IconProps["backgroundColor"];
  };
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    route: routes.MESSAGES,
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const auth = useAuth();
  const user = auth.user;

  return (
    <SafeScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItemColumns
          title={user?.name || "John Doe"}
          subTitle={user?.email || "john@example.com"}
          image={require("../../assets/author.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={MENU_ITEMS}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <ListItemColumns
              onPress={() => item.route && navigation.navigate(item.route)}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
          ItemSeparatorComponent={ListSeperator}
        />
      </View>
      <View style={styles.container}>
        <ListItemColumns
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={auth.logout}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: colors.white,
  },
  screen: {
    backgroundColor: colors.light,
    paddingTop: 0,
  },
});
