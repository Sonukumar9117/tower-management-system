import React from 'react';
import { Modal, View, Text, Button ,StyleSheet ,TouchableOpacity} from 'react-native';

const ConfirmationDialog = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Modal
    transparent={true}
    animationType="slide"
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={styles.modalContainer}>
      <View style={styles.dialogBox}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  dialogBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', 
    height:'30%',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: 'white',
  },
  noButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize:16
  },
});
export default ConfirmationDialog;
