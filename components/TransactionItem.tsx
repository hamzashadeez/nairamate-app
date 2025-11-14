import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";


const renderIcon = (description: string) => {
  return (
    <View
        style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#f0f0f0",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
        }}
    >
        {(() => {
            const icons: Record<string, string> = {
                salary: "💼",
                groceries: "🛒",
                entertainment: "🎬",
                utilities: "💡",
                shopping: "🛍️",
                transport: "🚗",
                bills: "🧾",
                food: "🍔",
                investment: "📈",
                business: "🏢",
                gift: "🎁",
            };
            return <Text style={{fontSize: 18}}>{icons[description] ?? "💰"}</Text>;
        })()}
    </View>
  );
}
const TransactionItem = ({ data }: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
      }}
    >
        {renderIcon(data?.description?.toLowerCase() ?? "")}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontWeight: "500", textTransform: "capitalize", fontSize: 18 }}>
          {data?.description ?? "Untitled"}
        </Text>
        <Text style={{ color: "#666", marginTop: 4 }}>
          {formatDate(data?.date)}
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "700",
          color: data?.type?.toLowerCase() === "income" ? "green" : "red",
        }}
      >
        {formatCurrency(data?.amount)}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({});

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
