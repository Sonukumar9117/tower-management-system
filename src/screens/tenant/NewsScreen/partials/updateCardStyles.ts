import { Colors } from "@/src/constants/Colors";
import { verticalScale } from "@/src/util/responsiveDimension";
import fontFamily from "@/src/styles/fontFamily";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20, // change position here
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 100,
  },
  cardWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    position: 'relative',
    flexDirection: 'row',
  },
  leftBorder: {
    width: 3,
    backgroundColor: '#D32F2F',
    zIndex: 10,
    height: '98%',
    marginTop: 3,
    marginBottom: 3,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  company: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Poppins-Medium',
  },
  announcement: {
    fontSize: 12,
    color: '#6B7280',
  },
  timeBox: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  image: {
    width: 150,
    height: 180,
    borderRadius: 10,
    marginTop: 12,
    resizeMode: 'cover',
  },
  downloadImageBtn: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  editDelBtnContainer: {
    position: 'absolute',
    right: 30,
    top: 50,
    zIndex: 100,
    backgroundColor: Colors.white,
  },
  editBtnTxt: {
    fontFamily: fontFamily.gaglin,
    fontSize: 16,
    color: Colors.black,
  },
  editBtnContainer: {width: 60, gap: verticalScale(10), zIndex: 202},
  alignRowCenter: {flexDirection: 'row', alignItems: 'center', gap: 2},
});