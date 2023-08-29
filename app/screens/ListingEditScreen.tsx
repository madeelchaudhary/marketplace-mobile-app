import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker,
  FormImagePicker,
  SubmitButton,
} from "../components/ui/forms";
import SafeScreen from "../components/ui/safe-screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { CategoryPickerItem as CategoryPickerItemType } from "../types/picker";
import useLocation from "../hooks/useLocation";
import { ImagePickerAsset } from "expo-image-picker";
import { addListing } from "../api/listing";
import useHttp from "../hooks/useHttp";
import { useState } from "react";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nonNullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const categories: CategoryPickerItemType[] = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

export default function ListingEditScreen() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  async function handleFormSubmit(values: any, { resetForm }: any) {
    setLoading(true);
    const res = await addListing(
      { ...values, location },
      {
        onUploadProgress: (progress: any) => {
          setUploadProgress(progress.loaded / progress.total);
        },
      }
    );
    if (!res.ok) return setError(true);
    setSuccess(true);
    resetForm();
  }

  return (
    <SafeScreen style={styles.screen}>
      <UploadScreen
        progress={uploadProgress}
        visible={loading}
        onCompleted={() => {
          setLoading(false);
          setUploadProgress(0);
          setError(false);
          setSuccess(false);
        }}
        error={error}
        success={success}
      />
      <View style={styles.container}>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleFormSubmit as any}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <FormPicker
            numberOfColumns={3}
            items={categories}
            name="category"
            placeholder="Category"
            width="50%"
            PickerItemComponent={CategoryPickerItem}
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
            style={{ verticalAlign: "top" }}
          />
          <SubmitButton>Post</SubmitButton>
        </Form>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  screen: {
    padding: 15,
    marginTop: 25,
  },
});
