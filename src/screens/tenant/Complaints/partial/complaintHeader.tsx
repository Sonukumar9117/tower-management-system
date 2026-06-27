import {Pressable, View} from 'react-native';
import styles from '../styles';
import TextComp from '@/src/components/TextComp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '@/src/constants/Colors';
import React from 'react';

type ComplaintHeaderProp = {
  setActiveTab: React.Dispatch<React.SetStateAction<'' | 'IN_PROGRESS' | 'Pending' | 'RESOLVED'>>;
  activeTab: string;
  numberOfPendingComplaint: number;
  numberOfProgressComplaint: number;
  numberOfResolvedComplaint: number;
};

function ComplaintHeader(headerProp: ComplaintHeaderProp) {
  const {
    setActiveTab,
    activeTab,
    numberOfPendingComplaint,
    numberOfProgressComplaint,
    numberOfResolvedComplaint,
  } = headerProp;

  return (
    <View style={styles.tabContainer}>
      <Pressable
        onPress={() =>
          setActiveTab(prev => (prev == 'Pending' ? '' : 'Pending'))
        }
        style={[
          styles.tabButton,
          {
            backgroundColor:
              activeTab == 'Pending' ? '#e9b9b073' : Colors.white,
          },
        ]}>
        <View style={styles.btnContentContainer}>
          <TextComp text="PENDING" style={styles.textContent} />
          <MaterialCommunityIcons
            name="calendar-alert"
            size={24}
            color="#D32F2F"
          />
        </View>
        <TextComp
          text={numberOfPendingComplaint?.toString() ?? '0'}
          style={styles.textCnt}
        />
      </Pressable>

      <Pressable
        onPress={() => {
          setActiveTab(prev => (prev == 'IN_PROGRESS' ? '' : 'IN_PROGRESS'));
        }}
        style={[
          styles.tabButton,
          {
            backgroundColor:
              activeTab == 'IN_PROGRESS' ? '#e9b9b073' : Colors.white,
          },
        ]}>
        <View style={styles.btnContentContainer}>
          <TextComp text="IN PROGRESS" style={styles.textContent} />
          <MaterialCommunityIcons
            name="account-cog"
            size={24}
            color="#5F6B6D"
          />
        </View>
        <TextComp
          text={numberOfProgressComplaint?.toString()}
          style={styles.textCnt}
        />
      </Pressable>
      <Pressable
        onPress={() =>
          setActiveTab(prev => (prev == 'RESOLVED' ? '' : 'RESOLVED'))
        }
        style={[
          styles.tabButton,
          {
            backgroundColor:
              activeTab == 'RESOLVED' ? '#e9b9b073' : Colors.white,
          },
        ]}>
        <View style={styles.btnContentContainer}>
          <TextComp text="RESOLVED" style={styles.textContent} />
          <MaterialCommunityIcons name="check-circle" size={24} color="green" />
        </View>
        <TextComp
          text={numberOfResolvedComplaint?.toString() ?? '0'}
          style={styles.textCnt}
        />
      </Pressable>
    </View>
  );
}

export default React.memo(ComplaintHeader);
