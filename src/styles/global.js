import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

export const colors = {
  bgPrimary: '#46A0E3',
  bgSecondary: '#F7BF3D',
  fontPrimary: '#2480C1',
  fontSecondary: '#EEE',
}

export default createGlobalStyle`
  html {
    font-size: 10px;
  }
  
  * {
    font-family: 'Noto Sans TC', sans-serif;
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

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #AAA; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888; 
  }

  .global-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    box-shadow: 0px 0px 15px #CBC8D1;
  }

  .content-title {
    font-size: 2.6rem;
  }

  .report-title {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: default;

    font-size: 2.2rem;
    font-weight: bold;
    margin: 2rem 0;
  }

  .badge {
    padding: .5rem 1rem;
    border-radius: .5rem;
    color: #FFF;
    background-color: var(--bg-secondary);
    transition: all .1s ease-in-out;

    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 2px 2px 5px #CBC8D1;
    }
  }

  .simple-badge {
    padding: .5rem 1rem;
    border-radius: .5rem;
    background-color: #FFF;
    border: 2px solid var(--bg-secondary);
    color: var(--bg-secondary-dark);
    font-weight: bold;
    transition: all .1s ease-in-out;

    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 2px 2px 5px #CBC8D1;
    }
  }

  .custom-table {
    font-size: 1.5rem;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    overflow: scroll;
    white-space: nowrap;
    cursor: default;
    border: 1px solid var(--font-secondary);

    thead tr th {
      background-color: var(--font-primary);
      color: var(--font-secondary);
      padding: 15px 20px;
    }

    tbody tr {
      transition: all .1s ease-in-out;
      border: 1px solid var(--font-secondary);
      box-sizing: border-box;

      &:hover {
        background-image: linear-gradient(to right, #F5F5F5, #FFFFFF);
        border-bottom: 1px solid var(--bg-secondary);
      }

      td {
        padding: 15px 20px;
      }
    }

    .center {
      text-align: center;
    }
  }

  :root {
    --bg-primary: ${colors.bgPrimary};
    --bg-primary-dark: ${darken(0.09, colors.bgPrimary)};
    --bg-secondary: ${colors.bgSecondary};
    --bg-secondary-dark: ${darken(0.09, colors.bgSecondary)};
    --font-primary: ${colors.fontPrimary};
    --font-primary-dark: ${darken(0.3, colors.fontPrimary)};
    --font-secondary: ${colors.fontSecondary};
    --font-secondary-dark: ${darken(0.3, colors.fontSecondary)};
  }
`;