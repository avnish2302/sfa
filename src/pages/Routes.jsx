import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Self from "../features/routePlan/Self";
import SalesmanApprove from "../features/routePlan/SalesmanApprove";
import SalesmanByManager from "../features/routePlan/SalesmanByManager";

export default function Routes() {
  const navigate = useNavigate();
  const { tab = "routes" } = useParams();

  const tabs = [
    { key: "self", label: "Self" },
    { key: "salesman-approve", label: "Salesman Approve" },
    { key: "salesman-by-manager", label: "Salesman (by manager)" },
  ];

  return (
    <Wrapper>
      <Title>Routes</Title>

      <Tabs>
        {tabs.map((t) => (
          <TabButton
            key={t.key}
            $active={tab === t.key}
            data-active={tab === t.key}
            onClick={() => navigate(`/routes/${t.key}`)}
          >
            {t.label}
          </TabButton>
        ))}
      </Tabs>

    
        {tab === "self" && <Self/>}
        {tab === "salesman-approve" && <SalesmanApprove/>}
        {tab === "salesman-by-manager" && <SalesmanByManager/>}
    
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brown-700);
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
`;

const TabButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  background-color: ${({ $active }) =>
    $active ? "var(--color-brown-100)" : "var(--color-grey-200)"};
  color: ${({ $active }) =>
    $active ? "var(--color-brown-700)" : "var(--text-primary)"};

  ${({ $active }) =>
    $active &&
    `
    font-weight: 500;
  `}

  &:not([data-active="true"]):hover {
    background-color: var(--color-brown-100);
  }
`;


