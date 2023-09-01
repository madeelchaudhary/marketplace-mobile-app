import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";

import SafeScreen from "../components/ui/safe-screen";
import LogoView from "../components/LogoView";
import {
  FormField,
  Form,
  SubmitButton,
  ErrorMessage,
} from "../components/ui/forms/";
import { login } from "../api/auth";
import { useAuth } from "../providers/auth";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const auth = useAuth();

  async function handleFormSubmit(values: any, { resetForm }: any) {
    setLoading(true);
    setError(undefined);

    const res = await login(values.email, values.password);

    if (!res.ok) {
      if (res.data) setError((res.data as any).error);
      else setError("An unexpected error occurred.");
      setLoading(false);
      return;
    }
    setLoading(false);
    auth.login(res.data);
    resetForm();
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeScreen>
        <View style={styles.logo}>
          <LogoView />
        </View>
        <View style={styles.inputContainer}>
          <ErrorMessage visible={error !== undefined}>
            {typeof error === "string"
              ? error
              : "An unexpected error occurred."}
          </ErrorMessage>
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={handleFormSubmit}
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

            <SubmitButton disabled={loading}>Login</SubmitButton>
          </Form>
        </View>
      </SafeScreen>
    </>
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
