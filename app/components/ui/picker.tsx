import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  FlatList,
  Button,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import BaseText from "./base-text";
import SafeScreen from "./safe-screen";
import {
  CategoryPickerItem,
  PickerItem as PickerItemType,
  PickerProps,
} from "../../types/picker";
import PickerItem from "./picker-item";

interface Props<TItem> extends PickerProps<TItem> {}

export default function Picker<
  TItem extends PickerItemType & CategoryPickerItem
>({
  icon,
  items,
  onItemSelect,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  textStyle,
  width = "100%",
  numberOfColumns = 1,
}: Props<TItem>) {
  const [modalVisible, setModalVisible] = React.useState(false);

  function toggleModal(status: boolean) {
    setModalVisible(status);
  }

  return (
    <>
      <Pressable onPress={() => toggleModal(true)} style={{ width }}>
        <View style={[styles.container]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.neutral}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <BaseText style={[styles.text, textStyle]}>
              {selectedItem.label}
            </BaseText>
          ) : (
            <BaseText style={[styles.text, styles.placeholder, textStyle]}>
              {placeholder}
            </BaseText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.neutral}
            style={styles.icon}
          />
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={modalVisible}
      >
        <SafeScreen>
          <View style={styles.modalClose}>
            <Button onPress={() => toggleModal(false)} title="Close" />
          </View>
          <FlatList
            numColumns={numberOfColumns}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={(item) => {
                  toggleModal(false);
                  onItemSelect(item);
                }}
              />
            )}
            columnWrapperStyle={
              numberOfColumns > 1 && {
                justifyContent: "center",
                alignItems: "center",
              }
            }
          />
        </SafeScreen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    gap: 10,
  },
  icon: {
    alignSelf: "center",
  },
  modalClose: {
    width: 100,
    height: 50,
    alignSelf: "center",
  },
  placeholder: {
    color: colors.neutral,
  },
  text: {
    flex: 1,
  },
});
