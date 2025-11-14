import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button,
  ScrollView
} from "react-native";
import { useSession } from "@/hooks/ctx";
import { useRouter } from "expo-router";
import { authJson } from "@/utils/api";
import Header from "@/components/Header";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import baseUrl from "@/utils/baseUrl";
import Modal from "react-native-modal";
import NewTransaction from "@/components/NewTransaction";

export default function Home() {
  const { session, signOut, isLoading, user } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !session) {
      router.replace({ pathname: "/sign-in" });
    }
  }, [isLoading, session]);

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any | null>(null);

  const fetchDashboard = React.useCallback(async () => {
    setLoading(true);
    try {
      const { res, data } = await authJson(`${baseUrl}/dashboard`, {
        method: "GET",
      });
      if (res.ok) {
        setData(data?.data ?? null);
      } else if (res.status === 401) {
        signOut();
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      signOut();
    } finally {
      setLoading(false);
    }
  }, [signOut]);

  React.useEffect(() => {
    if (session) fetchDashboard();
  }, [session, fetchDashboard]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View
        style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}
      >
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#666" }}>
                {(() => {
                  const h = new Date().getHours();
                  if (h < 5) return "Good Night";
                  if (h < 12) return "Good Morning";
                  if (h < 18) return "Good Afternoon";
                  return "Good Evening";
                })()}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {user?.username ?? ""}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={{ padding: 8 }}>
              <Text style={{ color: "#00A877", fontWeight: "600" }}>
                This month
              </Text>
            </TouchableOpacity>
          </View>

          {/* Card */}
          <View
            style={{
              marginTop: 18,
              backgroundColor: "#00A877",
              borderRadius: 16,
              padding: 18,
              elevation: 2,
            }}
          >
            <Text style={{ color: "white", opacity: 0.9 }}>Total Balance</Text>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "800",
                marginTop: 6,
              }}
            >
              {loading ? "..." : data ? formatCurrency(data.balance) : "-"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 14,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "48%",
                  backgroundColor: "#01874955",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>Income</Text>
                <Text
                  style={{ color: "white", fontWeight: "700", marginTop: 6 }}
                >
                  {loading
                    ? "..."
                    : data
                    ? formatCurrency(data.totalIncome)
                    : "-"}
                </Text>
              </View>
              <View
                style={{
                  width: "48%",
                  backgroundColor: "#01874955",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>Expenses</Text>
                <Text
                  style={{ color: "white", fontWeight: "700", marginTop: 6 }}
                >
                  {loading
                    ? "..."
                    : data
                    ? formatCurrency(data.totalExpense)
                    : "-"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={toggleModal}
              style={{
                height: 45,
                width: "100%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                backgroundColor: "#01874988",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <FontAwesome6 name="plus" size={18} color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Recent Expenses
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: "#00A877" }}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 12 }}>
            {loading ? (
              <ActivityIndicator />
            ) : data?.recentTransactions?.length ? (
              <FlatList
                style={{ maxHeight: 300 }}
                data={data.recentTransactions}
                keyExtractor={(item: any) => item._id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#f0f0f0",
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "700" }}>
                        {item.description ?? "Untitled"}
                      </Text>
                      <Text style={{ color: "#666", marginTop: 4 }}>
                        {formatDate(item.date)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontWeight: "700",
                        color:
                          item.type?.toLowerCase() === "income"
                            ? "green"
                            : "red",
                      }}
                    >
                      {formatCurrency(item.amount)}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <Text style={{ color: "#666" }}>No recent transactions</Text>
            )}
          </View>
        </View>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
          <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20, marginBottom: 20}}>Add New Transaction!</Text>
            <NewTransaction closeModal={()=>setModalVisible(false)} />
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

function formatCurrency(value: number | string | null | undefined) {
  const num =
    typeof value === "string" ? parseFloat(value) : ((value ?? 0) as number);
  try {
    return `₦${Number(num).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;
  } catch (e) {
    return `₦${num}`;
  }
}

function formatDate(input: string | number | Date | undefined) {
  if (!input) return "";
  const d = new Date(input);
  return d.toLocaleDateString();
}
