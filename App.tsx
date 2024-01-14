import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NotificationList from "./components/NotificationList";
import NewNotificationForm from "./components/NewNotificationForm";
import { colors } from "./assets/globals";
import UIButton from "./components/ui/UIButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import generateId from "./components/helpers/generateId";
export type Notification = {
  title: string;
  description: string;
  id: string;
  date: Date;
};
export default function App() {
  useEffect(() => {
    const getNotifications = async () => {
      const notifications = await AsyncStorage.getItem("notifications");

      if (notifications) {
        setNotifications(JSON.parse(notifications));
      }
    };
    getNotifications();
  }, []);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [showForm, setShowForm] = useState(true);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };



  const handleAddNewMessage = async (
    title: string,
    description: string,
    dateTime: Date
  ) => {
    const newNotification: Notification = {
      title: title,
      description: description,
      id: generateId(),
      date: dateTime,
    };
    setNotifications([...notifications, newNotification]);
    await AsyncStorage.setItem(
      "notifications",
      JSON.stringify([...notifications, newNotification])
    );
    toggleShowForm();
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: colors.matisse950,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Notify
        </Text>
        <UIButton
          variant={showForm ? "danger" : "secondary"}
          onPress={toggleShowForm}
        >
          {showForm ? "Cancel" : "New"}
        </UIButton>
      </View>
      {showForm && <NewNotificationForm onSubmit={handleAddNewMessage} />}
      <NotificationList
        handleRemoveNotification={handleRemoveNotification}
        notifications={notifications}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: colors.matisse50,
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    gap: 30,
    color: colors.matisse950,

    paddingTop: "20%",
  },
  header: {
    width: "100%",
    alignItems: "center",
    display: "flex",

    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: "5%",
  },
  newButton: {
    backgroundColor: colors.matisse200,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
  },
});

//1. Make a notification list component
//2. Make a button to add new notifications
//3.
