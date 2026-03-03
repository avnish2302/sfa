import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useAssetAssignment } from "../../hooks/useAssetAssignment";
import AssetAssignmentTable from "./AssetAssignmentTable";
import AssetAssignmentAddedTable from "./AssetAssignmentAddedTable";
import AddRowButton from "../../components/AddRowButton";

export default function AssetAssignment() {
  const asset = useAssetAssignment();

  return (
    <Wrapper>
       <HeaderRow>
    <span>Assets being assigned to :</span>
  </HeaderRow>
    <AddRowButton onClick={asset.addRow} />

      <Card width="100rem">
        <Section>
          <AssetAssignmentTable asset={asset} />

          <Center>
            <Button
              variation="primary"
              size="md"
              onClick={asset.handleAdd}
              disabled={!asset.isValid()}
            >
              Add
            </Button>
          </Center>
        </Section>
      </Card>

      {asset.saved.length > 0 && (
        <Card width="100rem">
          <Section>
            <AssetAssignmentAddedTable asset={asset} />

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={asset.handleSaveToDatabase}
              >
                Save
              </Button>
            </Center>
          </Section>
        </Card>
      )}
    </Wrapper>
  );
}

/* =============================== */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
