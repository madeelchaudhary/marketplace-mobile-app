import { StyleSheet, View } from "react-native";
import React from "react";
import * as Yup from "yup";

import SafeScreen from "../components/ui/safe-screen";
import { Form, FormField, SubmitButton } from "../components/ui/forms";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .matches(passwordRegex, "Password is not strong enough")
    .label("Password"),
});

export default function RegisterScreen() {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
            placeholder="Email"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <SubmitButton>Register</SubmitButton>
        </Form>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 10,
  },
});
