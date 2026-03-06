import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import AssetAssignmentTable from "./AssetAssignmentTable";
import AssetAssignmentAddedTable from "./AssetAssignmentAddedTable";
import AddRowButton from "../../components/AddRowButton";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveAssetAssignment } from "../../services/apiAssetAssignment";

export default function AssetAssignment({ checkinId }) {
  const emptyRow = {
    brand: "",
    asset: "",
    remarks: "",
    image: null,
  };

  const [rows, setRows] = useState([{ ...emptyRow }]);
  const [saved, setSaved] = useState([]);

  const addRow = () => setRows([...rows, { ...emptyRow }]);

  const isValid = () =>
    rows.every((r) => r.brand && r.asset && r.remarks && r.image);

  const handleAdd = () => {
    if (!isValid()) return;

    setSaved([...saved, ...rows]);
    setRows([{ ...emptyRow }]);
  };

  const assetAssignmentMutation = useMutation({
    mutationFn: saveAssetAssignment,
    onSuccess: () => {
      toast.success("saved successfully");
      setSaved([]);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSaveToDB = () => {
    const cleaned = saved.map(({ brand, asset, remarks }) => ({
      brand,
      asset,
      remarks,
    }));
    console.log(cleaned);
    assetAssignmentMutation.mutate({
      checkinId,
      items: cleaned,
    });
  };

  return (
    <Wrapper>
      <HeaderRow>
        <span>Assets being assigned to :</span>
      </HeaderRow>
      <AddRowButton onClick={addRow} />

      <Card width="100rem">
        <Section>
          <AssetAssignmentTable rows={rows} setRows={setRows} />

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
            <AssetAssignmentAddedTable saved={saved} setSaved={setSaved} />

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
