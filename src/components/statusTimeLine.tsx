import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {Colors} from '../constants/Colors';
import fontFamily from '../styles/fontFamily';
import {moderateScale, verticalScale} from '../util/responsiveDimension';

type Status = 'Pending' | 'In Progress' | 'Reopend' | 'Resolved' | 'Closed';

interface Step {
  key: Status;
  label: string;
  subLabel?: string;
}

const STEPS: Step[] = [
  {
    key: 'Pending',
    label: 'Pending',
    subLabel: '',
  },
  {
    key: 'In Progress',
    label: 'In Progress',
    subLabel: '',
  },
  // {key: 'Reopend', label: 'Reopened'},
  {key: 'Resolved', label: 'Resolved'},
  // {key: 'Closed', label: 'Closed'},
];

const STATUS_ORDER: Status[] = [
  'Pending',
  'In Progress',
  // 'Reopend',
  'Resolved',
  // 'Closed',
];

interface Props {
  status: Status;
}

export default function StatusTimeline({status}: Props) {
  const currentIndex = STATUS_ORDER.indexOf(status);

  // Pulse animation for the active step
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Line fill on mount
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Pulse loop on active dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusLabel}>Current Status</Text>

      {STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;
        const isPending = index > currentIndex;
        const isLast = index === STEPS.length - 1;

        const lineHeight = lineAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', isDone ? '100%' : isActive ? '50%' : '0%'],
        });

        return (
          <View key={step.key} style={styles.row}>
            {/* Left column: dot + connector line */}
            <View style={styles.dotCol}>
              {/* Dot */}
              <View
                style={[
                  styles.dotOuter,
                  isDone && styles.dotOuterDone,
                  isActive && styles.dotOuterActive,
                  isPending && styles.dotOuterPending,
                ]}>
                {isActive && (
                  <Animated.View
                    style={[styles.pulse, {transform: [{scale: pulseAnim}]}]}
                  />
                )}
                {isDone ? (
                  <Text style={styles.checkIcon}>✓</Text>
                ) : (
                  <View
                    style={[
                      styles.dotInner,
                      isActive && styles.dotInnerActive,
                      isPending && styles.dotInnerPending,
                    ]}
                  />
                )}
              </View>

              {/* Connector line */}
              {!isLast && (
                <View style={styles.lineTrack}>
                  <Animated.View
                    style={[
                      styles.lineFill,
                      {height: lineHeight},
                      isDone && styles.lineFillDone,
                      isActive && styles.lineFillActive,
                    ]}
                  />
                </View>
              )}
            </View>

            {/* Right column: text */}
            <View style={styles.textCol}>
              <Text
                style={[
                  styles.label,
                  isDone && styles.labelDone,
                  isActive && styles.labelActive,
                  isPending && styles.labelPending,
                  {
                    fontFamily: fontFamily.medium,
                    fontSize: moderateScale(15),
                    lineHeight: moderateScale(20),
                  },
                ]}>
                {step.label}
              </Text>
              {step.subLabel && (isDone || isActive) && (
                <Text style={styles.subLabel}>{step.subLabel}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const RED = '#E53935';
const RED_LT = '#FFCDD2';
const GREY = '#BDBDBD';
const GREEN = '#43A047';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingHorizontal: 0,
    paddingBottom: 0,
    // backgroundColor: '#fff',
    borderRadius: 16,
    // margin: 16,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: fontFamily.gaglin,
    color: Colors.black,
  },
  row: {flexDirection: 'row', minHeight: 60},
  dotCol: {alignItems: 'center', width: 36},
  textCol: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },

  /* Dot */
  dotOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: GREY,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  dotOuterDone: {borderColor: GREEN, backgroundColor: GREEN},
  dotOuterActive: {borderColor: RED, backgroundColor: '#fff'},
  dotOuterPending: {borderColor: GREY, backgroundColor: '#fff'},

  dotInner: {width: 10, height: 10, borderRadius: 5},
  dotInnerActive: {backgroundColor: RED},
  dotInnerPending: {backgroundColor: GREY},

  checkIcon: {color: '#fff', fontSize: 14, fontWeight: '700'},

  pulse: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: RED_LT,
    opacity: 0.5,
  },

  /* Connector line */
  lineTrack: {
    flex: 1,
    width: 2,
    backgroundColor: '#EEEEEE',
    marginVertical: 2,
    overflow: 'hidden',
  },
  lineFill: {width: 2},
  lineFillDone: {backgroundColor: GREEN},
  lineFillActive: {backgroundColor: RED},
  statusLabel: {
    fontFamily: fontFamily.bold,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: '#5B403E',
    letterSpacing: moderateScale(1),
    paddingBottom: verticalScale(14),
  },
  /* Text */
  label: {fontSize: 15, fontWeight: '600', color: GREY},
  labelDone: {color: GREEN},
  labelActive: {color: RED},
  labelPending: {color: '#9E9E9E'},
  subLabel: {fontSize: 12, color: '#757575', marginTop: 2},
});
