import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Card from "../../components/Card";
import RecordInventoryOwnTable from "./RecordInventoryOwnTable";
import RecordInventoryOwnAddedTable from "./RecordInventoryOwnAddedTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveOwnInventory } from "../../services/apiInventory";

export default function RecordInventoryOwn({ checkinId }) {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState([]);
  const [saved, setSaved] = useState([]);

  const inventoryMutation = useMutation({
    mutationFn: saveOwnInventory,
    onSuccess: () => {
      toast.success("Saved Successfully");
      setSaved([]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddToSaved = () => {
    if (rows.length === 0) return;

    // prevent empty fields before adding
    for (const row of rows) {
      const fields = [
        row.receipt,
        row.casesWarm,
        row.casesCold,
        row.bottlesWarm,
        row.bottlesCold,
      ];

      if (fields.some((v) => v === "" || v === null || v === undefined)) {
        toast.error("All fields must be filled. Use 0 if none.");
        return;
      }
    }

    setSaved([...saved, ...rows]);
    setRows([]);
  };

  const handleSaveToDB = () => {
    if (inventoryMutation.isPending) return;

    if (!checkinId) {
      toast.error("No active check-in");
      return;
    }

    if (saved.length === 0) {
      toast.error("No inventory to save");
      return;
    }

    // Validate empty values
    for (const row of saved) {
      const fields = [
        row.receipt,
        row.casesWarm,
        row.casesCold,
        row.bottlesWarm,
        row.bottlesCold,
      ];

      if (fields.some((v) => v === "" || v === null || v === undefined)) {
        toast.error("All fields must be filled. Use 0 if none.");
        return;
      }
    }

    inventoryMutation.mutate(
      {
        checkinId,
        items: saved,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["inventory", checkinId]);
        },
      },
    );
  };

  return (
    <Wrapper>
      <Card width="100rem">
        <Section>
          <RecordInventoryOwnTable rows={rows} setRows={setRows} />

          <Center>
            <Button
              variation="primary"
              size="md"
              onClick={handleAddToSaved}
              disabled={rows.length === 0}
            >
              Add
            </Button>
          </Center>
        </Section>
      </Card>

      {saved.length > 0 && (
        <Card width="100rem">
          <Section>
            <RecordInventoryOwnAddedTable saved={saved} setSaved={setSaved} />

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={handleSaveToDB}
                disabled={inventoryMutation.isPending}
              >
                {inventoryMutation.isPending ? "Saving..." : "Save"}
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

const Gap = styled.div`
  margin-bottom: 26px;
`;
