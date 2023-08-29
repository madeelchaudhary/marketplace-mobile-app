import { FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";

import SafeScreen from "../components/ui/safe-screen";
import {
  ListItemColumns,
  ListItemDeleteAction,
  ListSeperator,
} from "../components/ui/lists";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../../assets/author.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../../assets/author.jpg"),
  },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message: (typeof initialMessages)[number]) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <SafeScreen style={styles.screen}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ListItemColumns
            {...item}
            subTitle={item.description}
            onPress={() => console.log(item)}
            rightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        keyExtractor={(message) => message.id.toString()}
        ItemSeparatorComponent={ListSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages(initialMessages);
        }}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
  },
});
