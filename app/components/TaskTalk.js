import { View, Image, Pressable } from "react-native";

import microphone from "./../assets/microphone.png";

import { startTalk } from "./../utils/Talk";

export default function TaskTalk(props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          startTalk(props.content);
        }}
      >
        <Image style={{ width: 35, height: 35 }} source={microphone} />
      </Pressable>
    </View>
  );
}
