
import React, { useState, useEffect, useRef } from 'react';
// import { Input,Button, Card, Badge } from 'react-native-elements';
import {connect} from 'react-redux';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {Button, Overlay} from 'react-native-elements';

 function SnapScreen(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  var camera = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  var cameraDisplay;

  if(hasPermission && props.isFocused){
    cameraDisplay = <Camera 
      style={{ flex: 1 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
       <View    
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
          >
           <IconIonic
            name="md-reverse-camera"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.torch
                );
              }}
            >
            <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
           </TouchableOpacity>

        </View>
    </Camera>
  } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
  }
  //  console.log(resultCloudinary);    

  return (
    <View style={{flex: 1}}>
        <Overlay isVisible={visible}  width="auto" height="auto">
            <Text>Loading</Text>
        </Overlay>
        
        {cameraDisplay}
        <Button
            icon={
                <IconFontAwesome
                name="save"
                size={20}
                color="#ffffff"
                />
            } 
            title=" Snap"
            buttonStyle={{backgroundColor: "#009788"}}
            type="solid"
            onPress={async () => {
                setVisible(true);
                if (camera) {
                    let photo = await camera.takePictureAsync({quality : 0.7});
                    // console.log(photo);
                    var data = new FormData();
                    data.append('userPic', {
                      uri: photo.uri,
                      type: 'image/jpeg',
                      name: 'user_avatar.jpg',
                    });
                   
                    var rawResponse = await fetch("http://10.2.3.12:3000/upload", {
                      method: 'post',
                      body: data
                    }) 
                   
                    var responseFromBack = await rawResponse.json();
                      console.log(responseFromBack,"OOOOUUUUU");
                    
                    props.onSnapPic(responseFromBack);

                    setVisible(false); 
                } 
            }
          }
        />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSnapPic: function(responseFromBack ) { 
        dispatch( {type: 'savePic', urlToReducer: responseFromBack } ) 
    }
  }
}

export default connect(
  null, 
 mapDispatchToProps
)(withNavigationFocus(SnapScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
