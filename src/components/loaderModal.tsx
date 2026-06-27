import { ActivityIndicator, Modal, View } from "react-native";
import { Colors } from "../constants/Colors";


export default function LoaderModal({isVisible = false}) {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
           backgroundColor:'rgba(0,0,0,0.3)'
        }}>
        <ActivityIndicator size={'large'} color={Colors.red} />
      </View>
    </Modal>
  );
}
