import React from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

const FacebookAuth = () => {
  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Facebook login canceled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          const token = data.accessToken.toString();
          // Use the token for authentication or send it to your server for registration
        }
      }
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
    }
  };

  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('Facebook login error:', error);
          } else if (result.isCancelled) {
            console.log('Facebook login canceled');
          } else {
            handleFacebookSignIn();
          }
        }}
        permissions={['public_profile', 'email']}
      />
    </View>
  );
};

export default FacebookAuth;
