import { Colors } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export interface SelectIProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange?: (itemValue: any, itemIndex: number) => void;
}
export default function ISelect({
  options,
  selectedValue,
  onValueChange,
}: SelectIProps) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {options.map((item) => {
          return (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: Colors.background },
  label: { marginBottom: 10, fontSize: 16 },
  picker: {
    height: 20,
    width: "100%",
    backgroundColor: Colors.text.colorBlack,
  },
});
