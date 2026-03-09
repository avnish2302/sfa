import styled from "styled-components";
import ShopName from "../../components/ShopName";
import SalesmanAddedTable from "../routePlan/SalesmanAddedTable";

export default function Salesman() {
  return (
    <Wrapper>
      <SalesmanAddedTable />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;