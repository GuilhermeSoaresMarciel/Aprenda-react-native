import * as Speech from "expo-speech";

export function startTalk(texto) {
  Speech.stop();
  Speech.speak(texto, { language: "pt-BR" });
}

export function stopTalk() {
  Speech.stop();
}
