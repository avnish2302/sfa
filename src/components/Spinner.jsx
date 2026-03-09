import styled, { keyframes } from "styled-components";

export default function Spinner() {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Loader = styled.div`
  width: 4rem;
  height: 4rem;

  border: 4px solid var(--color-grey-200);
  border-top: 4px solid var(--color-brown-600);

  border-radius: 50%;

  animation: ${spin} 0.8s linear infinite;
`;