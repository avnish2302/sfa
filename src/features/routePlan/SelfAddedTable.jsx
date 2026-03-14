import styled from "styled-components";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ShopName from "../../components/ShopName";
import { useMutation } from "@tanstack/react-query";
import { createRoutes } from "../../services/apiRoutes";

export default function SelfAddedTable() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [rows, setRows] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const sendRoutesMutation = useMutation({
    mutationFn: createRoutes,
    onSuccess: () => {
      toast.success("Routes sent for approval");
      setRows([]);
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = ({ planDate }) => {
    if (!selectedShop) return;

    setRows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        planDate,
        shopId: selectedShop.id,
        location: selectedShop.name,
      },
    ]);

    reset();
    setSelectedShop(null);
  };

  const handleDelete = (id) => {
    setRows((prev) =>
      prev.filter((r) => r.id !== id).map((r, i) => ({ ...r, id: i + 1 })),
    );
  };

  const handleSend = () => {
    if (!rows.length) return;

    sendRoutesMutation.mutate({
      planDate: rows[0].planDate,
      shops: rows.map((r) => r.shopId),
    });
  };

  return (
    <>
      <Card width="100rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section>
            <FormGrid>
              <FormGroup>
                <Label>Plan Date</Label>
                <Input
                  type="date"
                  {...register("planDate", { required: true })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Shop</Label>
                <ShopName
                  selectedShop={selectedShop}
                  setSelectedShop={setSelectedShop}
                />
              </FormGroup>
            </FormGrid>

            <Center>
              <Button
                variation="primary"
                size="md"
                type="submit"
                disabled={!isValid || !selectedShop}
              >
                Add
              </Button>
            </Center>
          </Section>
        </form>
      </Card>

      {rows.length > 0 && (
        <Card width="100rem">
          <Section>
            <Table>
              <Table.Header>
                <th>S No.</th>
                <th>Location</th>
                <th>Action</th>
              </Table.Header>

              <Table.Body
                data={rows}
                render={(row) => (
                  <Table.Row key={row.id}>
                    <Table.Cell>{row.id}</Table.Cell>
                    <Table.Cell>{row.location}</Table.Cell>

                    <Table.Cell>
                      <Button
                        variation="delete"
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )}
              />
            </Table>

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={handleSend}
                disabled={sendRoutesMutation.isPending}
              >
                Send for Approval
              </Button>
            </Center>
          </Section>
        </Card>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: var(--color-brown-700);
`;

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: var(--color-brown-600);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;
