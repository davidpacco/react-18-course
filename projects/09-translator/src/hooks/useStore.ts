import { useReducer } from "react"
import { Language, type Action, type State, FromLanguage } from "../types"
import { AUTO_LANGUAGE } from "../consts"

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  originalText: '',
  translatedText: '',
  loading: false
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SWAP_LANGUAGES': {
      if (state.fromLanguage === AUTO_LANGUAGE) return state
      const loading = state.originalText !== ''

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        originalText: state.translatedText,
        translatedText: '',
        loading
      }
    }

    case 'SET_FROM_LANGUAGE': {
      if (state.fromLanguage === action.payload) return state
      const loading = state.originalText !== ''
      return {
        ...state,
        fromLanguage: action.payload,
        translatedText: '',
        loading
      }
    }

    case 'SET_TO_LANGUAGE': {
      if (state.toLanguage === action.payload) return state
      const loading = state.originalText !== ''
      return {
        ...state,
        toLanguage: action.payload,
        translatedText: '',
        loading
      }
    }

    case 'SET_ORIGINAL_TEXT': {
      const loading = action.payload !== ''

      return {
        ...state,
        loading,
        originalText: action.payload,
        translatedText: ''
      }
    }

    case 'SET_TRANSLATED_TEXT': {
      return {
        ...state,
        loading: false,
        translatedText: action.payload
      }
    }

    default:
      return state
  }
}

export function useStore() {
  const [{
    fromLanguage,
    toLanguage,
    originalText,
    translatedText,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const swapLanguages = () => {
    dispatch({ type: 'SWAP_LANGUAGES' })
  }

  const setFromLanguage = (lang: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload: lang })
  }

  const setToLanguage = (lang: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload: lang })
  }

  const setOriginalText = (payload: string) => {
    dispatch({ type: 'SET_ORIGINAL_TEXT', payload })
  }

  const setTranslatedText = (payload: string) => {
    dispatch({ type: 'SET_TRANSLATED_TEXT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    originalText,
    translatedText,
    loading,
    swapLanguages,
    setFromLanguage,
    setToLanguage,
    setOriginalText,
    setTranslatedText
  }
}