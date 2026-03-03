import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useShowcase } from "../../hooks/useShowcase";
import ShowcaseTable from "./ShowcaseTable";
import ShowcaseAddedTable from "./ShowcaseAddedTable";
import AddRowButton from "../../components/AddRowButton";

export default function Showcase() {
  const showcase = useShowcase();

  return (
    <Wrapper>
      <AddRowButton onClick={showcase.addRow} />

      <Card width="100rem">
        <Section>
          <ShowcaseTable showcase={showcase} />

          <Center>
            <Button
              variation="primary"
              size="md"
              onClick={showcase.handleAdd}
              disabled={!showcase.isValid()}
            >
              Add
            </Button>
          </Center>
        </Section>
      </Card>

      {showcase.saved.length > 0 && (
        <Card width="100rem">
          <Section>
            <ShowcaseAddedTable showcase={showcase} />

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={showcase.handleSaveToDatabase}
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
