import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import React, { useRef } from "react";
import { Image, TouchableWithoutFeedback } from "react-native";

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

  return (
    <Layout style={{ height: '100%' }}>
      <Layout style={{ marginHorizontal: 20, marginTop: 20 }}>

        <Image style={{ alignSelf: 'center', aspectRatio: 4, height: 80, marginTop: 24 }}
               source={require('../../assets/minstagram-logo.png')} />

        <Input
          style={{ marginTop: 16 }}
          placeholder='Email'
          textContentType="emailAddress"
          autoCompleteType="email"
          onSubmitEditing={() => passwordRef?.current?.focus()}
        />

        <Input
          ref={passwordRef}
          style={{ marginVertical: 16 }}
          placeholder='Password'
          textContentType="password"
          autoCompleteType="password"
          accessoryRight={PasswordIcon}
          secureTextEntry={secureTextEntry}
        />

        <Button style={{ backgroundColor: "#F95E62" }}>Login</Button>
      </Layout>
    </Layout>
  )
}
