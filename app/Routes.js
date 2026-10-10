import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import stylesDefault from "./utils/stylesDefault.js";

import Home from "./pages/App";
import ComponentsAndProps from "./pages/ComponentsAndProps";
import ScreenNavigation from "./pages/ScreenNavigation";
import ListsAndForms from "./pages/ListsAndForms";
import StatesEventsAndInteractivity from "./pages/StatesEventsAndInteractivity";
import DeveloperAuthorization from "./pages/DeveloperAuthorization";

const theme = stylesDefault();
const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.bgMain,
    card: theme.bgMain,
    text: theme.textColor,
    border: theme.border,
    primary: theme.accent,
  },
};

const screens = [
  {
    name: "Home",
    component: Home,
    options: { headerShown: false },
  },
  {
    name: "ComponentsAndProps",
    component: ComponentsAndProps,
    options: { title: "Componentes e props" },
  },
  {
    name: "ScreenNavigation",
    component: ScreenNavigation,
    options: { title: "Navegação entre telas" },
  },
  {
    name: "ListsAndForms",
    component: ListsAndForms,
    options: { title: "Listas e formulários" },
  },
  {
    name: "StatesEventsAndInteractivity",
    component: StatesEventsAndInteractivity,
    options: { title: "Estados, eventos e interatividade" },
  },
  {
    name: "DeveloperAuthorization",
    component: DeveloperAuthorization,
    options: { title: "Área restrita" },
  },
];

export default function Routes() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.bgMain },
          headerTintColor: theme.textColor,
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.bgMain },
          statusBarStyle: "light",
          statusBarBackgroundColor: theme.bgMain,
        }}
      >
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
