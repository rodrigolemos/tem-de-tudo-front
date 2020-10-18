import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

const colors = {
  bgPrimary: '#46A0E3',
  fontPrimary: '#2480C1',
  fontSecondary: '#EEE',
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
    background-color: #DCD9E2;
    
    a, a:active {
      text-decoration: none;
    }
  }

  .global-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    box-shadow: 0px 0px 15px #CBC8D1;
  }

  :root {
    --bg-primary: ${colors.bgPrimary};
    --bg-primary-dark: ${darken(0.09, colors.bgPrimary)};
    --font-primary: ${colors.fontPrimary};
    --font-primary-dark: ${darken(0.3, colors.fontPrimary)};
    --font-secondary: ${colors.fontSecondary};
    --font-secondary-dark: ${darken(0.3, colors.fontSecondary)};
    --warning: ${colors.warning};
    --error: ${colors.error};
    --success: ${colors.success};
  }
`;