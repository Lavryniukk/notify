import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UIButton from "./ui/UIButton";
import { colors } from "../assets/globals";
import { formatDate } from "./helpers/formatDate";

interface NewNotificationFormProps {
  onSubmit: (title: string, description: string, dateTime: Date) => void;
}

const NewNotificationForm: React.FC<NewNotificationFormProps> = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleDateChange = (date: Date) => {
      setDateTime(date);
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleSubmit = () => {
    dateTime && title && onSubmit(title, description, dateTime);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title*"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{
          ...styles.input,
          height: 100,
          textAlignVertical: "top",
        }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <UIButton variant="outline" onPress={showDatePicker}>
          Select date*
        </UIButton>
        <Text>{dateTime && formatDate(dateTime)}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        minimumDate={new Date()}
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerVisibility(false)}
        date={dateTime || new Date()}
      />
      <UIButton onPress={handleSubmit}>Add</UIButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "80%",
    backgroundColor: colors.matisse100,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    borderColor: "gray",
    color: colors.matisse700,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default NewNotificationForm;
