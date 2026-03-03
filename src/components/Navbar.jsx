import styled from "styled-components";
import Button from "./Button";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
const {data : user, isLoading, isError} = useUser()

  return (
    <Styledheader>
      <Heading>SFA System</Heading>
      <ActionContainer>
         {!isLoading && !isError && user && (
          <Username>{user.name}</Username>
        )}
     
        <Button variation="delete" size="sm">
          Logout
        </Button>
      </ActionContainer>
    </Styledheader>
  );
}

const Styledheader = styled.header`
  background-color: var(--bg-main);
  border-bottom: 1px solid var(--border-color);
  padding: 1.6rem 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: 400;
  font-size: 1.8rem;
  color: var(--color-brown-700);
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Adds space between the mode toggle and logout button */
`;

const Username = styled.span`
  font-size: 1.4rem;
  color: var(--text-primary);
`;