import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import React, { useRef } from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";

export const SignInScreen = () => {
  const passwordRef = useRef<any>(null)
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () =>
    setSecureTextEntry(secureTextEntry => !secureTextEntry);

  const PasswordIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleSubmit = () => {}

  return (
    <Layout style={{ height: '100%' }}>
      <Layout style={{ marginHorizontal: 20, marginTop: 20 }}>

        <Image style={{ alignSelf: 'center', aspectRatio: 4, height: 80, marginTop: 24 }}
               source={require('../../assets/minstagram-logo.png')} />

        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          {({ values, handleChange, submitForm }) => (
            <>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                style={{ marginTop: 16 }}
                placeholder='Email'
                textContentType="emailAddress"
                autoCompleteType="email"
                onSubmitEditing={() => passwordRef?.current?.focus()}
              />

              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                ref={passwordRef}
                style={{ marginVertical: 16 }}
                placeholder='Password'
                textContentType="password"
                autoCompleteType="password"
                accessoryRight={PasswordIcon}
                secureTextEntry={secureTextEntry}
              />

              <Button style={{ backgroundColor: "#F95E62" }}
                      onPress={submitForm}>
                Login
              </Button>
            </>
          )}
        </Formik>
      </Layout>
    </Layout>
  )
}
