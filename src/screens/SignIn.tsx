import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../slices/authSlice";
import { useNavigation } from "@react-navigation/native";

export const SignInScreen: React.FC = () => {
  const passwordRef = useRef<any>(null)
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const formikRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false)

  // @ts-ignore
  const { error, loggedIn, loading } = useSelector(state => state.auth);

  if (loggedIn) {
    navigation.navigate('AppTabs', { screen: "NewsFeed" })
    return null
  }

  if (!loading && isSubmitting) {
    // @ts-ignore
    formikRef.current?.setSubmitting(false)
  }

  if (error) {
    Alert.alert("Error", error)
  }

  const toggleSecureEntry = () =>
    setSecureTextEntry(secureTextEntry => !secureTextEntry);

  const PasswordIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  // @ts-ignore
  const handleSubmit = ({ email, password }) => {
    dispatch(loginThunk({ email, password }))
    setIsSubmitting(true)
  }

  return (
    <Layout style={{ height: '100%', paddingTop: 120 }}>
      <Layout style={{ marginHorizontal: 20, marginTop: 20 }}>

        <Image style={{ alignSelf: 'center', aspectRatio: 4, height: 80, marginTop: 24 }}
               source={require('../../assets/minstagram-logo.png')} />

        <Formik innerRef={instance => formikRef.current = instance} onSubmit={handleSubmit}
                initialValues={{ email: '', password: '' }}>
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

              <Button
                accessoryRight={evaProps => (loading ?
                  <ActivityIndicator {...evaProps} color={"white"} /> : <></>)}
                style={{ backgroundColor: "#F95E62" }}
                disabled={false}
                onPress={submitForm}>
                {loading ? "" : "Login"}
              </Button>
            </>
          )}
        </Formik>
      </Layout>
    </Layout>
  )
}
