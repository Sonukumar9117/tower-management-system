import {Modal, Pressable} from 'react-native';
import {styles} from '../styles';
import TextComp from '@/src/components/TextComp';
import LoaderModal from '@/src/components/loaderModal';
import {SetStateAction} from 'react';
import React from 'react';
type UploadImageModalProp = {
  isUploadModalVisible: boolean;
  isCreatingPost: boolean;
  setIsUploadModalVisible: React.Dispatch<SetStateAction<boolean>>;
  openCamera: () => void;
  openGallery: () => void;
};
function UploadImageModal({
  isUploadModalVisible,
  setIsUploadModalVisible,
  openCamera,
  openGallery,
  isCreatingPost,
}: UploadImageModalProp) {
  return (
    <>
      <Modal
        visible={isUploadModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsUploadModalVisible(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsUploadModalVisible(false)}>
          <Pressable style={styles.modalCard}>
            <TextComp text="Choose Upload Source" style={styles.modalTitle} />

            <Pressable style={styles.modalActionButton} onPress={openCamera}>
              <TextComp text="Use Camera" style={styles.modalActionText} />
            </Pressable>

            <Pressable style={styles.modalActionButton} onPress={openGallery}>
              <TextComp
                text="Choose From Gallery"
                style={styles.modalActionText}
              />
            </Pressable>

            <Pressable
              style={styles.modalCancelButton}
              onPress={() => setIsUploadModalVisible(false)}>
              <TextComp text="Cancel" style={styles.modalCancelText} />
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <LoaderModal isVisible={isCreatingPost} />
    </>
  );
}

export default React.memo(UploadImageModal);
