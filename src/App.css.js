import styled from "styled-components";

export const Button = styled.button`
  background-color: #fff;
  margin: 1px;
  border: none;
  flex-basis: 24%;
`;

export const Calculator = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.2);
`;

export const View = styled.div`
  height: 15%;
  padding: 10px;
  text-align: right;
  font-family: "Roboto", sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: black;
`;

export const MemoryButtons = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
  & button {
    flex-basis: 19%;
    background-color: rgba(128, 128, 128, 0.25);
    border: none;
  }
`;

export const OtherButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  padding-bottom: 10px;
`;
