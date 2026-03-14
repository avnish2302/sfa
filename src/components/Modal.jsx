import styled from "styled-components";

export default function Modal({ title, children, onClose }) {
  return (
    <Overlay>
      <Box>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>

        <Content>{children}</Content>
      </Box>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 6px;
  width: 70rem;
  max-height: 80vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  text-decoration: underline;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  color: #e42f22;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;