import { Modal, StyleSheet, View } from "react-native";

export interface ModalProps {
  modalVisible: boolean;
  onRequestClose: () => void;
  content: any;
}
export default function IModal({
  modalVisible,
  onRequestClose,
  content,
}: ModalProps) {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>{content}</View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  modalText: { fontSize: 16, fontWeight: "500" },
});
