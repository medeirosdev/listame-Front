import React from 'react';
import { View, Image, Button, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const SERVER_URL = 'http://localhost:3333';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const AvatarUpload = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/profiles/avatar`, {
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image source={{ uri: photo.uri }} />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};
