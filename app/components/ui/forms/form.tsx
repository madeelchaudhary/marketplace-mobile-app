import React from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

interface Props<TValues, TSchema extends Yup.AnyObject> {
  children: React.ReactNode;
  onSubmit: (
    values: {
      [K in keyof TValues]: K extends keyof TSchema ? TSchema[K] : TValues[K];
    },
    formikHelpers: FormikHelpers<TValues>
  ) => void;
  validationSchema: Yup.ObjectSchema<TSchema>;
  initialValues: TValues;
}

export default function Form<
  TValues extends FormikValues,
  TSchema extends Yup.AnyObject
>({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}: Props<TValues, TSchema>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
      validationSchema={validationSchema}
    >
      {() => children}
    </Formik>
  );
}
