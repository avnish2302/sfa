import styled from "styled-components";
import ShopName from "../../components/ShopName";
import SalesmanApproveAddedTable from "../routePlan/SalesmanApproveAddedTable";

export default function SelfApprove() {
  return (
    <Wrapper>
      <SalesmanApproveAddedTable />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;