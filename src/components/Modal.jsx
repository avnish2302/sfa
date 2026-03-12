import styled from "styled-components";

export default function Modal({ title, data = {}, onClose }) {
  return (
    <Overlay>
      <Box>
        <Header>
          {title && <Title>{title}</Title>}

          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>

        <Content>
          {Object.entries(data).map(([key, value]) => (
            <Row key={key}>
              <Key>{key}</Key>
              <Value>{value}</Value>
            </Row>
          ))}
        </Content>
      </Box>
    </Overlay>
  );
}

/* ===== styles ===== */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 6px;
  width: 70rem; /* Modal width */
  max-height: 80vh; /* Restrict modal height */
  overflow-y: auto; /* Scroll if content overflows */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 1.8rem;
  text-decoration: underline;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #e42f22;

  &:hover {
    color: #9b1c1c;
  }
`;

const Content = styled.div`
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 0.6rem;
`;

const Key = styled.div`
  font-weight: 600;
  flex: 0 0 40%; /* Fixed width for keys */
`;

const Value = styled.div`
  flex: 0 0 60%; /* Fixed width for values */
  word-wrap: break-word;
  white-space: nowrap; /* Prevent wrapping */
  text-overflow: ellipsis;
  overflow: hidden;
  
  &:before {
    content: ": ";
    margin-right: 0.4rem;
  }
`;