
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input,Button, Card, Badge } from 'react-native-elements';
import {connect} from 'react-redux';

function GalleryScreen(props) {

  var displayPictures = props.picToDisplay.map((allUrl,i) => {
    return(
      <Card key={i}
          image={{uri: allUrl}}>
          <Badge value="Homme" status="success"/> 
          <Badge value="70 ans" status="success" />
          <Badge value="Barbe" status="success" />
          <Badge value="Joyeux" status="success" />
          <Badge value="Cheveux gris" status="success" />
        </Card>
    )
  });

  return (
   <View containerStyle={{flex: 1,alignItems: 'center'}}>
      <Text style={{marginTop: 30,fontWeight: "bold", fontSize: 24, color:'#009788', textAlign: "center"}}>
        Julian's Gallery
      </Text>
      <ScrollView style={{marginTop: 5}}>
        {displayPictures}
      </ScrollView>
   </View>     
  )
}

function mapStateToProps(state) {
  // console.log(state);
  return { picToDisplay: state.Picture }
}
  
export default connect(
  mapStateToProps, 
  null
)(GalleryScreen);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    resizeMode: "cover",
    justifyContent: "center"
  },
});
