import { StyleSheet, Keyboard, Alert } from "react-native";
import React from "react";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "./ui/forms";
import messages from "../api/messages";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default function ContactSellerForm({ listing }: any) {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    Keyboard.dismiss();

    const message = values.message;
    const result = await messages.send(message, listing.id);

    if (!result.ok) {
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();

    Alert.alert("Success", "Your message was sent to the seller.");
  };

  return (
    <Form
      initialValues={{
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormField
        name="message"
        maxLength={255}
        multiline
        style={{
          verticalAlign: "top",
          maxHeight: 82,
        }}
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton buttonStyle={{ marginTop: 10 }}>
        Contact Seller
      </SubmitButton>
    </Form>
  );
}

const styles = StyleSheet.create({});
