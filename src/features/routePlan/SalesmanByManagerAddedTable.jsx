import styled from "styled-components";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Table from "../../components/Table";
import ShopName from "../../components/ShopName";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import getSalesmen from "../../services/apiUsers";
import { createManagerRoutes } from "../../services/apiRoutes";

export default function SalesmanByManagerAddedTable() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [rows, setRows] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  // fetch salesmen
  const { data: salesmen = [] } = useQuery({
    queryKey: ["salesmen"],
    queryFn: getSalesmen,
  });

  const saveRoutesMutation = useMutation({
    mutationFn: createManagerRoutes,
    onSuccess: () => {
      toast.success("Routes saved successfully");

      setRows([]);
      setSelectedShop(null);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const createRow = (prevRows, { planDate, salesman, shop }) => {
    if (!planDate || !salesman || !shop) return prevRows;

    return [
      ...prevRows,
      {
        id: prevRows.length + 1,
        planDate,
        salesmanId: salesman,
        location: shop.name,
        shopId: shop.id,
      },
    ];
  };

  const deleteRow = (prevRows, id) => {
    const filtered = prevRows.filter((row) => row.id !== id);

    return filtered.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
  };

  const onSubmit = (data) => {
    setRows((prev) =>
      createRow(prev, { ...data, shop: selectedShop })
    );

    setSelectedShop(null);
  };

  const handleDelete = (id) => {
    setRows((prev) => deleteRow(prev, id));
  };

  const handleSave = () => {
    if (!rows.length) {
      toast.error("No routes added");
      return;
    }

    const payload = {
      planDate: rows[0].planDate,
      userId: rows[0].salesmanId,
      shops: rows.map((r) => r.shopId),
    };

    saveRoutesMutation.mutate(payload);
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
                <Label>Salesman</Label>
                <Select
                  {...register("salesman", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Salesman
                  </option>

                  {salesmen.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

            </FormGrid>

            <ShopName
              selectedShop={selectedShop}
              setSelectedShop={setSelectedShop}
            />

            <Center>
              <Button
                variation="primary"
                size="md"
                type="submit"
                disabled={!isValid || !selectedShop?.id}
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
                onClick={handleSave}
                disabled={saveRoutesMutation.isPending}
              >
                {saveRoutesMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </Center>

          </Section>
        </Card>
      )}
    </>
  );
}

/* =============================== */

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
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
`;

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;