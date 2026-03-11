import styled from "styled-components";
import Button from "./Button";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getPunchSummary } from "../services/apiPunch";

export default function Navbar() {
  const { data: punchSummary } = useQuery({
    queryKey: ["punchSummary"],
    queryFn: getPunchSummary,
    retry: false,
  });
  const punchedIn = !!punchSummary;

  const { data: user, isLoading, isError } = useUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    // remove token
    localStorage.removeItem("token");

    // clear cached user
    queryClient.removeQueries();

    // redirect to login
    navigate("/", { replace: true });
  };

  return (
    <Styledheader>
      <Heading>SFA System</Heading>

      <ActionContainer>
        {!isLoading && !isError && user && <Username>{user.name}</Username>}
        <PunchStatus $active={punchedIn}>
          (Punch Status: {punchedIn ? "Active" : "Inactive"})
        </PunchStatus>
        <Button variation="delete" size="sm" onClick={handleLogout}>
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
const PunchStatus = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ $active }) =>
    $active ? "var(--color-green-800)" : "var(--color-grey-500)"};
`;
