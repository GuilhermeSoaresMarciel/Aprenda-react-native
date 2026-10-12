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
    title: "O que é um componente?",
    text: "Um componente é um pedaço independente da interface. Na prática, é uma função que retorna JSX, a descrição do que deve aparecer na tela. Pense nele como um molde de biscoito: você cria o molde uma vez e o usa quantas vezes quiser.",
    caption: "Um componente simples",
    code: `function Cartao() {
  return (
    <View>
      <Text>Olá, mundo!</Text>
    </View>
  );
}`,
    tip: "O nome do componente sempre começa com letra maiúscula. É assim que o React diferencia o seu componente de elementos nativos, como View e Text.",
  },
  {
    title: "Para que servem os componentes?",
    points: [
      "Reutilizar: o mesmo código aparece em vários lugares sem ser copiado.",
      "Organizar: cada parte do app fica em uma função com uma responsabilidade clara.",
      "Manter: para mudar o visual de um botão em todo o app, você altera um único lugar.",
      "Compor: telas grandes são montadas juntando componentes pequenos.",
    ],
  },
  {
    title: "Quando criar um componente?",
    text: "Crie um componente quando perceber uma destas situações:",
    points: [
      "O mesmo trecho de interface se repete, como botões, cartões e itens de lista.",
      "Um bloco ficou grande e difícil de ler dentro da tela.",
      "Uma parte tem função própria, como um cabeçalho, um menu ou um campo de formulário.",
    ],
    tip: "Neste app, o cartão de cada tema é o componente TaskExploration. Ele foi escrito uma vez e aparece quatro vezes na tela inicial.",
  },
  {
    title: "Como criar e usar um componente",
    text: "Primeiro, crie a função em um arquivo próprio e exporte com export default. Depois, importe onde quiser usar e escreva como se fosse uma tag. Cada tag cria uma cópia independente na tela.",
    caption: "components/Cartao.js",
    code: `import { View, Text } from "react-native";

export default function Cartao() {
  return (
    <View>
      <Text>Olá, mundo!</Text>
    </View>
  );
}`,
    caption2: "Em qualquer tela",
    code2: `import Cartao from "../components/Cartao";

export default function Tela() {
  return (
    <View>
      <Cartao />
      <Cartao />
      <Cartao />
    </View>
  );
}`,
    tip: "Se aparecer o erro 'Element type is invalid', confira se você usou export default no componente e se o caminho do import está correto.",
  },
  {
    title: "O que são props?",
    text: "Props (de properties, propriedades) são os dados que um componente recebe de quem o chama. Funcionam como os parâmetros de uma função: o mesmo componente mostra resultados diferentes dependendo do que você passa para ele.",
    caption: "Mesmo componente, dados diferentes",
    code: `function Saudacao(props) {
  return <Text>Olá, {props.nome}!</Text>;
}

<Saudacao nome="Maria" />
<Saudacao nome="João" />`,
  },
  {
    title: "Para que servem as props?",
    points: [
      "Personalizar: cada uso do componente pode ter texto, cor, imagem ou tamanho diferentes.",
      "Evitar cópias: em vez de criar um componente para cada variação, você cria um só e configura por props.",
      "Comunicar: a tela pai envia dados e funções para os componentes filhos.",
    ],
  },
  {
    title: "Quando usar props?",
    text: "Use props sempre que um componente precisa mostrar algo que muda de um uso para outro:",
    points: [
      "Um cartão que exibe títulos e imagens diferentes.",
      "Um botão que muda de texto e executa ações diferentes ao ser tocado.",
      "Um item de lista que mostra os dados de cada pessoa ou produto.",
    ],
  },
  {
    title: "Como usar props",
    text: "Receba as props no parâmetro da função. A forma mais comum é a desestruturação, que extrai cada prop pelo nome. Na hora de usar o componente, passe as props como atributos da tag: texto vai entre aspas, e números, variáveis e funções vão entre chaves.",
    caption: "Recebendo as props",
    code: `function Saudacao({ nome, idade }) {
  return (
    <Text>
      {nome} tem {idade} anos.
    </Text>
  );
}`,
    caption2: "Passando as props",
    code2: `const usuario = "Maria";

<Saudacao nome={usuario} idade={25} />
<Saudacao nome="João" idade={30} />`,
  },
  {
    title: "Valor padrão e props de função",
    text: "Você pode definir um valor padrão, usado quando a prop não é informada. Também pode passar funções como props: é assim que um componente avisa à tela que algo aconteceu, como um toque.",
    caption: "Botão reutilizável",
    code: `function Botao({ titulo = "Enviar", onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text>{titulo}</Text>
    </Pressable>
  );
}

<Botao titulo="Salvar" onPress={() => alert("Salvo!")} />
<Botao onPress={() => alert("Enviado!")} />`,
  },
  {
    title: "A prop especial: children",
    text: "O que você escreve entre a abertura e o fechamento de um componente chega a ele pela prop children. É ideal para criar moldes que aceitam qualquer conteúdo por dentro.",
    caption: "Usando children",
    code: `function Caixa({ children }) {
  return <View style={styles.caixa}>{children}</View>;
}

<Caixa>
  <Text>Qualquer conteúdo pode ficar aqui dentro.</Text>
</Caixa>`,
  },
  {
    title: "Exemplo real deste app",
    text: "O cartão de tema da tela inicial recebe quatro props: a imagem, o texto, o título do botão e a função executada ao tocar. Trocando só esses valores, o mesmo componente gera todos os cartões.",
    caption: "Componente e props trabalhando juntos",
    code: `<TaskExploration
  image={icon}
  text="Componentes e props"
  buttonTitle="Ver conteúdo"
  onPress={() => navigation.navigate("ComponentsAndProps")}
/>`,
  },
  {
    title: "Cuidados importantes",
    points: [
      "Props são somente leitura: o componente usa os valores, mas nunca os altera.",
      "Dados que mudam com o tempo, como um contador ou o texto de um campo, são tratados com estado.",
      "O nome da prop na tag precisa ser idêntico ao nome recebido na função, com as mesmas maiúsculas.",
      "Componentes de tela inteira ficam em pages, e os reutilizáveis em components.",
    ],
  },
];

const summary = [
  {
    label: "Componente",
    text: "É o molde: uma função que retorna a interface e pode ser reutilizada. Use quando algo se repete ou ficou grande demais.",
  },
  {
    label: "Props",
    text: "São os dados que personalizam cada uso do molde. Use sempre que o conteúdo muda de um uso para outro.",
  },
  {
    label: "Juntos",
    text: "Componentes pequenos, configurados por props, formam telas inteiras sem repetição de código.",
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

export default function ComponentsAndProps({ navigation }) {
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
        <Text style={styles.titleAccent}>Componentes</Text> e props
      </Text>

      <Text style={styles.description}>
        Os componentes são os blocos de construção de qualquer app React Native,
        e as props são o que permite reaproveitá-los com dados diferentes.
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
        <TaskTalk content="Componente É o molde: uma função que retorna a interface e pode ser reutilizada. Use quando algo se repete ou ficou grande demais. Props São os dados que personalizam cada uso do molde. Use sempre que o conteúdo muda de um uso para outro. Juntos Componentes pequenos, configurados por props, formam telas inteiras sem repetição de código." />
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
    color: theme.accent,
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
