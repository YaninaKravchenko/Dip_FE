import styled from 'styled-components';

export const StyledLabel = styled('label')`
  display: flex;
  flex-direction: column;
  width: 55%;
  margin: 5px 0;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
`;

export const StyledInput = styled('input')`
  height: 56px;
  margin: 5px 15px 5px 0;
  padding: 0 0 0 15px;
  border: 1px solid #a8a8a8;
  border-radius: 5px;
  font-size: 18px;
  line-height: 32px;

  &:focus {
    border: 1px solid #6be;
    outline: none;
  }
`;
