import styled from 'styled-components';

export const Table = styled.table`
  font-size: 1.4rem;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: scroll;
  white-space: nowrap;

  thead tr th {
    background-color: var(--bg-primary);
    color: var(--font-secondary);
    padding: 15px 20px;
  }

  tbody tr td {
    padding: 15px 20px;
  }
`;