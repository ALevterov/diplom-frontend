import PropTypes from 'prop-types'
import { createContext } from 'react'

// project import
import defaultConfig from './config'
import useLocalStorage from '../hooks/useLocalStrorage'
// import useLocalStorage from 'hooks/useLocalStorage';

// initial state
const initialState = {
  ...defaultConfig,
  locale: 'ru',
  container: false,
  onChangeMenuType: () => {},
  onChangePresetColor: () => {},
  onChangeLocale: () => {},
  onChangeRTL: () => {},
  onChangeContainer: () => {},
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onChangeOutlinedField: () => {},
}

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState)

function ConfigProvider({ children }: { children: any }) {
  // if (typeof window === 'undefined') {
  //   return;
  // }
  const [config, setConfig] = useLocalStorage('berry-next-js-config', {
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    presetColor: initialState.presetColor,
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout,
  })

  const onChangeMenuType = (navType: any) => {
    setConfig({
      ...config,
      navType,
    })
  }

  const onChangePresetColor = (presetColor: any) => {
    setConfig({
      ...config,
      presetColor,
    })
  }

  const onChangeLocale = (locale: any) => {
    setConfig({
      ...config,
      locale,
    })
  }

  const onChangeRTL = (rtlLayout: any) => {
    setConfig({
      ...config,
      rtlLayout,
    })
  }

  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container,
    })
  }

  const onChangeFontFamily = (fontFamily: any) => {
    setConfig({
      ...config,
      fontFamily,
    })
  }

  const onChangeBorderRadius = (event: any, newValue: any) => {
    setConfig({
      ...config,
      borderRadius: newValue,
    })
  }

  const onChangeOutlinedField = (outlinedFilled: any) => {
    setConfig({
      ...config,
      outlinedFilled,
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeMenuType,
        onChangePresetColor,
        onChangeLocale,
        onChangeRTL,
        onChangeContainer,
        onChangeFontFamily,
        onChangeBorderRadius,
        onChangeOutlinedField,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node,
}

export { ConfigProvider, ConfigContext }
