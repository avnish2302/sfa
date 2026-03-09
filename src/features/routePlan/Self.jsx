import styled from "styled-components";
import ShopName from "../../components/ShopName";
import SelfAddedTable from "../routePlan/SelfAddedTable";

export default function Self() {
  return (
    <Wrapper>
      <SelfAddedTable />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;