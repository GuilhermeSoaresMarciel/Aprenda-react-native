import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";

import stylesDefault from "./../utils/stylesDefault.js";

const theme = stylesDefault();

const sections = [
  {
    title: "O que são listas?",
    text: "Listas mostram vários itens do mesmo tipo, um abaixo do outro: contatos, produtos, mensagens, tarefas. Em vez de escrever cada item à mão, você guarda os dados em um array e deixa o código gerar a interface de cada um.",
    tip: "A ideia central é: dados em um array, e um componente que sabe desenhar um item. O React repete esse desenho para todos os itens.",
  },
  {
    title: "Para que servem e quando usar?",
    points: [
      "Mostrar dados que vêm de um servidor ou de uma lista que cresce com o tempo.",
      "Evitar repetição: um único modelo de item serve para 3 ou para 3.000 registros.",
      "Usar sempre que você tiver mais de um item parecido, como feeds, catálogos, históricos e menus.",
      "Para listas longas, usar a FlatList, que desenha só o que aparece na tela e deixa o app rápido.",
    ],
  },
  {
    title: "Lista simples com map",
    text: "Para listas curtas e fixas, basta percorrer o array com map e retornar um componente para cada item. Cada item precisa de uma prop key com um valor único, para o React saber quem é quem quando a lista muda.",
    caption: "Usando map",
    code: `const frutas = ["Maçã", "Banana", "Uva"];

<View>
  {frutas.map((fruta) => (
    <Text key={fruta}>{fruta}</Text>
  ))}
</View>`,
    tip: "Sem a prop key, o React avisa no console. Use um identificador único, como um id. Evite usar o índice do array quando a lista pode mudar de ordem.",
  },
  {
    title: "FlatList: a lista otimizada",
    text: "Com muitos itens, o map desenha todos de uma vez, e o app fica pesado. A FlatList desenha apenas os itens visíveis e vai criando os outros conforme o usuário rola. Ela também já traz a rolagem, então não precisa de um ScrollView.",
    caption: "Os três ingredientes",
    code: `import { FlatList, Text } from "react-native";

const contatos = [
  { id: "1", nome: "Maria" },
  { id: "2", nome: "João" },
  { id: "3", nome: "Ana" },
];

<FlatList
  data={contatos}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.nome}</Text>}
/>`,
    tip: "data é o array, renderItem diz como desenhar cada item (que chega dentro de um objeto, por isso o { item }), e keyExtractor devolve a chave única de cada um.",
  },
  {
    title: "Recursos extras da FlatList",
    text: "A FlatList aceita props para os casos mais comuns, sem você precisar montar tudo na mão.",
    caption: "Separador, lista vazia e cabeçalho",
    code: `<FlatList
  data={contatos}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.nome}</Text>}
  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
  ListEmptyComponent={<Text>Nenhum contato ainda.</Text>}
  ListHeaderComponent={<Text>Meus contatos</Text>}
/>`,
  },
  {
    title: "O que são formulários?",
    text: "Formulários são as telas em que o usuário digita informações: login, cadastro, busca, comentários. No React Native, o campo de texto é o componente TextInput, e o que o usuário digita é guardado no estado com useState.",
  },
  {
    title: "Para que servem e quando usar?",
    points: [
      "Receber dados do usuário, como nome, e-mail, senha ou mensagem.",
      "Criar fluxos de cadastro e login.",
      "Fazer buscas e filtros, que reagem enquanto a pessoa digita.",
      "Adicionar itens a uma lista, como uma nova tarefa ou um novo contato.",
    ],
  },
  {
    title: "TextInput: o campo de texto",
    text: "O TextInput é o campo onde o usuário digita. As props mais usadas são placeholder (texto de dica), value (o texto atual) e onChangeText (função chamada a cada letra digitada).",
    caption: "Um campo básico",
    code: `import { TextInput } from "react-native";

<TextInput
  placeholder="Digite seu nome"
  placeholderTextColor="rgb(180, 180, 214)"
/>`,
    tip: "O placeholder usa a cor padrão do sistema. Em um app escuro, defina placeholderTextColor para o texto de dica não ficar apagado.",
  },
  {
    title: "Campo controlado com useState",
    text: "Para saber o que foi digitado, você guarda o texto em um estado. O value mostra o estado no campo, e o onChangeText atualiza o estado a cada letra. Esse padrão se chama campo controlado, e é o mais usado em formulários.",
    caption: "Lendo o que o usuário digita",
    code: `import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");

  return (
    <View>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
      />
      <Text>Olá, {nome}!</Text>
    </View>
  );
}`,
  },
  {
    title: "Vários campos no mesmo formulário",
    text: "Cada campo pode ter o seu estado. Com poucos campos, isso é simples e fácil de ler.",
    caption: "Nome e e-mail",
    code: `const [nome, setNome] = useState("");
const [email, setEmail] = useState("");

<TextInput value={nome} onChangeText={setNome} placeholder="Nome" />
<TextInput value={email} onChangeText={setEmail} placeholder="E-mail" />`,
  },
  {
    title: "Ajustando o campo ao tipo de dado",
    text: "O TextInput tem props que adaptam o teclado e o comportamento ao que o usuário vai digitar. Elas deixam o formulário mais confortável e evitam erros.",
    caption: "Props úteis",
    code: `<TextInput
  keyboardType="email-address"
  autoCapitalize="none"
/>

<TextInput secureTextEntry placeholder="Senha" />

<TextInput keyboardType="numeric" maxLength={11} />

<TextInput multiline numberOfLines={4} placeholder="Mensagem" />`,
    tip: "keyboardType muda o teclado (email-address, numeric, phone-pad), secureTextEntry esconde a senha, autoCapitalize evita maiúscula automática, maxLength limita os caracteres e multiline permite várias linhas.",
  },
  {
    title: "Enviando e validando",
    text: "Um botão chama uma função que confere se os dados estão corretos antes de seguir. Se algo estiver errado, mostre uma mensagem para o usuário em vez de continuar.",
    caption: "Validando antes de enviar",
    code: `const [nome, setNome] = useState("");
const [erro, setErro] = useState("");

function enviar() {
  if (nome.trim() === "") {
    setErro("Digite o seu nome.");
    return;
  }
  setErro("");
  alert("Bem-vindo, " + nome + "!");
}

<TextInput value={nome} onChangeText={setNome} />
{erro ? <Text>{erro}</Text> : null}
<Pressable onPress={enviar}>
  <Text>Entrar</Text>
</Pressable>`,
    tip: "O método trim() remove espaços do começo e do fim, evitando que alguém envie um campo preenchido só com espaços.",
  },
  {
    title: "Juntando tudo: lista de tarefas",
    text: "O exemplo clássico mistura os dois assuntos: um formulário adiciona itens, e uma lista mostra todos. Ao adicionar, criamos um novo array com o item incluído, e a lista se atualiza sozinha.",
    caption: "Formulário que alimenta a lista",
    code: `const [texto, setTexto] = useState("");
const [tarefas, setTarefas] = useState([]);

function adicionar() {
  if (texto.trim() === "") return;
  const nova = { id: Date.now().toString(), titulo: texto };
  setTarefas([...tarefas, nova]);
  setTexto("");
}

<TextInput value={texto} onChangeText={setTexto} />
<Pressable onPress={adicionar}>
  <Text>Adicionar</Text>
</Pressable>

<FlatList
  data={tarefas}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.titulo}</Text>}
/>`,
    tip: "Nunca altere o array do estado diretamente (com push, por exemplo). Crie um novo array com o spread, como em [...tarefas, nova], para a tela atualizar.",
  },
  {
    title: "Quando o teclado cobre o campo",
    text: "Em telas com formulário, o teclado pode esconder os campos de baixo. O KeyboardAvoidingView empurra o conteúdo para cima enquanto o teclado está aberto.",
    caption: "Evitando o teclado",
    code: `import { KeyboardAvoidingView, Platform } from "react-native";

<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
  {/* campos do formulário */}
</KeyboardAvoidingView>`,
  },
  {
    title: "Exemplo real deste app",
    text: "A lista de temas da tela inicial usa exatamente o padrão de lista: um array de dados e um componente que desenha cada item. Para adicionar um novo tema, basta incluir um objeto no array, sem mexer no desenho.",
    caption: "Lista de temas com map",
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
      "Toda lista precisa de chaves únicas: key no map e keyExtractor na FlatList.",
      "Evite colocar uma FlatList dentro de um ScrollView da mesma direção. Isso gera aviso e perde a otimização. Use a FlatList sozinha ou o map para listas curtas.",
      "Nunca altere o array ou o objeto do estado diretamente. Crie uma cópia com spread e use a função set.",
      "Todo campo controlado precisa de value e onChangeText juntos. Se faltar um deles, o campo trava ou não atualiza.",
      "Valide os dados antes de enviar e mostre mensagens claras de erro.",
    ],
  },
];

const summary = [
  {
    label: "Listas",
    text: "Dados em um array, desenhados por um modelo de item. Use map para listas curtas e FlatList para listas longas, sempre com chaves únicas.",
  },
  {
    label: "Formulários",
    text: "TextInput guarda o que o usuário digita no estado, com value e onChangeText. Valide antes de enviar.",
  },
  {
    label: "Juntos",
    text: "Um formulário adiciona dados ao estado, e a lista mostra o resultado, atualizando sozinha a cada mudança.",
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

export default function ListsAndForms({ navigation }) {
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
        <Text style={styles.titleAccent}>Listas</Text> e formulários
      </Text>

      <Text style={styles.description}>
        Aprenda a mostrar vários itens na tela com listas e a receber o que o
        usuário digita com formulários.
      </Text>

      {sections.map((section, index) => (
        <Section
          key={section.title + index}
          number={index + 1}
          section={section}
        />
      ))}

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>Resumo</Text>
        {summary.map((item) => (
          <View key={item.label} style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
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
