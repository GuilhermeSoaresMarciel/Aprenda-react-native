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
    title: "O que é estado?",
    text: "Estado é a memória de um componente. É o lugar onde o app guarda informações que podem mudar com o tempo: o número de um contador, o texto de um campo, se um menu está aberto ou fechado. Sempre que o estado muda, o React redesenha a tela com o valor novo.",
    tip: "Pense no estado como o placar de um jogo: ele guarda o valor atual, e o telão (a tela) se atualiza sozinho a cada ponto marcado.",
  },
  {
    title: "Para que serve e quando usar?",
    points: [
      "Guardar dados que mudam enquanto o app está aberto, como contadores, textos digitados e itens de uma lista.",
      "Controlar a aparência: mostrar ou esconder um bloco, trocar uma cor ou destacar o item escolhido.",
      "Usar sempre que a tela precisa reagir a uma ação do usuário.",
      "Para valores que nunca mudam, como um título fixo, não precisa de estado: basta uma constante.",
    ],
  },
  {
    title: "useState: criando um estado",
    text: "No React Native, o estado é criado com o hook useState. Ele recebe o valor inicial e devolve um par: o valor atual e a função que o altera. A convenção é chamar a função de set mais o nome do valor.",
    caption: "Criando e mostrando um estado",
    code: `import { useState } from "react";
import { View, Text } from "react-native";

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <View>
      <Text>Valor: {contador}</Text>
    </View>
  );
}`,
    tip: "O hook useState precisa ser chamado dentro do componente, no topo da função, e nunca dentro de if, de laços ou de funções internas.",
  },
  {
    title: "Atualizando o estado",
    text: "Para mudar o valor, chame a função set com o novo valor. Nunca atribua direto à variável. Ao chamar o set, o React entende que algo mudou e redesenha o componente.",
    caption: "Certo e errado",
    code: `const [contador, setContador] = useState(0);

setContador(5);

contador = 5;`,
    tip: "Alterar a variável diretamente não avisa o React. O valor pode até mudar na memória, mas a tela continua mostrando o antigo.",
  },
  {
    title: "Estado com texto, booleano e mais",
    text: "O estado aceita qualquer tipo de valor. O tipo do valor inicial costuma indicar o que o estado vai guardar.",
    caption: "Tipos comuns",
    code: `const [nome, setNome] = useState("");
const [idade, setIdade] = useState(0);
const [aberto, setAberto] = useState(false);
const [usuario, setUsuario] = useState(null);
const [itens, setItens] = useState([]);`,
  },
  {
    title: "Estado com objetos e listas",
    text: "Quando o estado é um objeto ou uma lista, não altere o original. Crie uma cópia com o operador spread (...) e troque só o que mudou. Assim o React percebe a diferença e atualiza a tela.",
    caption: "Copiando antes de alterar",
    code: `const [pessoa, setPessoa] = useState({ nome: "Maria", idade: 25 });
const [tarefas, setTarefas] = useState(["Estudar"]);

setPessoa({ ...pessoa, idade: 26 });

setTarefas([...tarefas, "Praticar"]);

setTarefas(tarefas.filter((t) => t !== "Estudar"));`,
    tip: "Evite push, splice e alterar propriedades diretamente. Use spread para adicionar e filter para remover.",
  },
  {
    title: "O que são eventos?",
    text: "Eventos são as ações que acontecem na tela: um toque, um texto digitado, uma rolagem, um interruptor ligado. Cada componente oferece props que começam com on, e você passa para elas a função que deve rodar quando a ação acontece. Essa função é chamada de manipulador de evento.",
    tip: "A ideia é sempre a mesma: o usuário faz algo, o evento dispara a função, a função muda o estado, e a tela se atualiza.",
  },
  {
    title: "Eventos mais usados",
    points: [
      "onPress: toque rápido em Pressable, Button e TouchableOpacity.",
      "onLongPress: toque longo, segurando o dedo na tela.",
      "onChangeText: a cada letra digitada em um TextInput.",
      "onSubmitEditing: quando o usuário confirma o campo no teclado.",
      "onValueChange: quando um Switch é ligado ou desligado.",
      "onScroll: enquanto o usuário rola um ScrollView ou uma FlatList.",
    ],
  },
  {
    title: "Primeiro evento: um contador",
    text: "O exemplo clássico junta estado e evento. O toque no botão dispara o onPress, que chama o set e aumenta o valor. A tela mostra o número novo na hora.",
    caption: "Contador completo",
    code: `import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function Contador() {
  const [contador, setContador] = useState(0);

  function aumentar() {
    setContador(contador + 1);
  }

  return (
    <View>
      <Text>Valor: {contador}</Text>
      <Pressable onPress={aumentar}>
        <Text>Somar</Text>
      </Pressable>
    </View>
  );
}`,
    tip: "Passe a função sem parênteses: onPress={aumentar}. Com parênteses, onPress={aumentar()}, ela roda durante o desenho da tela e não no toque.",
  },
  {
    title: "Passando valores para o evento",
    text: "Quando a função precisa receber um argumento, envolva a chamada em uma função de seta. Isso é útil para reaproveitar a mesma função com valores diferentes.",
    caption: "Funções de seta",
    code: `function somar(valor) {
  setContador(contador + valor);
}

<Pressable onPress={() => somar(1)}>
  <Text>+1</Text>
</Pressable>

<Pressable onPress={() => somar(10)}>
  <Text>+10</Text>
</Pressable>`,
  },
  {
    title: "Usando o valor anterior",
    text: "Quando o novo valor depende do antigo, passe uma função para o set. Ela recebe o valor mais recente e devolve o novo. Isso evita erros quando várias atualizações acontecem juntas.",
    caption: "Atualização segura",
    code: `setContador((anterior) => anterior + 1);

setAberto((anterior) => !anterior);`,
    tip: "O padrão setAberto((anterior) => !anterior) é o jeito mais curto de alternar um booleano entre verdadeiro e falso.",
  },
  {
    title: "O que é interatividade?",
    text: "Interatividade é o resultado de tudo isso funcionando junto: o usuário age, o app responde. Um campo que filtra uma lista enquanto você digita, um cartão que expande ao toque, um botão que muda de cor quando está ativo. A tela deixa de ser uma imagem parada e passa a reagir.",
  },
  {
    title: "Mostrando e escondendo com condição",
    text: "A renderização condicional deixa o estado decidir o que aparece. Use o operador && para mostrar algo apenas quando a condição for verdadeira, e o operador ternário (? :) para escolher entre duas opções.",
    caption: "Mostrar ou esconder",
    code: `const [aberto, setAberto] = useState(false);

<Pressable onPress={() => setAberto(!aberto)}>
  <Text>{aberto ? "Fechar detalhes" : "Ver detalhes"}</Text>
</Pressable>

{aberto && <Text>Aqui estão os detalhes.</Text>}`,
    tip: "Para não mostrar nada, o React aceita null. O valor false também é ignorado, mas evite usar um número solto na condição, pois o 0 é desenhado na tela.",
  },
  {
    title: "Mudando o estilo conforme o estado",
    text: "O estado também controla o visual. Uma lista de estilos permite aplicar um estilo extra apenas quando uma condição é verdadeira.",
    caption: "Botão que fica ativo",
    code: `const [ativo, setAtivo] = useState(false);

<Pressable
  onPress={() => setAtivo(!ativo)}
  style={[styles.botao, ativo && styles.botaoAtivo]}
>
  <Text>{ativo ? "Ligado" : "Desligado"}</Text>
</Pressable>`,
  },
  {
    title: "Campo de texto e interruptor",
    text: "Os componentes de entrada seguem o mesmo padrão: um estado guarda o valor, e um evento atualiza esse estado. No TextInput, o evento é onChangeText. No Switch, é onValueChange.",
    caption: "Entradas controladas",
    code: `import { TextInput, Switch } from "react-native";

const [nome, setNome] = useState("");
const [notificacoes, setNotificacoes] = useState(false);

<TextInput value={nome} onChangeText={setNome} placeholder="Seu nome" />
<Text>Olá, {nome}!</Text>

<Switch value={notificacoes} onValueChange={setNotificacoes} />
<Text>{notificacoes ? "Ativadas" : "Desativadas"}</Text>`,
  },
  {
    title: "Reagindo a mudanças com useEffect",
    text: "Às vezes é preciso executar algo depois que o estado muda, como salvar um dado ou buscar informações. Para isso existe o hook useEffect. O segundo argumento é a lista de dependências: o efeito roda quando algum item dela muda.",
    caption: "Efeito ligado a um estado",
    code: `import { useState, useEffect } from "react";

const [contador, setContador] = useState(0);

useEffect(() => {
  console.log("O contador agora vale", contador);
}, [contador]);`,
    tip: "Com a lista vazia ([]), o efeito roda só uma vez, quando a tela aparece. Sem a lista, ele roda a cada atualização.",
  },
  {
    title: "Exemplo real deste app",
    text: "O menu do topo da tela inicial usa estado e evento juntos. O estado active guarda qual seção está selecionada. Ao tocar em um item, o onPress chama setActive, e o item toca o destaque com a cor de fundo.",
    caption: "Menu com item ativo",
    code: `const [active, setActive] = useState("inicio");

<NavItem
  title="Início"
  active={active === "inicio"}
  onPress={() => scrollToSection("inicio")}
/>

function scrollToSection(name) {
  setActive(name);
}`,
  },
  {
    title: "Cuidados importantes",
    points: [
      "Altere o estado somente pela função set, nunca atribuindo direto à variável.",
      "Em objetos e listas, crie uma cópia com spread antes de alterar.",
      "Passe a função ao evento sem parênteses, ou use uma função de seta quando precisar de argumentos.",
      "Quando o novo valor depende do antigo, use a forma com função: set((anterior) => ...).",
      "Chame os hooks sempre no topo do componente, fora de condições e laços.",
      "Guarde no estado apenas o que muda. O que pode ser calculado a partir de outro estado não precisa de um estado próprio.",
    ],
  },
];

const summary = [
  {
    label: "Estado",
    text: "É a memória do componente, criada com useState. Cada mudança, feita pela função set, redesenha a tela.",
  },
  {
    label: "Eventos",
    text: "São as ações do usuário, como onPress e onChangeText. Cada um chama uma função que normalmente altera o estado.",
  },
  {
    label: "Interatividade",
    text: "Nasce da combinação dos dois: o usuário age, o estado muda e a tela responde mostrando, escondendo ou atualizando conteúdo.",
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

export default function StatesEventsAndInteractivity({ navigation }) {
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
        <Text style={styles.titleAccent}>Estados</Text>, eventos e
        interatividade
      </Text>

      <Text style={styles.description}>
        Entenda como o app guarda informações, reage às ações do usuário e
        atualiza a tela em tempo real.
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
