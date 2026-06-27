// import {Colors} from '@/src/constants/Colors';
// import {moderateScale, verticalScale} from '@/src/constants/utils';
// import fontFamily from '@/src/styles/fontFamily';
// import {useMemo} from 'react';
// import {StyleSheet} from 'react-native';

// const useProfileStyles = () => {
//   return useMemo(
//     () =>
//       StyleSheet.create({
//         container: {
//           flex: 1,
//           backgroundColor: '#F9F9F9',
//         },
//         scrollContent: {
//           paddingHorizontal: moderateScale(24),
//           paddingTop: verticalScale(16),
//           paddingBottom: verticalScale(32),
//           gap: verticalScale(24),
//         },

//         // ─── Header Section ───────────────────────────────
//         sectionHeading: {
//           fontFamily: fontFamily.bold,
//           fontSize: moderateScale(30),
//           lineHeight: moderateScale(36),
//           color: '#1A1C1C',
//           letterSpacing: -0.5,
//         },
//         sectionSubtitle: {
//           marginTop: verticalScale(6),
//           fontFamily: fontFamily.regular,
//           fontSize: moderateScale(14),
//           lineHeight: moderateScale(22),
//           color: '#546069',
//         },

//         // ─── Primary Profile Card ─────────────────────────
//         profileCard: {
//           backgroundColor: Colors.white,
//           borderRadius: moderateScale(8),
//           padding: moderateScale(24),
//           overflow: 'hidden',
//           shadowColor: '#1A1C1C',
//           shadowOffset: {width: 0, height: 24},
//           shadowOpacity: 0.06,
//           shadowRadius: 48,
//           elevation: 4,
//         },
//         decorativeBlob: {
//           position: 'absolute',
//           width: moderateScale(128),
//           height: moderateScale(128),
//           borderRadius: moderateScale(64),
//           top: -moderateScale(64),
//           right: -moderateScale(20),
//           backgroundColor: 'rgba(170, 0, 29, 0.05)',
//         },
//         companyRow: {
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: moderateScale(20),
//         },
//         logoWrap: {
//           width: moderateScale(64),
//           height: moderateScale(64),
//           borderRadius: moderateScale(4),
//           backgroundColor: '#F3F3F3',
//           overflow: 'hidden',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         logoPlaceholder: {
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#D7E4EF',
//           opacity: 0.9,
//         },
//         companyName: {
//           fontFamily: fontFamily.bold,
//           fontSize: moderateScale(16),
//           lineHeight: moderateScale(28),
//           color: '#1A1C1C',
//         },
//         tenantBadge: {
//           marginTop: verticalScale(4),
//           alignSelf: 'flex-start',
//           backgroundColor: '#E8E8E8',
//           borderRadius: moderateScale(2),
//           paddingHorizontal: moderateScale(10),
//           paddingVertical: verticalScale(2),
//         },
//         tenantBadgeText: {
//           fontFamily: fontFamily.semiBold,
//           fontSize: moderateScale(10),
//           lineHeight: moderateScale(16),
//           color: '#546069',
//           letterSpacing: moderateScale(1.2),
//         },

//         // ─── Details Grid ──────────────────────────────────
//         detailsGrid: {
//           marginTop: verticalScale(28),
//           gap: verticalScale(16),
//         },
//         detailRow: {
//           flexDirection: 'row',
//           gap: moderateScale(16),
//         },
//         detailItem: {
//           flex: 1,
//           gap: verticalScale(4),
//         },
//         detailLabel: {
//           fontFamily: fontFamily.semiBold,
//           fontSize: moderateScale(12),
//           lineHeight: moderateScale(16),
//           color: '#546069',
//           letterSpacing: moderateScale(1.2),
//         },
//         detailValue: {
//           fontFamily: fontFamily.medium,
//           fontSize: moderateScale(16),
//           lineHeight: moderateScale(24),
//           color: '#1A1C1C',
//         },
//         detailSub: {
//           fontFamily: fontFamily.regular,
//           fontSize: moderateScale(14),
//           lineHeight: moderateScale(20),
//           color: '#546069',
//         },
//         divider: {
//           height: 1,
//           backgroundColor: '#E8E8E8',
//         },

//         // ─── Info / Callout Card ───────────────────────────
//         calloutCard: {
//           flexDirection: 'row',
//           alignItems: 'flex-start',
//           gap: moderateScale(16),
//           backgroundColor: '#F3F3F3',
//           borderRadius: moderateScale(8),
//           padding: moderateScale(20),
//         },
//         calloutIconWrap: {
//           marginTop: verticalScale(2),
//           width: moderateScale(20),
//           height: moderateScale(20),
//           borderRadius: moderateScale(10),
//           backgroundColor: 'rgba(170, 0, 29, 0.15)',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         calloutIconDot: {
//           width: moderateScale(8),
//           height: moderateScale(8),
//           borderRadius: moderateScale(4),
//           backgroundColor: '#AA001D',
//         },
//         calloutTitle: {
//           fontFamily: fontFamily.semiBold,
//           fontSize: moderateScale(14),
//           lineHeight: moderateScale(20),
//           color: '#1A1C1C',
//         },
//         calloutBody: {
//           marginTop: verticalScale(6),
//           fontFamily: fontFamily.regular,
//           fontSize: moderateScale(14),
//           lineHeight: moderateScale(22),
//           color: '#546069',
//         },
//         calloutButton: {
//           marginTop: verticalScale(12),
//           alignSelf: 'flex-start',
//         },
//         calloutButtonText: {
//           fontFamily: fontFamily.semiBold,
//           fontSize: moderateScale(12),
//           lineHeight: moderateScale(16),
//           color: '#AA001D',
//           letterSpacing: moderateScale(1.2),
//         },
//         crossBtn: {
//           position: 'absolute',
//           top: -10,
//           right: -5,
//           width: 30,
//           height: 30,
//           borderRadius: moderateScale(15),
//           backgroundColor: Colors.darkGray,
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//       }),
//     [],
//   );
// };

// export default useProfileStyles;
