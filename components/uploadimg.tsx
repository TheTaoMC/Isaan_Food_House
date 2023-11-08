import React, {useState} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const uploadimg = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageHandler = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setSelectedImage(source);
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {selectedImage && (
        <Image source={selectedImage} style={{width: 200, height: 200}} />
      )}
      <Button title="Select Image" onPress={selectImageHandler} />
    </View>
  );
};

export default uploadimg;

const styles = StyleSheet.create({});
