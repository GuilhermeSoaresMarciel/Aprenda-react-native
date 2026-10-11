import * as Speech from "expo-speech";

export function lerTexto(texto) {
  if (!texto) return;

  Speech.stop();

  Speech.speak(texto, {
    language: "pt-BR",
    rate: 1.0,
    pitch: 1.0,
  });
}

export function pararLeitura() {
  Speech.stop();
}
