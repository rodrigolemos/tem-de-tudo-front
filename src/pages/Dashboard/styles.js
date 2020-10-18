import styled from 'styled-components';

export const Filter = styled.div`
  width: 100%;
  padding: 1rem 0;
  
  display: flex;
  justify-content: space-around;
  align-items: center;

  input[type="date"] {
    margin-left: 10px;
  }
`;

export const ReportsArea = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem 0;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .row {
    width: 100%;
    height: 50%;
    margin-bottom: 5px;

    display: flex;
    align-items: center;
  }

  .col {
    width: 50%;
    height: 100%;
    margin: 5px;
    overflow: auto;
    flex-direction: column;
    
    /* background-color: #DDD; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const SearchHelp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: .4;

  svg {
    width: 40%;
    height: 40%;
  }
`;