import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

const colors = {
  bgApp: '#DFE3EF',
  bgPrimary: '#34387C',
  fontPrimary: '#EEE',
  warning: '#23276B',
  error: '#DE3E44',
  success: '#1BA345'
}

export default createGlobalStyle`
  html {
    font-size: 10px;
  }
  
  * {
    font-family: sans-serif;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    
    a, a:active {
      text-decoration: none;
    }
  }

  .global-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  :root {
    --bg-app: ${colors.bgApp};
    --bg-app-dark: ${darken(0.04, colors.bgApp)};
    --bg-primary: ${colors.bgPrimary};
    --bg-primary-dark: ${darken(0.09, colors.bgPrimary)};
    --font-primary: ${colors.fontPrimary};
    --font-primary-dark: ${darken(0.3, colors.fontPrimary)};
    --warning: ${colors.warning};
    --error: ${colors.error};
    --success: ${colors.success};
  }
`;