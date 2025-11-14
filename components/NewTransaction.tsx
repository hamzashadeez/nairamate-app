import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import baseUrl from "@/utils/baseUrl";

const NewTransaction = ({ closeModal, fetchDashboard }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [categoryIsFocus, setCategoryIsFocus] = useState(false);
  const [note, setNote] = React.useState("");

  const submitTransaction = async () => {
    setLoading(true);
    try {
      // Submit transaction logic here
      const response = await fetch(`${baseUrl}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(amount.trim()),
          description: category.toLocaleLowerCase().trim(),
          type: type.toLocaleLowerCase().trim(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Refresh dashboard data
        fetchDashboard();
        closeModal();
      } else {
        closeModal();
        alert(data?.error || "Transaction submission failed");
      }
    } catch (error) {
      console.error("Transaction submission error:", error);
    } finally {
      setLoading(false);
      closeModal();
    }
    // Submit transaction logic here
  };

  const transactionTypeList = [
    { label: "Income", value: "income" },
    { label: "expense", value: "expense" },
  ];

  const incomeCategoryList = [
    { label: "Salary", value: "salary" },
    { label: "Business", value: "business" },
    { label: "Investment", value: "investment" },
    { label: "Gift", value: "gift" },
    { label: "Other", value: "other" },
  ];

  const expenseCategoryList = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Other", value: "other" },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            width: "94%",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 10,
            color: "seagreen",
            marginBottom: 3,
          }}
        >
          Select Transaction Type
        </Text>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "seagreen" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={transactionTypeList}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"Select Transaction Type"}
          value={type}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setType(item.value);
            setIsFocus(false);
          }}
        />

        <Text
          style={{
            width: "94%",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 15,
            color: "seagreen",
            marginBottom: 3,
          }}
        >
          Amount(₦)
        </Text>

        <TextInput
          placeholder="Amount (₦)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 7,
            borderColor: "lightgray",
            backgroundColor: "white",
          }}
        />
      </View>
      <Text
        style={{
          width: "94%",
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 15,
          color: "seagreen",
          marginBottom: 3,
        }}
      >
        Select Category
      </Text>

      <Dropdown
        style={[
          styles.dropdown,
          categoryIsFocus && { borderColor: "seagreen" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={type === "income" ? incomeCategoryList : expenseCategoryList}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Select Transaction Category"}
        value={category}
        onFocus={() => setCategoryIsFocus(true)}
        onBlur={() => setCategoryIsFocus(false)}
        onChange={(item) => {
          setCategory(item.value);
          setCategoryIsFocus(false);
        }}
      />

      <View
        style={{
          height: "80%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => submitTransaction()}
          style={{
            backgroundColor: "#00A877",
            width: "100%",
            paddingVertical: 15,
            borderRadius: 7,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            {loading ? "Loading..." : "Submit Transaction"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={{
            backgroundColor: "whitesmoke",
            width: "100%",
            paddingVertical: 15,
            borderRadius: 7,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewTransaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
