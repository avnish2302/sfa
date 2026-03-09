import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPunchSummary } from "../services/apiPunch";

export default function Sidebar() {
  const { data } = useQuery({
    queryKey: ["punchSummary"],
    queryFn: getPunchSummary,
    retry: false,
  });

  const punchedIn = !!data;

  const links = [
    { to: "/punchin", label: "Punch In", disabled: punchedIn },
    { to: "/checkin", label: "Check In", disabled: !punchedIn },
    { to: "/checkout", label: "Check Out", disabled: !punchedIn },
    { to: "/punchout", label: "Punch Out", disabled: !punchedIn },
    { to: "/routes", label: "Routes", disabled: false },
  ];

  return (
    <Container>
      <TopSection>
        <Logo>SFA</Logo>
      </TopSection>

      <Nav>
        {links.map((item) => (
          <StyledNavLink
            key={item.to}
            to={item.to}
            $disabled={item.disabled}
            onClick={(e) => item.disabled && e.preventDefault()}
          >
            {item.label}
          </StyledNavLink>
        ))}
      </Nav>
    </Container>
  );
}

const Container = styled.div`
  width: 24rem;
  height: 100vh;
  background-color: var(--bg-main);
  color: var(--text-primary);
  padding: 2rem;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const Logo = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-brown-700);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-sm);
  font-size: 1.4rem;
  transition: all 0.2s ease;

  color: var(--text-secondary);

  &.active {
    background-color: var(--color-brown-100);
    color: var(--color-brown-700);
    font-weight: 500;
  }

  &:not(.active):hover {
    background-color: ${({ $disabled }) =>
      $disabled ? "transparent" : "var(--color-brown-100)"};

    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  }
`;