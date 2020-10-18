import styled from 'styled-components';

export const Filter = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  background-color: #DDD;
  padding: 2rem 0;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
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
    overflow: scroll;
    flex-direction: column;
    
    /* background-color: #DDD; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;