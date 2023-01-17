import React from 'react'
import { useReducer } from 'react'
import ThemeContext from './themeContext'

const ACTIONS = {
    TOGGLE_THEME: 'toggle theme'
}

const themes = {
    light: '#FFFFFF',
    dark: '#808080'
}

const themeReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_THEME: {
            if (action.payload === true) {
                return {...state, theme: themes.dark}
            }
            if (action.payload === false) {
                return {...state, theme: themes.light}
            }
        }
    }
}

const ThemeProvider = (props) => {
    const [state, dispatch] = useReducer(themeReducer, { theme: '#808080' })

    const isDarkThemeActivated = (isActivated) => dispatch({ type: ACTIONS.TOGGLE_THEME, payload: isActivated})

    const themeContext = {
        isDarkThemeActivated: isDarkThemeActivated,
        theme: state.theme
    }

  return (
    <ThemeContext.Provider value={themeContext}>
        {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;