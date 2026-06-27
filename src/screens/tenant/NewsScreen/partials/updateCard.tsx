import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useUser} from '@/src/storage/store';
import {usePostStore} from '@/src/storage/usePostStore';
import {Text, Image} from 'react-native';
import {WatchIcon} from '@/src/assets/icons';
import {Colors} from '@/src/constants/Colors';
import {SCREEN_NAME} from '@/src/constants/screenname';
import {navigationRef} from '@/App';
import LoaderModal from '@/src/components/loaderModal';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WarningModal from '@/src/components/warningModal';
import CustomImage from '@/src/components/customImage';
import {formatTimeDifference} from '@/src/util/formatTimeDifference';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '@/src/util/responsiveDimension';
import {downloadImage} from '@/src/util/downloadImage';
import {styles} from './updateCardStyles';

const UpdateCard = React.memo(({item}: any) => {
  const {role} = useUser();
  const {deletePost} = usePostStore();
  const [isBtnVisible, setBtnVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDownloadingImage, setImageDownloading] = useState(false);
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [openingImage, setOpeningImage] = useState<number>(0);
  const [imageViewLink, setImageViewLink] = useState([{uri: ''}]);
  const {width} = useWindowDimensions();
  const {name, image} = item?.postedBy ?? {};

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={styles.leftBorder} />
        <View style={{padding: 10, width: '100%'}}>
          <View style={styles.headerRow}>
            <CustomImage
              uri={image}
              width={moderateScale(35)}
              height={moderateScale(35)}
              borderRadius={moderateScale(5)}
            />
            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={styles.company}>
                {name ?? ''}
              </Text>
              <Text style={styles.announcement}>Official Announcement</Text>
            </View>

            <View style={styles.timeBox}>
              <WatchIcon />
              <Text style={styles.timeText}>
                {formatTimeDifference(item?.createdAt)}
              </Text>
            </View>
            {role == 'Admin' ? (
              <TouchableOpacity onPress={() => setBtnVisible(prev => !prev)}>
                {!isBtnVisible ? (
                  <Icon name="more-vert" size={24} color={Colors.black} />
                ) : (
                  <Icon name="close" size={24} color={Colors.black} />
                )}
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Title */}
          <Text style={styles.title}>{item?.title}</Text>

          {item?.image?.length > 0 ? (
            <ScrollView
              horizontal
              style={{height: 200}}
              contentContainerStyle={{gap: 10}}
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - (item?.image?.length == 1 ? 55 : 80)} // width + margin
              decelerationRate="fast"
              snapToAlignment="start">
              {item?.image?.map((uri: string, index: number) => (
                <Pressable
                  // style={styles.photoTile}
                  onPress={() => {
                    setOpeningImage(index);
                    setImageViewVisible(true);
                    const arrayImages: {uri: string}[] = [];
                    item?.image?.forEach(element => {
                      arrayImages.push({uri: element});
                    });
                    setImageViewLink(arrayImages);
                  }}>
                  <Pressable
                    style={styles.downloadImageBtn}
                    onPress={() =>
                      downloadImage(uri, setImageDownloading)
                    }>
                    <MaterialIcons
                      name="download"
                      size={25}
                      color={Colors.red}
                    />
                  </Pressable>
                  <Image
                    key={index.toString()}
                    source={{
                      uri: uri,
                    }}
                    style={[
                      styles.image,
                      {width: width - (item?.image?.length == 1 ? 55 : 80)},
                    ]}
                  />
                </Pressable>
              ))}
            </ScrollView>
          ) : null}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.description}>{item?.description}</Text>
          </View>
        </View>
      </View>
      {isBtnVisible ? (
        <View style={styles.editDelBtnContainer}>
          <View style={styles.editBtnContainer}>
            <TouchableOpacity
              style={styles.alignRowCenter}
              onPress={() => {
                setBtnVisible(false);
                navigationRef.navigate(SCREEN_NAME.POST_EDIT, {post: item});
              }}>
              <Icon name="edit" size={20} color={Colors.red} />
              <Text style={styles.editBtnTxt}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 2}}
              onPress={() => {
                setBtnVisible(false);
                setVisible(true);
              }}>
              <Icon name="delete" size={20} color={Colors.red} />
              <Text style={styles.editBtnTxt}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <ImageView
        images={imageViewLink}
        imageIndex={openingImage}
        visible={imageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
        presentationStyle="overFullScreen"
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
      <Modal visible={visible} transparent animationType="fade">
        <WarningModal
          message={''}
          onCancel={() => setVisible(false)}
          onOk={() => {
            setVisible(false);
            deletePost(item?._id);
          }}
        />
      </Modal>
      <LoaderModal isVisible={isDownloadingImage} />
    </View>
  );
});

export default React.memo(UpdateCard);
