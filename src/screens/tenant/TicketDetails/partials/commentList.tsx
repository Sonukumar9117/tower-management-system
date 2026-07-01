import TextComp from '@/src/components/TextComp';
import {Colors} from '@/src/constants/Colors';
import {useUser} from '@/src/storage/store';
import fontFamily from '@/src/styles/fontFamily';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/src/util/responsiveDimension';
import React, {useEffect, useState} from 'react';
import {Pressable, TextInput, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type CommentListProp = {
  commentList: any[];
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleComment: () => void;
};
const CommentList: React.FC<CommentListProp> = props => {
  const {role} = useUser();
  const {commentList, comment, setComment, handleComment} = props;
  const [fiveComment, setFiveComment] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    setFiveComment(() => {
      const fiveComment: any[] = [];
      for (let i = 0; i < Math.min(commentList.length, 3); i++) {
        fiveComment.push(commentList[commentList.length - 1 - i]);
      }
      return fiveComment.reverse();
    });
  }, [commentList]);
  return (
    <View>
      <TextComp text="Comments" style={styles.updatesLabel} />
      {commentList && commentList?.length == 0 && role != 'ADMIN' ? (
        <View style={styles.noCommentContainer}>
          <MaterialCommunityIcons
            name="message-off-outline"
            size={50}
            color={Colors.red}
          />
          <TextComp
            text="No Comments Yet"
            style={{
              marginTop: 6,
              color: Colors.red,
              fontSize: moderateScale(14),
              fontWeight: 'condensed',
            }}
          />
          <TextComp
            text="Internal notes and update will appear here"
            style={styles.mszTxt}
          />
        </View>
      ) : null}
      <View style={styles.updatesWrap}>
        {(!showMore ? fiveComment : commentList).map((text, index) => (
          <View
            key={index.toString()}
            style={[styles.messageCard, styles.messageCardTonal]}>
            <View style={styles.messageHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.avatar, styles.avatarMgmt]}>
                  <TextComp isDynamic text="PM" style={styles.avatarTextMgmt} />
                </View>
                <View>
                  <TextComp text="Admin" style={styles.messageName} />
                </View>
              </View>
              <TextComp text="" style={styles.messageTime} />
            </View>
            <TextComp text={text} style={styles.messageBody} />
          </View>
        ))}
        {commentList?.length > 3 ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Pressable onPress={() => setShowMore(prev => !prev)}>
              <TextComp
                text={showMore ? 'View Less' : 'View More'}
                style={{fontSize: moderateScale(15), color: Colors.black}}
              />
            </Pressable>
          </View>
        ) : null}
        {role == 'Admin' ? (
          <View style={styles.commentBox}>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Add a comment..."
              placeholderTextColor={Colors.brown}
              multiline
              textAlignVertical="top"
              style={styles.commentInput}
            />
            <Pressable
              style={[
                styles.postUpdateBtn,
                {opacity: !comment.trim() ? 0.6 : 1},
              ]}
              disabled={!comment}
              onPress={handleComment}>
              <TextComp text="Post Update" style={styles.postUpdateText} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(CommentList);
const styles = StyleSheet.create({
  noCommentContainer: {
    marginTop: 10,
    width: '100%',
    height: moderateScale(160),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    // elevation: 1,
    paddingVertical: 10,
  },
  postUpdateText: {
    fontFamily: fontFamily.medium,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    color: Colors.white,
  },
  postUpdateBtn: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(8),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.red,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(6),
  },
  commentBox: {
    marginTop: verticalScale(2),
    borderWidth: 1,
    borderColor: Colors.commentBox,
    borderRadius: moderateScale(8),
    backgroundColor: Colors.white,
    padding: moderateScale(12),
  },
  commentInput: {
    minHeight: verticalScale(68),
    fontFamily: fontFamily.regular,
    fontSize: moderateScale(14),
    color: Colors.brownishBlack,
  },
  mszTxt: {
    paddingHorizontal: horizontalScale(50),
    marginTop: 10,
    textAlign: 'center',
    color: Colors.red,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  updatesLabel: {
    fontFamily: fontFamily.bold,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: Colors.brown,
    letterSpacing: moderateScale(1),
  },
  updatesWrap: {
    marginTop: verticalScale(12),
    gap: verticalScale(10),
  },
  messageCard: {
    borderRadius: moderateScale(8),
    padding: moderateScale(14),
  },
  messageCardTonal: {
    backgroundColor: Colors.lightGrayishWhite,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMgmt: {
    backgroundColor: Colors.bloodRed,
  },
  avatarTextMgmt: {
    fontFamily: fontFamily.semiBold,
    fontSize: moderateScale(12),
    color: Colors.lightRedishWhite,
  },
  messageName: {
    marginLeft: moderateScale(10),
    fontFamily: fontFamily.bold,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: Colors.brownishBlack,
  },
  messageTime: {
    fontFamily: fontFamily.regular,
    fontSize: moderateScale(10),
    lineHeight: moderateScale(15),
    color: Colors.brown,
  },
  messageBody: {
    marginTop: verticalScale(8),
    fontFamily: fontFamily.regular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: Colors.brownishBlack,
  },
});
