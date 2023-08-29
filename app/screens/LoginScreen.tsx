import { StyleSheet, View } from "react-native";
import React from "react";
import * as Yup from "yup";

import SafeScreen from "../components/ui/safe-screen";
import LogoView from "../components/LogoView";
import { FormField, Form, SubmitButton } from "../components/ui/forms/";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

export default function LoginScreen() {
  return (
    <SafeScreen>
      <View style={styles.logo}>
        <LogoView />
      </View>
      <View style={styles.inputContainer}>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={validationSchema}
        >
          <FormField
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            icon="email"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            textContentType="password"
            secureTextEntry
          />

          <SubmitButton>Login</SubmitButton>
        </Form>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  logo: {
    marginTop: 50,
    marginBottom: 20,
  },
});
