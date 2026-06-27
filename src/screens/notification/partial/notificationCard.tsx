import {Pressable, View, Text, TouchableOpacity, Modal} from 'react-native';
import {styles} from '../styles';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '@/src/constants/screenname';
import {formatTimeDifference} from '@/src/util/formatTimeDifference';
import {useState} from 'react';
import {useNotification} from '@/src/storage/useNotification';
import {useUser} from '@/src/storage/store';
import {useComplainStore} from '@/src/storage/useComplainStore';
import CustomImage from '@/src/components/customImage';
import {moderateScale} from '@/src/util/responsiveDimension';
import TextComp from '@/src/components/TextComp';
import WarningModal from '@/src/components/warningModal';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '@/src/constants/Colors';

function NotificationCard({
  item,
  markReadAll,
}: {
  item: any;
  markReadAll: () => void;
}) {
  const {deleteNotification} = useNotification();
  const {findById} = useComplainStore();
  const {
    createdBy,
    message,
    referenceId,
    status,
    referenceModel: type,
  } = item ?? [];
  const [visible, setVisible] = useState(false);
  const imageUri = createdBy?.image ?? '';
  const formattedTime = formatTimeDifference(item?.createdAt);
  const {unreadNotificationCount} = useUser();

  return (
    <Pressable
      style={styles.notiContainer}
      onPress={() => {
        if (unreadNotificationCount > 0) markReadAll();
        if (type == 'Complaint') {
          findById(referenceId?._id);
        }
        type == 'Complaint'
          ? navigationRef?.navigate(SCREEN_NAME.TICKET_DETAILS, {
              ticketDetails: referenceId,
            })
          : navigationRef?.navigate(SCREEN_NAME.USER_BOTTOM_TAB);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 4,
        }}>
        <View style={styles.dotContainer}>
          <View
            style={[
              styles.dotStyle,
              {
                position: 'absolute',
                backgroundColor: status == 'Unread' ? Colors.red : '',
              },
            ]}></View>
        </View>

        <View style={[styles.dotContainer, {marginLeft: 1}]}>
          <CustomImage
            uri={imageUri}
            width={moderateScale(40)}
            height={moderateScale(40)}
            borderRadius={moderateScale(20)}
          />
        </View>

        <View style={{justifyContent: 'space-evenly', flex: 1}}>
          <Text style={styles.titleText}>{message}</Text>
          <Text numberOfLines={3} style={styles.descriptionText}>
            {referenceId?.description}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Icon name="delete" size={20} color={Colors.red} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <TextComp
          text={`${formattedTime}`}
          style={{...styles.descriptionText, color: '#686868aa'}}
        />
      </View>
      <Modal visible={visible} transparent>
        <WarningModal
          message={''}
          onCancel={() => setVisible(false)}
          onOk={() => {
            setVisible(false);
            deleteNotification(item?._id);
          }}
        />
      </Modal>
    </Pressable>
  );
}

export default React.memo(NotificationCard);
