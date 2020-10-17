import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    font-size: 20px;
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
`;