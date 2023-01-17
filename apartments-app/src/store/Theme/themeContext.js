import { createContext } from "react";

const ThemeContext = createContext({
    theme: '',
    isDarkThemeActivated: (isActivated) => {}
})

export default ThemeContext;
