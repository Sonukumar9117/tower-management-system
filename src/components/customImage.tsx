import {View, Image, ActivityIndicator} from 'react-native';
import {moderateScale} from '../util/responsiveDimension';
import {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../constants/Colors';

export default function CustomImage({
  uri = '',
  width = moderateScale(64),
  height = moderateScale(64),
  borderRadius = moderateScale(4),
}) {
  const [isError, setError] = useState(false);
  const [isImageLoading, setImageLoading] = useState(true);
  useEffect(() => {
    const isValidUri = typeof uri === 'string' && uri.startsWith('http');
    setError(!isValidUri);
  }, []);
  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isError || !uri ? (
        <MaterialIcons name="person" size={height} color="#000" />
      ) : (
        <>
          <Image
            source={{
              uri: uri,
            }}
            style={{
              width: width,
              height: height,
              borderRadius: borderRadius,
            }}
            onLoadEnd={() => {
              setImageLoading(false);
            }}
            onError={() => {
              setImageLoading(false);
              setError(true);
            }}
          />
          {isImageLoading && (
            <ActivityIndicator
              style={{position: 'absolute'}}
              size={'small'}
              color={Colors.red}
            />
          )}
        </>
      )}
    </View>
  );
}
