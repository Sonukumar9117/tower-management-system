import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import useTicketStyles from './styles';
import TextComp from '@/src/components/TextComp';
import {useUser} from '@/src/storage/store';
import {useComplainStore} from '@/src/storage/useComplainStore';
import LoaderModal from '@/src/components/loaderModal';
import {moderateScale} from '@/src/util/responsiveDimension';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WarningModal from '@/src/components/warningModal';
import StatusTimeline from '@/src/components/statusTimeLine';
import {useTechnician} from '@/src/storage/useTechnicians';
import {Colors} from '@/src/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {makeCall} from '@/src/util/makeCall';
import ImageContainer from './partials/imageContainer';
import AssignTechnicianDropDown from './partials/assignTechnicianDropDown';
import CommentList from './partials/commentList';
import {useTechnicianList} from '@/src/storage/useTechnicianList';

type ComplaintStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'Closed'
  | 'Reopened';

const TicketDetails = () => {
  const route = useRoute();
  const params = route?.params?.ticketDetails;
  const {role} = useUser();
  const {id} = params ?? {};

  const {
    complaints,
    isUpdating,
    updateComplaintStatusByAdmin,
    addComment,
    deleteComplaints,
    deleting,
    assignTechnician,
    isAssiningTechnician,
    isLoading,
  } = useComplainStore();

  const complaint = complaints.find(item => item.id === id);
  console.log(complaint, 'THis is complaint log');

  const {
    createdAt,
    description,
    images,
    updatedAt,
    severity,
    complaintStatus: status,
    title,
    comments,
    complaintStatus: technicianStatus,
    technicianId,
  } = complaint ?? params;

  const {userList, fetchUserList} = useTechnicianList();
  const styles = useTicketStyles();
  const [comment, setComment] = useState('');
  const [selectedValue, setSelected] = useState(technicianId);
  const [status1, setStatus1] = useState<ComplaintStatus>(status ?? 'RESOLVED');
  const [techStatus, setTechStatus] = useState(technicianStatus);
  const [visible, setVisible] = useState(false);
  const {updateTechnicianStatus, isUpdatingStatus} = useTechnician();
  const [newSaverity, setNewSaverity] = useState(severity);
  const [commentList, setCommentList] = useState(comments);

  const [updatable, setUpdatable] = useState(false);
  const [isDownloadingImage, setImageDownloading] = useState(false);

  const handleUpdate = async () => {
    if (updatable) {
      await updateTechnicianStatus({
        complaintId: id,
        technicianStatus: techStatus,
      });
      setUpdatable(false);
    } else
      updateComplaintStatusByAdmin(
        id,
        status != status1 ? status1 : '',
        newSaverity != severity ? newSaverity : '',
      );
  };

  const handleComment = async () => {
    // await updateComplaintStatusByAdmin(id, '', '', comment.trim());
    const comments = await addComment(id, comment.trim());
    if (comments != null) setCommentList(comments);
    console.log(comments, 'THis is comment');

    setComment('');
  };

  // useEffect(() => {
  //   if (techStatus != technicianStatus) {
  //     setUpdatable(true);
  //   }
  // }, [techStatus]);

  // useEffect(() => {
  //   if (technicianId?.id != selectedValue?.id) {
  //     assignTechnician({complaintId: id, technicianId: selectedValue?.id});
  //   }
  // }, [selectedValue]);

  const updateAtText = () => {
    return updatedAt != createdAt
      ? new Date(updatedAt).toLocaleDateString('en-IN', {
          hour: 'numeric',
          minute: 'numeric',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'No update';
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  // useEffect(() => {
  //   setCommentList(comments);
  // }, [complaint]);

  return (
    <View style={{flex: 1, width: '100%', backgroundColor: Colors.white}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.heroRow}>
              <View>
                <TextComp
                  isDynamic
                  text={title ?? 'Water Leak in\nPrimary\nBathroom'}
                  style={styles.heroTitle}
                />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardAccent} />
              <TextComp text="Original Report" style={styles.sectionLabel} />
              <TextComp text={description} style={styles.reportText} />
              {role != 'TECHNICIAN' ? (
                <Pressable
                  style={{position: 'absolute', right: 4, top: 6}}
                  onPress={() => {
                    setVisible(true);
                  }}>
                  {deleting?.isDeleting ? (
                    <ActivityIndicator size={'small'} color={Colors.red} />
                  ) : (
                    <Icon
                      name="delete"
                      size={moderateScale(25)}
                      color={Colors.red}
                    />
                  )}
                </Pressable>
              ) : null}

              <View style={[styles.reportMetaRow, {flexDirection: 'column'}]}>
                {role != 'ADMIN' ? (
                  <TextComp
                    text={`Complaint Severity : ${severity}`}
                    style={styles.reportMetaText}></TextComp>
                ) : null}
                <View style={styles.reportMetaItem}>
                  <TextComp
                    text={
                      'CreatedAt: ' +
                      new Date(createdAt).toLocaleDateString('en-IN', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    }
                    style={styles.reportMetaText}
                  />
                </View>

                <View style={styles.reportMetaItem}>
                  <TextComp
                    text={'UpdatedAt: ' + updateAtText()}
                    style={styles.reportMetaText}
                  />
                </View>
              </View>
            </View>
            {role == 'TECHNICIAN' ? (
              <Pressable
                style={styles.contactAdmin}
                onPress={() => {
                  makeCall('9877664554');
                }}>
                <TextComp
                  text="Need Help? Contact admin"
                  style={{
                    fontSize: moderateScale(15),
                    fontWeight: 'bold',
                    color: Colors?.white,
                  }}
                />
                <Ionicons name="call" size={22} color={Colors.white} />
              </Pressable>
            ) : null}
            {role == 'ADMIN' ? (
              <>
                {/* {technicianId ? (
                  <View
                    style={{
                      width: '80%',
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.workStatusTxt}>
                      Technician Work Status: {technicianStatus}
                    </Text>
                  </View>
                ) : null} */}
                <AssignTechnicianDropDown
                  userList={userList}
                  setSelected={setSelected}
                  selectedValue={selectedValue}
                />
              </>
            ) : null}

            {role == 'TENANT' ? (
              <StatusTimeline status={status} />
            ) : role == 'TECHNICIAN' ? (
              <View>
                <TextComp
                  isDynamic
                  text="Update  Status"
                  style={styles.statusLabel}
                />
                <View
                  style={[
                    styles.statusOptions,
                    {opacity: status == 'RESOLVED' ? 0.4 : 1},
                  ]}>
                  {[
                    {key: 'PENDING', label: 'Pending'},
                    {key: 'IN_PROGRESS', label: 'In Progress'},
                    {key: 'RESOLVED', label: 'Resolved'},
                    // {key: 'Closed', label: 'Closed'},
                    // {key: 'Reopened', label: 'Resolved'},
                  ].map(item => {
                    const isSelected = techStatus === item.key;
                    return (
                      <TouchableOpacity
                        key={item.key}
                        style={styles.statusOption}
                        onPress={() => {
                          setTechStatus(item?.key);
                        }}
                        disabled={status == 'RESOLVED'}>
                        <View
                          style={[
                            styles.radioOuter,
                            isSelected && styles.radioOuterActive,
                          ]}>
                          {isSelected ? (
                            <View style={styles.radioInner} />
                          ) : null}
                        </View>
                        <TextComp
                          isDynamic
                          text={item?.label}
                          style={styles.statusOptionText}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View>
                <TextComp
                  isDynamic
                  text="Complaint Status"
                  style={styles.statusLabel}
                />
                <View style={styles.statusOptions}>
                  {[
                    {key: 'PENDING', label: 'Pending'},
                    {key: 'IN_PROGRESS', label: 'In Progress'},
                    {key: 'RESOLVED', label: 'Resolved'},
                    // {key: 'Closed', label: 'Closed'},
                    // {key: 'Reopened', label: 'Resolved'},
                  ].map(item => {
                    const isSelected = status1 === item.key;
                    return (
                      <TouchableOpacity
                        key={item.key}
                        style={styles.statusOption}
                        onPress={() => {
                          setStatus1(item?.key);
                        }}
                        disabled={role != 'ADMIN'}>
                        <View
                          style={[
                            styles.radioOuter,
                            isSelected && styles.radioOuterActive,
                          ]}>
                          {isSelected ? (
                            <View style={styles.radioInner} />
                          ) : null}
                        </View>
                        <TextComp
                          isDynamic
                          text={item?.label}
                          style={styles.statusOptionText}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {role == 'ADMIN' ? (
              <View style={{marginTop: 0}}>
                <TextComp
                  isDynamic
                  text="Complaint Severity"
                  style={styles.statusLabel}
                />
                <View style={styles.statusOptions}>
                  {[
                    {key: 'LOW', label: 'Low'},
                    {key: 'MEDIUM', label: 'Medium'},
                    {key: 'HIGH', label: 'High'},
                  ].map(item => {
                    const isSelected = newSaverity === item.key;
                    return (
                      <Pressable
                        key={item.key}
                        style={styles.statusOption}
                        onPress={() => {
                          setNewSaverity(item.key);
                        }}
                        disabled={role != 'ADMIN'}>
                        <View
                          style={[
                            styles.radioOuter,
                            isSelected && styles.radioOuterActive,
                          ]}>
                          {isSelected ? (
                            <View style={styles.radioInner} />
                          ) : null}
                        </View>
                        <TextComp
                          isDynamic
                          text={item.label}
                          style={styles.statusOptionText}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}
            <ImageContainer
              image={images}
              setImageDownloading={setImageDownloading}
            />
            <CommentList
              commentList={commentList ?? []}
              comment={comment}
              setComment={setComment}
              handleComment={handleComment}
            />
            {role == 'ADMIN' || role == 'TECHNICIAN' ? (
              <View style={styles.updateBtnContainer}>
                <TouchableOpacity
                  style={[
                    styles.postUpdateBtn,
                    {
                      opacity: (
                        role == 'ADMIN'
                          ? severity == newSaverity && status == status1
                          : !updatable
                      )
                        ? 0.6
                        : 1,
                    },
                  ]}
                  disabled={
                    role == 'ADMIN'
                      ? severity == newSaverity && status == status1
                      : !updatable
                  }
                  onPress={() => {
                    setUpdatable(false);
                    setTechStatus(technicianStatus);
                    setStatus1(status);
                    setNewSaverity(severity);
                  }}>
                  <Text style={styles.postUpdateText}>{'Discard Changes'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={
                    role == 'ADMIN'
                      ? severity == newSaverity && status == status1
                      : !updatable
                  }
                  style={[
                    styles.postUpdateBtn,
                    {
                      opacity: (
                        role == 'ADMIN'
                          ? severity == newSaverity && status == status1
                          : !updatable
                      )
                        ? 0.6
                        : 1,
                    },
                  ]}
                  onPress={handleUpdate}
                >
                  <Text style={styles.postUpdateText}>{'Save Changes'}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </ScrollView>
          <LoaderModal
            isVisible={
              isUpdating ||
              isAssiningTechnician ||
              isUpdatingStatus ||
              deleting.isDeleting ||
              isDownloadingImage ||
              isLoading
            }
          />
          <Modal visible={visible} transparent animationType="fade">
            <WarningModal
              message={''}
              onCancel={() => setVisible(false)}
              onOk={() => {
                setVisible(false);
                deleteComplaints(id);
              }}
            />
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TicketDetails;
