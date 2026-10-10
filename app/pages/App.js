import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  ScrollView,
} from "react-native";

import icon from "./../assets/icon.png";
import stylesDefault from "./../utils/stylesDefault.js";
import TaskExploration from "../components/TaskExploration";

const theme = stylesDefault();

const topics = [
  { title: "Componentes e props", screen: "ComponentsAndProps" },
  { title: "Navegação entre telas", screen: "ScreenNavigation" },
  { title: "Listas e formulários", screen: "ListsAndForms" },
  {
    title: "Estados, eventos e interatividade",
    screen: "DeveloperAuthorization",
  },
];

const stats = [
  { value: String(topics.length), label: "Temas" },
  { value: "100%", label: "Prático" },
  { value: "∞", label: "Evolução" },
];

const pillars = [
  {
    icon: "📚",
    title: "Estudar",
    text: "Conceitos explicados de forma clara e objetiva.",
  },
  {
    icon: "🛠️",
    title: "Praticar",
    text: "Exemplos que podem ser testados no próprio app.",
  },
  {
    icon: "🤝",
    title: "Compartilhar",
    text: "Aprendizado aberto para quem está começando.",
  },
];

const lead =
  "Este projeto foi desenvolvido para consolidar os estudos do desenvolvedor e compartilhar o aprendizado de forma interativa, unindo teoria e prática de codificação em um só lugar.";

const paragraphs = [
  "A ideia nasceu da necessidade de organizar o que foi aprendido ao longo do (Curso de Desenvolvimento de Aplicativos para Mídias Digitais). Em vez de deixar anotações espalhadas, cada conceito foi transformado em um conteúdo claro, com explicações objetivas e exemplos que podem ser testados diretamente no aplicativo.",
  "Aqui você encontra os principais temas do React Native: componentes e props, navegação entre telas, listas e formulários, além de estados, eventos e interatividade. Cada tema foi pensado para ser estudado no seu próprio ritmo, do básico até situações mais próximas do dia a dia de quem desenvolve aplicativos.",
  "O projeto também funciona como portfólio e como material de revisão: serve para praticar antes das avaliações, apresentar o trabalho para a turma e mostrar, na prática, como as ideias se transformam em código. Construí-lo ajudou a fixar conceitos importantes, como a organização de componentes reutilizáveis, a estilização com StyleSheet e o uso de hooks para controlar o comportamento da tela.",
  "O objetivo final é que o estudo seja colaborativo e em constante evolução. Novos temas, exemplos e melhorias serão adicionados com o tempo, sempre com o foco em aprender fazendo e compartilhar o que foi aprendido com outras pessoas que estão começando a mesma jornada.",
];

function AppButton({ title, onPress, variant = "primary" }) {
  const isOutline = variant === "outline";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isOutline ? styles.buttonOutline : styles.buttonPrimary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function NavItem({ title, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navItem,
        active && styles.navItemActive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.navText, active && styles.navTextActive]}>
        {title}
      </Text>
    </Pressable>
  );
}

function SectionHeader({ title, description }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description ? (
        <Text style={styles.sectionDescription}>{description}</Text>
      ) : null}
    </View>
  );
}

export default function App({ navigation }) {
  const scrollRef = useRef(null);
  const headerHeight = useRef(0);
  const positions = useRef({ inicio: 0, conteudo: 0, sobre: 0 });
  const [active, setActive] = useState("inicio");

  const saveY = (name) => (event) => {
    positions.current[name] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (name) => {
    setActive(name);
    scrollRef.current?.scrollTo({
      y: Math.max(positions.current[name] - headerHeight.current, 0),
      animated: true,
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.bgSecond} />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.content}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.header}
          onLayout={(event) => {
            headerHeight.current = event.nativeEvent.layout.height;
          }}
        >
          <Image style={styles.logo} source={icon} />
          <View style={styles.nav}>
            <NavItem
              title="Início"
              active={active === "inicio"}
              onPress={() => scrollToSection("inicio")}
            />
            <NavItem
              title="Conteúdo"
              active={active === "conteudo"}
              onPress={() => scrollToSection("conteudo")}
            />
            <NavItem
              title="Sobre o projeto"
              active={active === "sobre"}
              onPress={() => scrollToSection("sobre")}
            />
          </View>
        </View>

        <View onLayout={saveY("inicio")} style={styles.hero}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Projeto da turma 🌟</Text>
          </View>

          <Text style={styles.heroTitle}>
            Aprenda <Text style={styles.heroTitleAccent}>React Native</Text> na
            prática
          </Text>

          <Text style={styles.heroSubtitle}>
            {
              "Um guia visual e completo para estudar, revisar e apresentar.\nAqui você encontra explicações claras e exemplos práticos."
            }
          </Text>

          <View style={styles.heroActions}>
            <AppButton
              title="Começar a estudar"
              onPress={() => scrollToSection("conteudo")}
            />
            <AppButton
              title="Saiba mais"
              variant="outline"
              onPress={() => scrollToSection("sobre")}
            />
          </View>

          <View style={styles.stats}>
            {stats.map((item) => (
              <View key={item.label} style={styles.statCard}>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View onLayout={saveY("conteudo")} style={styles.section}>
          <SectionHeader
            title="Escolha um tema para continuar"
            description="Cada tema reúne explicações e exemplos para você estudar no seu ritmo."
          />
          <View style={styles.list}>
            {topics.map((topic) => (
              <TaskExploration
                key={topic.screen}
                image={icon}
                text={topic.title}
                buttonTitle="Ver conteúdo"
                onPress={() => navigation.navigate(topic.screen)}
              />
            ))}
          </View>
        </View>

        <View onLayout={saveY("sobre")} style={styles.section}>
          <SectionHeader title="Sobre o projeto" />

          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardBody}>
              <Text style={styles.lead}>{lead}</Text>
              {paragraphs.map((paragraph) => (
                <Text key={paragraph.slice(0, 24)} style={styles.paragraph}>
                  {paragraph}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.pillars}>
            {pillars.map((pillar) => (
              <View key={pillar.title} style={styles.pillarCard}>
                <View style={styles.pillarIcon}>
                  <Text style={styles.pillarEmoji}>{pillar.icon}</Text>
                </View>
                <View style={styles.pillarInfo}>
                  <Text style={styles.pillarTitle}>{pillar.title}</Text>
                  <Text style={styles.pillarText}>{pillar.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Image style={styles.footerLogo} source={icon} />
          <Text style={styles.footerText}>
            Developed by: Guilherme Soares Marciel
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgMain,
  },
  content: {
    paddingBottom: theme.padding * 2,
  },
  pressed: {
    opacity: 0.8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.gap,
    backgroundColor: theme.bgSecond,
    paddingVertical: theme.padding,
    paddingHorizontal: theme.padding * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  logo: {
    width: theme.iconSize,
    height: theme.iconSize,
    borderRadius: theme.borderRadius,
  },
  nav: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: theme.gap / 2,
  },
  navItem: {
    paddingVertical: theme.padding * 0.7,
    paddingHorizontal: theme.padding * 1.2,
    borderRadius: theme.borderRadius * 2,
  },
  navItemActive: {
    backgroundColor: theme.bgOn,
  },
  navText: {
    color: theme.textMuted,
    fontSize: theme.fontSmall,
    fontWeight: "600",
  },
  navTextActive: {
    color: theme.textColor,
  },

  hero: {
    alignItems: "flex-start",
    gap: theme.gap * 2,
    paddingHorizontal: theme.padding * 2,
    paddingTop: theme.padding * 4,
    paddingBottom: theme.padding * 3,
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
  heroTitle: {
    color: theme.textColor,
    fontSize: theme.fontHero,
    fontWeight: "800",
    lineHeight: theme.fontHero * 1.2,
  },
  heroTitleAccent: {
    color: theme.accent,
  },
  heroSubtitle: {
    color: theme.textMuted,
    fontSize: theme.fontLead,
    lineHeight: theme.lineHeight * 1.3,
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.gap * 1.2,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.padding * 1.3,
    paddingHorizontal: theme.padding * 2.4,
    borderRadius: theme.borderRadius * 1.5,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: theme.bgOn,
    borderColor: theme.bgOn,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: theme.border,
  },
  buttonText: {
    color: theme.textColor,
    fontSize: theme.fontText,
    fontWeight: "700",
  },

  stats: {
    flexDirection: "row",
    gap: theme.gap,
    alignSelf: "stretch",
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: theme.gap / 2,
    backgroundColor: theme.bgSecond,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius * 1.5,
    paddingVertical: theme.padding * 1.6,
  },
  statValue: {
    color: theme.accent,
    fontSize: theme.fontSubtitle,
    fontWeight: "800",
  },
  statLabel: {
    color: theme.textMuted,
    fontSize: theme.fontTiny,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  section: {
    gap: theme.gap * 2,
    paddingHorizontal: theme.padding * 2,
    paddingVertical: theme.padding * 3,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  sectionHeader: {
    gap: theme.gap / 2,
  },
  sectionTitle: {
    color: theme.textColor,
    fontSize: theme.fontTitle,
    fontWeight: "800",
    lineHeight: theme.fontTitle * 1.2,
  },
  sectionDescription: {
    color: theme.textMuted,
    fontSize: theme.fontText,
    lineHeight: theme.lineHeight,
  },
  list: {
    gap: theme.gap * 1.2,
  },

  card: {
    flexDirection: "row",
    backgroundColor: theme.bgSecond,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius * 1.5,
    overflow: "hidden",
  },
  cardAccent: {
    width: theme.padding / 2,
    backgroundColor: theme.bgOn,
  },
  cardBody: {
    flex: 1,
    gap: theme.gap * 1.5,
    padding: theme.padding * 2,
  },
  lead: {
    color: theme.textColor,
    fontSize: theme.fontLead,
    fontWeight: "600",
    lineHeight: theme.lineHeight * 1.3,
  },
  paragraph: {
    color: theme.textMuted,
    fontSize: theme.fontText,
    lineHeight: theme.lineHeight,
  },

  pillars: {
    gap: theme.gap * 1.2,
  },
  pillarCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap * 1.5,
    backgroundColor: theme.bgSecond,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.borderRadius * 1.5,
    padding: theme.padding * 1.5,
  },
  pillarIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: theme.iconSize,
    height: theme.iconSize,
    backgroundColor: theme.bgOnSoft,
    borderRadius: theme.borderRadius * 1.5,
  },
  pillarEmoji: {
    fontSize: theme.fontSubtitle,
  },
  pillarInfo: {
    flex: 1,
    gap: theme.gap / 4,
  },
  pillarTitle: {
    color: theme.textColor,
    fontSize: theme.fontText,
    fontWeight: "700",
  },
  pillarText: {
    color: theme.textMuted,
    fontSize: theme.fontSmall,
    lineHeight: theme.lineHeight * 0.85,
  },

  footer: {
    alignItems: "center",
    gap: theme.gap,
    paddingVertical: theme.padding * 3,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  footerLogo: {
    width: theme.iconSize * 0.8,
    height: theme.iconSize * 0.8,
    borderRadius: theme.borderRadius,
    opacity: 0.8,
  },
  footerText: {
    color: theme.textMuted,
    fontSize: theme.fontSmall,
  },
});
