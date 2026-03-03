import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useRecordInventoryCompetitor } from "../../hooks/useRecordInventoryCompetitor";
import RecordInventoryCompetitorTable from "./RecordInventoryCompetitorTable";
import RecordInventoryCompetitorAddedTable from "./RecordInventoryCompetitorAddedTable";
import AddRowButton from "../../components/AddRowButton";

export default function RecordInventoryCompetitor() {
  const inventoryCompetitor = useRecordInventoryCompetitor();

  return (
    <Wrapper>
      <AddRowButton onClick={inventoryCompetitor.addRow} />

      <Card width="100rem">
        <Section>
          <RecordInventoryCompetitorTable inventoryCompetitor={inventoryCompetitor} />

          <Center>
            <Button
              variation="primary"
              size="md"
              onClick={inventoryCompetitor.handleAdd}
              disabled={!inventoryCompetitor.isValid()}
            >
              Add
            </Button>
          </Center>
        </Section>
      </Card>

      {inventoryCompetitor.saved.length > 0 && (
        <Card width="100rem">
          <Section>
            <RecordInventoryCompetitorAddedTable inventoryCompetitor={inventoryCompetitor} />

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={inventoryCompetitor.handleSaveToDatabase}
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


