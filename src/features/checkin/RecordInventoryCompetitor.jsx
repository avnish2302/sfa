import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import RecordInventoryCompetitorTable from "./RecordInventoryCompetitorTable";
import RecordInventoryCompetitorAddedTable from "./RecordInventoryCompetitorAddedTable";
import AddRowButton from "../../components/AddRowButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { saveCompetitorInventory } from "../../services/apiInventory";

export default function RecordInventoryCompetitor({ checkinId }) {

  const emptyRow = {
    category: "",
    product: "",
    sku: "",
    caseQty: "",
    bottleQty: "",
  };

  const [rows, setRows] = useState([{ ...emptyRow }]);
  const [saved, setSaved] = useState([]);

  const inventoryMutation = useMutation({
    mutationFn : saveCompetitorInventory,
    onSuccess : () =>{
      toast.success("Saved Successfully")
      setSaved([])
    },
    onError : (error) => {
    toast.error(error.message);
    }
  })

  const isValid = () =>
    rows.every((r) => Object.values(r).every((v) => v !== ""));

  const handleAdd = () => {
    if (!isValid()) return;

    setSaved([...saved, ...rows]);
    setRows([{ ...emptyRow }]);
  };

  const handleSaveToDB = () => {
   if (!checkinId) {
    toast.error("No active check-in")
    return
  }
  inventoryMutation.mutate({
    checkinId,
    items: saved,
  });
  };

  const addRow = () => setRows([...rows, { ...emptyRow }]);

  return (
    <Wrapper>
      <AddRowButton onClick={addRow} />

      <Card width="100rem">
        <Section>
          <RecordInventoryCompetitorTable
            rows={rows}
            setRows={setRows}
          />

          <Center>
            <Button
              variation="primary"
              size="md"
              onClick={handleAdd}
              disabled={!isValid()}
            >
              Add
            </Button>
          </Center>
        </Section>
      </Card>

      {saved.length > 0 && (
        <Card width="100rem">
          <Section>
            <RecordInventoryCompetitorAddedTable
              saved={saved}
              setSaved={setSaved}
            />

            <Center>
              <Button variation="primary" size="md" onClick={handleSaveToDB}>
                Save
              </Button>
            </Center>
          </Section>
        </Card>
      )}
    </Wrapper>
  );
}

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