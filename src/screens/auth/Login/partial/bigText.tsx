import React from 'react';
import {View} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import TextComp from '@/src/components/TextComp';
import {styles} from './styles';
export default function BigText() {
  return (
    <View style={styles.container}>
      <View style={styles.brandWrap}>
        <View style={[styles.verticalAccentWrap]}>
          <LinearGradient
            colors={[
              'rgba(217,217,217,0.95)', // strong white top
              'rgba(255,255,255,0.3)', // fade middle
              'rgba(255,255,255,0)', // transparent bottom
            ]}
            style={{
              width: 12,
            }}>
            <View style={styles.verticalAccent} />
          </LinearGradient>
        </View>

        <View style={styles.titleBlock}>
          <TextComp text="VISTA" style={styles.titlePrimary} />
          <TextComp text="TOWER" style={styles.titleSecondary} />
        </View>

        <View style={styles.subtitleRow}>
          <View style={styles.subtitleAccent} />
          <TextComp text="MANAGEMENT" style={styles.subtitleText} />
        </View>
      </View>
    </View>
  );
}
