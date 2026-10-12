import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";

import TaskTalk from "../components/TaskTalk";

import stylesDefault from "./../utils/stylesDefault.js";

const theme = stylesDefault();

const sections = [
  {
    title: "O que é navegação entre telas?",
    text: "Quase todo app tem mais de uma tela: início, detalhes, perfil, configurações. A navegação é o mecanismo que permite ir de uma tela para outra e voltar. No React Native, isso é feito por uma biblioteca chamada React Navigation, a mais usada do ecossistema.",
    tip: "Pense na navegação como uma pilha de cartas: cada nova tela é colocada por cima, e o botão de voltar retira a de cima, revelando a anterior.",
  },
  {
    title: "Para que serve?",
    points: [
      "Organizar o app em telas pequenas, cada uma com um objetivo claro.",
      "Controlar o caminho do usuário: ir para a frente, voltar e até enviar dados entre telas.",
      "Entregar o comportamento esperado em cada sistema, como o botão de voltar do Android e o gesto de arrastar do iOS.",
      "Gerar o cabeçalho com título e seta de voltar automaticamente.",
    ],
  },
  {
    title: "Quando usar?",
    text: "Use navegação sempre que o conteúdo não cabe bem em uma única tela ou tem finalidades diferentes:",
    points: [
      "Uma lista de itens que abre uma tela de detalhes ao ser tocada.",
      "Um fluxo em etapas, como cadastro, login e confirmação.",
      "Áreas separadas do app, como início, perfil e configurações.",
    ],
    tip: "Neste app, a tela inicial lista os temas e cada cartão abre uma tela de conteúdo. É exatamente o caso da lista que abre detalhes.",
  },
  {
    title: "Passo 1: instalar a biblioteca",
    text: "No terminal, dentro da pasta do projeto, instale o React Navigation e as dependências que ele precisa. Com o Expo, use o comando abaixo para garantir as versões compatíveis.",
    caption: "Terminal",
    code: `npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context`,
  },
  {
    title: "Passo 2: montar o navegador",
    text: "Crie um arquivo que declara todas as telas do app. O NavigationContainer envolve tudo, e o Stack.Navigator organiza as telas em pilha. Cada Stack.Screen recebe um name, que é o identificador da tela, e o component que será exibido.",
    caption: "app/Routes.js",
    code: `import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/App";
import Detalhes from "./pages/Detalhes";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,
    tip: "A primeira tela declarada é a que abre por padrão. Para escolher outra, use a prop initialRouteName.",
  },
  {
    title: "Passo 3: registrar como ponto de entrada",
    text: "O Expo precisa carregar o navegador em vez de uma tela solta. No arquivo de entrada do projeto, registre o componente Routes como raiz.",
    caption: "index.js",
    code: `import { registerRootComponent } from "expo";

import Routes from "./app/Routes";

registerRootComponent(Routes);`,
    tip: "Se o app abre mas o toque não leva a lugar nenhum, confira se o ponto de entrada registra o Routes e não a tela inicial diretamente.",
  },
  {
    title: "Passo 4: navegar para outra tela",
    text: "Toda tela registrada no navegador recebe automaticamente a prop navigation. Para ir a outra tela, chame navigation.navigate com o name que você deu no Stack.Screen.",
    caption: "Dentro de uma tela",
    code: `export default function Home({ navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("Detalhes")}>
      <Text>Ver detalhes</Text>
    </Pressable>
  );
}`,
    tip: "O texto dentro de navigate precisa ser idêntico ao name do Stack.Screen, com as mesmas maiúsculas e minúsculas.",
  },
  {
    title: "Voltar para a tela anterior",
    text: "O cabeçalho nativo já traz a seta de voltar, e o Android também volta com o botão do sistema. Se quiser um botão próprio na tela, use goBack.",
    caption: "Botão de voltar",
    code: `<Pressable onPress={() => navigation.goBack()}>
  <Text>Voltar</Text>
</Pressable>`,
  },
  {
    title: "Enviando dados entre telas",
    text: "O navigate aceita um segundo argumento: um objeto com os parâmetros. A tela de destino os lê em route.params. É assim que uma lista abre os detalhes do item certo.",
    caption: "Enviando",
    code: `navigation.navigate("Detalhes", {
  nome: "Maria",
  idade: 25,
});`,
    caption2: "Recebendo na tela de destino",
    code2: `export default function Detalhes({ route }) {
  const { nome, idade } = route.params;

  return (
    <Text>
      {nome} tem {idade} anos.
    </Text>
  );
}`,
  },
  {
    title: "Navegando fora de uma tela",
    text: "Apenas as telas registradas no navegador recebem a prop navigation. Um componente comum, como um botão ou cartão, não recebe. Nesse caso, use o hook useNavigation.",
    caption: "Em qualquer componente",
    code: `import { useNavigation } from "@react-navigation/native";

export default function BotaoDetalhes() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Detalhes")}>
      <Text>Abrir</Text>
    </Pressable>
  );
}`,
    tip: "Outra opção é a tela passar a função como prop para o componente, como este app faz com o onPress do TaskExploration.",
  },
  {
    title: "Personalizando o cabeçalho",
    text: "Use options em cada tela para mudar o título, ou screenOptions no navegador para aplicar a mesma configuração a todas. Dá para trocar cores, esconder o cabeçalho e muito mais.",
    caption: "Título e cores",
    code: `<Stack.Navigator
  screenOptions={{
    headerStyle: { backgroundColor: "rgb(20, 20, 43)" },
    headerTintColor: "rgb(255, 255, 255)",
  }}
>
  <Stack.Screen
    name="Home"
    component={Home}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="Detalhes"
    component={Detalhes}
    options={{ title: "Detalhes do item" }}
  />
</Stack.Navigator>`,
  },
  {
    title: "Exemplo real deste app",
    text: "A tela inicial deste guia mostra os temas em cartões. Cada tema tem o nome de uma tela, e ao tocar no cartão o app chama navigate com esse nome. O mesmo componente de cartão serve para todos.",
    caption: "Cartões que abrem telas",
    code: `const topics = [
  { title: "Componentes e props", screen: "ComponentsAndProps" },
  { title: "Navegação entre telas", screen: "ScreenNavigation" },
];

{topics.map((topic) => (
  <TaskExploration
    key={topic.screen}
    text={topic.title}
    onPress={() => navigation.navigate(topic.screen)}
  />
))}`,
  },
  {
    title: "Cuidados importantes",
    points: [
      "Toda tela precisa estar registrada em um Stack.Screen antes de ser usada em navigate.",
      "O nome em navigate deve ser igual ao name da tela, sem erros de digitação ou de maiúsculas.",
      "Só telas registradas recebem navigation como prop. Em outros componentes, use useNavigation.",
      "Para telas novas, o processo se repete: criar o arquivo em pages, importar no Routes e adicionar um Stack.Screen.",
    ],
  },
];

const summary = [
  {
    label: "NavigationContainer",
    text: "Envolve o app inteiro e guarda o estado da navegação. Existe um só, no Routes.",
  },
  {
    label: "Stack.Navigator e Stack.Screen",
    text: "Organizam as telas em pilha. Cada Stack.Screen tem um name e um component.",
  },
  {
    label: "navigate, goBack e params",
    text: "Navigate abre outra tela, goBack volta, e params leva dados de uma tela para a outra.",
  },
];

function CodeBlock({ caption, code }) {
  return (
    <View style={styles.codeBox}>
      <Text style={styles.codeCaption}>{caption}</Text>
      <Text style={styles.code}>{code}</Text>
    </View>
  );
}

function Section({ number, section }) {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNumber}>
          <Text style={styles.sectionNumberText}>{number}</Text>
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>

      {section.text ? <Text style={styles.text}>{section.text}</Text> : null}

      {section.points
        ? section.points.map((point) => (
            <View key={point} style={styles.point}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{point}</Text>
            </View>
          ))
        : null}

      {section.code ? (
        <CodeBlock caption={section.caption} code={section.code} />
      ) : null}

      {section.code2 ? (
        <CodeBlock caption={section.caption2} code={section.code2} />
      ) : null}

      {section.tip ? (
        <View style={styles.tip}>
          <Text style={styles.tipLabel}>Dica</Text>
          <Text style={styles.tipText}>{section.tip}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function ScreenNavigation({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.badge}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeText}>Tutorial</Text>
      </View>

      <Text style={styles.title}>
        <Text style={styles.titleAccent}>Navegação</Text> entre telas
      </Text>

      <Text style={styles.description}>
        Aprenda a levar o usuário de uma tela para outra, voltar e enviar dados
        entre elas usando o React Navigation.
      </Text>

      {sections.map((section, index) => (
        <Section key={section.title} number={index + 1} section={section} />
      ))}

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>Resumo</Text>
        {summary.map((item) => (
          <View key={item.label} style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
        <TaskTalk content="O container de navegação envolve todo o aplicativo e armazena o estado da navegação, devendo existir apenas um dentro da rota. Já as bibliotecas de navegação de telas organizam as telas em pilha. Cada tela tem um nome e um componente. Temos ainda recursos para abrir outras telas, voltar para a tela anterior e levar dados de uma tela para outra." />
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Voltar aos temas</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgMain,
  },
  content: {
    alignItems: "flex-start",
    gap: theme.gap * 2,
    padding: theme.padding * 2,
    paddingBottom: theme.padding * 4,
  },
  pressed: {
    opacity: 0.8,
  },

  badge: {
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
    fontSize: theme.fontHero,
    fontWeight: "800",
    lineHeight: theme.fontHero * 1.2,
  },
  titleAccent: {
    color: theme.accent,
  },
  description: {
    color: theme.textMuted,
    fontSize: theme.fontLead,
    lineHeight: theme.lineHeight * 1.3,
  },

  card: {
    alignSelf: "stretch",
    gap: theme.gap * 1.5,
    backgroundColor: theme.bgSecond,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius * 1.5,
    padding: theme.padding * 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap * 1.2,
  },
  sectionNumber: {
    alignItems: "center",
    justifyContent: "center",
    width: theme.iconSize * 0.7,
    height: theme.iconSize * 0.7,
    borderRadius: theme.borderRadius * 3,
    backgroundColor: theme.bgOn,
  },
  sectionNumberText: {
    color: theme.textColor,
    fontSize: theme.fontSmall,
    fontWeight: "800",
  },
  sectionTitle: {
    flex: 1,
    color: theme.textColor,
    fontSize: theme.fontSubtitle,
    fontWeight: "800",
    lineHeight: theme.fontSubtitle * 1.25,
  },
  text: {
    color: theme.textMuted,
    fontSize: theme.fontText,
    lineHeight: theme.lineHeight,
  },

  point: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.gap * 1.2,
  },
  pointDot: {
    width: theme.gap * 0.7,
    height: theme.gap * 0.7,
    marginTop: theme.gap * 0.8,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.accent,
  },
  pointText: {
    flex: 1,
    color: theme.textColor,
    fontSize: theme.fontText,
    lineHeight: theme.lineHeight,
  },

  codeBox: {
    gap: theme.gap,
    backgroundColor: theme.bgMain,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius,
    padding: theme.padding * 1.5,
  },
  codeCaption: {
    color: theme.textMuted,
    fontSize: theme.fontTiny,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  code: {
    color: theme.code,
    fontSize: theme.fontSmall,
    lineHeight: theme.lineHeight,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
  },

  tip: {
    gap: theme.gap / 2,
    backgroundColor: theme.bgOnSoft,
    borderLeftWidth: theme.padding / 2,
    borderLeftColor: theme.accent,
    borderRadius: theme.borderRadius,
    padding: theme.padding * 1.5,
  },
  tipLabel: {
    color: theme.accent,
    fontSize: theme.fontTiny,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tipText: {
    color: theme.textColor,
    fontSize: theme.fontSmall,
    lineHeight: theme.lineHeight * 0.9,
  },

  summaryTitle: {
    color: theme.accent,
    fontSize: theme.fontSmall,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summaryItem: {
    gap: theme.gap / 3,
  },
  summaryLabel: {
    color: theme.textColor,
    fontSize: theme.fontText,
    fontWeight: "700",
  },

  button: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.bgOn,
    paddingVertical: theme.padding * 1.3,
    borderRadius: theme.borderRadius * 1.5,
  },
  buttonText: {
    color: theme.textColor,
    fontSize: theme.fontText,
    fontWeight: "700",
  },
});
