import { apiWithAuth } from "@/api/client";
import { getDateRanges, getRandomColor } from "@/common/utils";
import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { useCategory } from "@/store/useCategory";
import { useDashboard } from "@/store/useDashboard";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { daily, weekly, monthly } = getDateRanges();
  const { summary, setSummary } = useDashboard();
  const { categories, setCategories } = useCategory();
  const [active, setActive] = useState("Monthly");
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

  const handleToggle = useCallback(
    async (period: string) => {
      setActive(period);
      let startD, endD;
      if (period === "Daily") {
        startD = daily.startDate;
        endD = daily.endDate;
      } else if (period === "Weekly") {
        startD = weekly.startDate;
        endD = weekly.endDate;
      } else {
        startD = monthly.startDate;
        endD = monthly.endDate;
      }
      try {
        const res = await apiWithAuth.get("transaction/categories", {
          params: { startDate: startD, endDate: endD },
        });
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    [
      daily.endDate,
      daily.startDate,
      monthly.endDate,
      monthly.startDate,
      setCategories,
      weekly.endDate,
      weekly.startDate,
    ]
  );

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
          <View style={styles.toggleWrapper}>
            {["Daily", "Weekly", "Monthly"].map((item) => (
              <TouchableOpacity key={item} onPress={() => handleToggle(item)}>
                <Text
                  style={[
                    styles.toggleItem,
                    active === item && styles.activeToggle,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.listWrapper}>
            {categories?.map((item) => (
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
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary },
  header: {
    paddingTop: 60,
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
    borderWidth: 2,
    borderColor: "#7B61FF", // màu viền tím
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  toggleItem: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#C0C0C0", // màu viền nhạt
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
});
