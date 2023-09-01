import { StyleSheet, View } from "react-native";
import React from "react";
import * as Yup from "yup";

import SafeScreen from "../components/ui/safe-screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/ui/forms";
import { login, register } from "../api/auth";
import { useAuth } from "../providers/auth";
import ActivityIndicator from "../components/ActivityIndicator";

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
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [loading, setLoading] = React.useState(false);
  const auth = useAuth();

  async function handleFormSubmit(values: any, { resetForm }: any) {
    setLoading(true);
    setError(undefined);

    const res = await register({
      ...values,
    });

    if (!res.ok) {
      if (res.data) setError((res.data as any).error);
      else setError("An unexpected error occurred.");
      setLoading(false);
      return;
    }

    const loginRes = await login(values.email, values.password);

    if (!loginRes.ok) {
      setError("Login failed. Please try again.");
      setLoading(false);
      return;
    }

    auth.login(loginRes.data);
    setLoading(false);
    resetForm();
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeScreen>
        <View style={styles.container}>
          <ErrorMessage visible={error !== undefined}>
            {typeof error === "string"
              ? error
              : "An unexpected error occurred."}
          </ErrorMessage>
          <Form
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={handleFormSubmit}
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
            <SubmitButton disabled={loading}>Register</SubmitButton>
          </Form>
        </View>
      </SafeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 10,
  },
});
