import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Notification } from "../App";
import { colors } from "../assets/globals";
import { formatDate } from "./helpers/formatDate";
import getLeftDays from "./helpers/getLeftDays";
type NotificationListProps = {
  notifications: Notification[];
  handleRemoveNotification: (id: string) => void;
};
const NotificationList = (props: NotificationListProps) => {
  const { notifications, handleRemoveNotification } = props;
  return (
    <View style={styles.notificationList}>
      <View style={styles.notificationListHeader}>
        <Text style={styles.headerText}>Your notifications</Text>
      </View>
      <View style={styles.notificationListBody}>
        {notifications.length > 0 && notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            handleRemoveNotification={handleRemoveNotification}
            notification={notification}
          />
        ))}
      </View>
    </View>
  );
};

type NotificationItemProps = {
  notification: Notification;
  handleRemoveNotification: (id: string) => void;
};
const NotificationItem = (props: NotificationItemProps) => {
  const { notification, handleRemoveNotification } = props;
  //TODO: add a button to remove notification
  const daysLeft = getLeftDays(new Date(notification.date));
  
  const daysLeftString = daysLeft >= 0 ? `(${daysLeft == 0 ? 'Today' : `${daysLeft} days left`})` : 'ERROR'
  return (
    <Pressable style={styles.notificationItem}>
      <Text style={styles.notificationItemText}>{notification.title}</Text>
      <Text style={styles.notificationItemText}>
        {`Due: ${formatDate(notification.date)}`}
        {daysLeftString}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  notificationList: {
    display: "flex",
    padding: 10,
    gap: 20,
    width: "100%",
  },
  notificationListHeader: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.matisse950,
    textAlign: "center",
  },
  notificationListBody: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
  },
  notificationItem: {
    padding: 10,
    backgroundColor: colors.matisse800,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.matisse100,
  },
  notificationItemText: {
    color: colors.matisse50,
    fontSize: 10,
  },
});

export default NotificationList;
