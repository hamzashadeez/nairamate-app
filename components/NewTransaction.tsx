import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Picker } from "@expo/ui/jetpack-compose";

const NewTransaction = ({ closeModal }: any) => {
  const [selectedIndex, setSelectedIndex]: any = React.useState(0);
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>NewTransaction</Text>
      <Picker
        options={["Income", "$$", "$$$", "$$$$"]}
        selectedIndex={selectedIndex}
        onOptionSelected={({ nativeEvent: { index } }) => {
          setSelectedIndex(index);
        }}
        variant="segmented"
      />
    </ScrollView>
  );
};

export default NewTransaction;

const styles = StyleSheet.create({});
