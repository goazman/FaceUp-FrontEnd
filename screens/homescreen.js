
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Input,Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default function HomeScreen({ navigation }) {
  return (
      <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Input
                containerStyle={{width: '70%'}}
                inputStyle={{marginLeft: 10}}
                placeholder='UserName'
                leftIcon={{ type: 'font-awesome', name: 'user', color:'#009788'}}
                
            />
          <Button
              buttonStyle={{backgroundColor:"#009788"}}
              title="Go to gallery"
              onPress={() => navigation.navigate('Gallery')}
          />
        </View>
      </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});


