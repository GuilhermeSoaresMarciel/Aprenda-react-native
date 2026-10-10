import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import stylesDefault from "./../utils/stylesDefault.js";

const theme = stylesDefault();

const DEVELOPER_USER = "GUI.DEV";

export default function DeveloperAuthorization({ navigation }) {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const typed = user.trim().toLowerCase();

    if (typed === "") {
      setError("Digite o usuário do desenvolvedor.");
      return;
    }

    if (typed !== DEVELOPER_USER.toLowerCase()) {
      setError("Usuário não autorizado.");
      return;
    }

    setError("");
    navigation.navigate("StatesEventsAndInteractivity");
  }

  function handleChange(text) {
    setUser(text);
    setError("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Área restrita</Text>
        </View>

        <Text style={styles.title}>Acesso do desenvolvedor</Text>
        <Text style={styles.description}>
          Informe o usuário do desenvolvedor para continuar.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={user}
            onChangeText={handleChange}
            onSubmitEditing={handleLogin}
            placeholder="Digite o usuário"
            placeholderTextColor={theme.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.buttonOutline,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.bgMain,
    padding: theme.padding * 2,
  },
  pressed: {
    opacity: 0.8,
  },

  card: {
    gap: theme.gap * 1.5,
    backgroundColor: theme.bgSecond,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius * 1.5,
    padding: theme.padding * 2,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap * 0.8,
    backgroundColor: theme.bgOnSoft,
    borderWidth: 1,
    borderColor: theme.bgOn,
    paddingVertical: theme.padding * 0.6,
    paddingHorizontal: theme.padding * 1.4,
    borderRadius: theme.borderRadius * 3,
  },
  badgeDot: {
    width: theme.gap * 0.8,
    height: theme.gap * 0.8,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.accent,
  },
  badgeText: {
    color: theme.textColor,
    fontSize: theme.fontSmall,
    fontWeight: "600",
  },

  title: {
    color: theme.textColor,
    fontSize: theme.fontTitle,
    fontWeight: "800",
    lineHeight: theme.fontTitle * 1.2,
  },
  description: {
    color: theme.textMuted,
    fontSize: theme.fontText,
    lineHeight: theme.lineHeight,
  },

  field: {
    gap: theme.gap / 2,
  },
  label: {
    color: theme.textColor,
    fontSize: theme.fontSmall,
    fontWeight: "700",
  },
  input: {
    backgroundColor: theme.bgMain,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius,
    color: theme.textColor,
    fontSize: theme.fontText,
    paddingVertical: theme.padding * 1.3,
    paddingHorizontal: theme.padding * 1.5,
  },
  inputError: {
    borderColor: "rgb(255, 107, 107)",
  },
  errorText: {
    color: "rgb(255, 107, 107)",
    fontSize: theme.fontSmall,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.bgOn,
    paddingVertical: theme.padding * 1.3,
    borderRadius: theme.borderRadius * 1.5,
  },
  buttonOutline: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.border,
    paddingVertical: theme.padding * 1.3,
    borderRadius: theme.borderRadius * 1.5,
  },
  buttonText: {
    color: theme.textColor,
    fontSize: theme.fontText,
    fontWeight: "700",
  },
});
