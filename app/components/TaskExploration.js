import { View, Text, Image, Button } from "react-native";

import stylesDefault from "./../utils/stylesDefault.js";

export default function TaskExploration(props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: stylesDefault().gap,
        backgroundColor: stylesDefault().bgSecond,
        padding: stylesDefault().padding * 1.5,
        borderRadius: stylesDefault().borderRadius,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: stylesDefault().borderRadius,
        }}
        source={props.image}
      />
      <Text
        style={{
          color: stylesDefault().textColor,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {props.text}
      </Text>
      <Button
        color={stylesDefault().bgOn}
        title={props.buttonTitle}
        onPress={props.onPress}
      />
    </View>
  );
}
