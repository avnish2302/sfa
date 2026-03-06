import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import ShowcaseTable from "./ShowcaseTable";
import ShowcaseAddedTable from "./ShowcaseAddedTable";
import AddRowButton from "../../components/AddRowButton";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveShowcase } from "../../services/apiShowcase";

export default function Showcase({ checkinId }) {
  const emptyRow = {
    category: "",
    product: "",
    image: null,
  };

  const [rows, setRows] = useState([{ ...emptyRow }]);
  const [saved, setSaved] = useState([]);
  const [fileKey, setFileKey] = useState(0);

  const addRow = () => setRows([...rows, { ...emptyRow }]);

  const isValid = () => rows.every((r) => r.category && r.product);

  const handleAdd = () => {
    if (!isValid()) return;

    setSaved([...saved, ...rows]);
    setRows([{ ...emptyRow }]);
    setFileKey((prev) => prev + 1);
  };

  const showcaseMutation = useMutation({
    mutationFn: saveShowcase,
    onSuccess: () => {
      toast.success("Saved successfully");
      setSaved([])
    },
    onError: (error) => toast.error(error.message),
  })

  const handleSaveToDB = () => {
    const cleaned = saved.map(({ category, product }) => ({category, product}))
    showcaseMutation.mutate({
      checkinId,
      items: cleaned
    });
  };

  return (
    <Wrapper>
      <AddRowButton onClick={addRow} />

      <Card width="100rem">
        <Section>
          <ShowcaseTable rows={rows} setRows={setRows} fileKey={fileKey} />

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
            <ShowcaseAddedTable saved={saved} setSaved={setSaved} />

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
