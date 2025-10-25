import { apiWithAuth } from "@/api/client";
import IModal from "@/app/modal";
import { getDateRanges, getRandomColor } from "@/common/utils";
import ISelect from "@/components/select";
import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { useCategory } from "@/store/useCategory";
import { useDashboard } from "@/store/useDashboard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TransactionScreen() {
  const { user } = useAuthStore();
  const { daily, weekly, monthly } = getDateRanges();
  const { summary, setSummary } = useDashboard();
  const { categories, setCategories } = useCategory();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiWithAuth.get("transaction/dashboard", {
          params: { startDate: monthly.startDate, endDate: monthly.endDate },
        });
        setSummary(res.data?.summary);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setSummary, monthly.startDate, monthly.endDate]);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handlePrev = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Hi, {user.fullName}</Text>
          <Text style={styles.subtitle}>Good Morning</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      {/* Balance */}
      <View style={styles.balanceBox}>
        <View style={styles.balanceSection}>
          <View style={styles.subBlanceSection}>
            <Ionicons name="wallet" size={22} color="#fff" />
            <Text style={styles.balanceLabel}>Total Balance</Text>
          </View>

          <Text style={styles.balanceValue}>{summary?.balance}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.balanceSection}>
          <View style={styles.subBlanceSection}>
            <Ionicons name="trending-down" size={22} color="#fff" />
            <Text style={styles.balanceLabel}>Total Expense</Text>
          </View>

          <Text style={styles.expenseValue}>-$1,187.40</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { flex: 0.3 }]}>
          <Text style={styles.progressTextLeft}>30%</Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: "center",
          }}
        >
          <Text style={styles.progressTextRight}>$20,000.00</Text>
        </View>
      </View>

      <Text style={styles.progressText}>30% Of Your Expenses, Looks Good.</Text>

      {/* Transactions List */}
      <View style={styles.listSection}>
        <View>
          <View style={styles.containerCalendar}>
            <View style={styles.containerSubCalendar}>
              <TouchableOpacity onPress={handlePrev}>
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={Colors.text.colorBlack}
                />
              </TouchableOpacity>

              <Text style={styles.textCalendar}>{formatDate(date)}</Text>

              <TouchableOpacity onPress={handleNext}>
                <Ionicons
                  name="chevron-forward"
                  size={28}
                  color={Colors.text.colorBlack}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerSubCalendar}>
              <TouchableOpacity onPress={() => setIsOpenModal(true)}>
                <Text style={styles.addButton}>Add Transaction</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listWrapper}>
            {loading === false ? (
              categories?.map((item) => (
                <View key={item.categoryId} style={styles.listItem}>
                  <View
                    style={[styles.icon, { backgroundColor: getRandomColor() }]}
                  >
                    {/* icon ở đây */}
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.title}>{item.categoryName}</Text>
                  </View>
                  <Text style={styles.amount}>{item.totalAmount}</Text>
                </View>
              ))
            ) : (
              <View style={{ marginTop: 5 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            {categories?.length === 0 && !loading && (
              <View>
                <Text>Not found</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <IModal
        modalVisible={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        content={
          <View style={styles.formModal}>
            <Text>Add Transaction</Text>
            <View style={styles.itemInput}>
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#b0b0b0"
                // onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.itemInput}>
              <Text>Category</Text>
              <ISelect
                options={[{ label: "test", value: "test" }]}
                selectedValue={category}
                onValueChange={(value) => setCategories(value)}
              />
            </View>
            <View style={styles.itemInput}>
              <Text>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#b0b0b0"
                // onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.itemInput}>
              <Text>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#b0b0b0"
                // onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.footerModal}>
              <TouchableOpacity
                style={[
                  styles.footerButton,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={() => setIsOpenModal(false)}
              >
                <Text style={styles.footerButtonSave}>Save </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.footerButton,
                  { backgroundColor: Colors.button.bgRed },
                ]}
                onPress={() => setIsOpenModal(false)}
              >
                <Text style={styles.footerButtonClose}>Close </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary },
  header: {
    paddingTop: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: { color: Colors.text.colorBlack, fontSize: 20, fontWeight: "600" },
  subtitle: { color: Colors.text.colorBlack, marginTop: 4 },
  balanceBox: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceSection: {
    marginBottom: 14,
  },
  divider: {
    width: 1, // đường dọc
    backgroundColor: "#ffffff9e", // màu trắng
    marginHorizontal: 15, // khoảng cách 2 bên
    borderRadius: 0.5,
  },
  subBlanceSection: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  balanceLabel: { color: "#333", marginTop: 6 },
  balanceValue: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text.colorWhite,
  },
  expenseValue: { fontSize: 22, fontWeight: "700", color: "#4154FF" },
  progressContainer: {
    flexDirection: "row",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F1EB", // màu nền tổng
    overflow: "hidden",
    marginHorizontal: 20,
  },

  progressBar: {
    backgroundColor: "#0C3B2E", // màu fill (màu tối)
    justifyContent: "center",
    alignItems: "center",
  },

  progressTextLeft: {
    color: "#fff",
    fontWeight: "600",
  },

  progressTextRight: {
    color: "#000",
    fontWeight: "600",
    paddingLeft: 10,
    borderTopLeftRadius: 80,
  },

  progressText: { textAlign: "center", marginTop: 20, color: "#fff" },
  listSection: {
    backgroundColor: "#fff",
    marginTop: 22,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    height: "100%",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 14,
  },
  itemLabel: { fontSize: 16, color: "#111" },
  itemValue: { fontSize: 16, fontWeight: "600" },
  toggleWrapper: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    justifyContent: "center",
    gap: 10,
  },
  toggleItem: {
    // width: "100%",
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeToggle: {
    backgroundColor: "#3FC08C", // màu active xanh
    color: "white",
    borderColor: "#3FC08C",
  },
  listWrapper: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 12,
    padding: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  date: {
    color: "#007BFF",
  },
  amount: {
    fontWeight: "bold",
    color: "#007BFF",
  },
  containerCalendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerSubCalendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 20,
    marginBottom: 20,
  },
  textCalendar: {
    fontSize: 18,
    color: Colors.text.colorBlack,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  input: {
    padding: 14,
    borderRadius: 15,
    fontSize: 15,
    backgroundColor: Colors.input.background,
  },
  itemInput: {
    flex: 1,
    gap: 5,
  },
  formModal: {
    height: 500,
  },
  footerModal: {
    flexDirection: "row",
    marginTop: 10,
  },
  footerButtonSave: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 30,
  },
  footerButtonClose: {
    backgroundColor: Colors.button.bgRed,
    padding: 16,
    borderRadius: 30,
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
