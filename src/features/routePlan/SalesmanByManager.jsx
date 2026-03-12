import styled from "styled-components";

import SalesmanByManagerAddedTable from "../routePlan/SalesmanByManagerAddedTable";

export default function SalesmanByManager() {
  return (
    <Wrapper>
      <SalesmanByManagerAddedTable />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;