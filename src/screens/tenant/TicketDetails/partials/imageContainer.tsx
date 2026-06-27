import TextComp from '@/src/components/TextComp';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {moderateScale, verticalScale} from '@/src/util/responsiveDimension';
import {downloadImage} from '@/src/util/downloadImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';
import {useState} from 'react';
import React from 'react';
import {Colors} from '@/src/constants/Colors';
import fontFamily from '@/src/styles/fontFamily';

type ImageContainerProps = {
  image: string[];
  setImageDownloading: React.Dispatch<React.SetStateAction<boolean>>;
};
const ImageContainer: React.FC<ImageContainerProps> = ({
  image,
  setImageDownloading,
}) => {
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [imageViewLink, setImageViewLink] = useState([{uri: ''}]);
  const [openingImage, setOpeningImage] = useState<number>(0);
  return (
    <View>
      <TextComp text="Attach Photos" style={styles.photoSectionLabel} />
      {image?.length == 0 ? (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../../assets/no_image.png')}
              style={styles.image}></Image>
          </View>
        </View>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.photosRow}>
            {image ? (
              image.map((item: any, index: any) => (
                <Pressable
                  key={index}
                  style={styles.photoTile}
                  onPress={() => {
                    setOpeningImage(index);
                    setImageViewVisible(true);
                    const arr: {uri: string}[] = [];
                    image?.forEach(ele => {
                      arr.push({uri: ele});
                    });
                    setImageViewLink(arr);
                  }}>
                  <Pressable
                    style={styles.downloadImageBtn}
                    onPress={() =>
                      downloadImage(item, setImageDownloading)
                    }>
                    <MaterialIcons
                      name="download"
                      size={25}
                      color={Colors.red}
                    />
                  </Pressable>
                  <Image
                    source={{uri: item ?? ''}}
                    style={styles.photoPlaceholder}
                  />
                </Pressable>
              ))
            ) : (
              <View style={styles.photoTile}>
                <View style={styles.photoPlaceholder} />
              </View>
            )}
          </View>
        </ScrollView>
      )}
      <ImageView
        images={imageViewLink}
        imageIndex={openingImage}
        visible={imageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
        HeaderComponent={() => {
          return (
            <View style={styles.closeBtn}>
              <TouchableOpacity onPress={() => setImageViewVisible(false)}>
                <Ionicons name="close" size={30} color={Colors.red} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default React.memo(ImageContainer);

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  photoSectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: '#5B403E',
    letterSpacing: moderateScale(1),
  },
  photosRow: {
    marginTop: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: '#CFCFCF',
  },
  photoTile: {
    position: 'relative',
    width: verticalScale(100),
    minHeight: verticalScale(100),
    marginLeft: moderateScale(4),
    aspectRatio: 1,
    borderRadius: moderateScale(4),
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
  },
  imageContainer: {
    elevation: 1,
    borderRadius: 10,
    marginVertical: 20,
  },
  downloadImageBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20, // change position here
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 100,
  },
  image: {
    height: moderateScale(150),
    width: moderateScale(150),
    borderRadius: moderateScale(10),
  },
});
