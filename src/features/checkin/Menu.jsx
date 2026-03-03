import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useMenu } from "../../hooks/useMenu";
import MenuTable from "./MenuTable";
import MenuAddedTable from "./MenuAddedTable";
import AddRowButton from "../../components/AddRowButton";

export default function Menu() {
  const menu = useMenu();

  return (
    <Wrapper>
      <AddRowButton onClick={menu.addRow} />

      <Card width="100rem">
        <Section>
          <MenuTable menu={menu} />

          <Center>
            <Button
              variation="primary"
              size="md"
              onClick={menu.handleAdd}
              disabled={!menu.isValid()}
            >
              Add
            </Button>
          </Center>
        </Section>
      </Card>

      {menu.saved.length > 0 && (
        <Card width="100rem">
          <Section>
            <MenuAddedTable menu={menu} />

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={menu.handleSaveToDatabase}
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


