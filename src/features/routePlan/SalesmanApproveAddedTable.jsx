import styled from "styled-components";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRoutes, approveRoutes } from "../../services/apiRoutes";
import getSalesmen from "../../services/apiUsers";

export default function SalesmanApproveAddedTable() {
  const [planDate, setPlanDate] = useState("");
  const [salesman, setSalesman] = useState("");
  const [filters, setFilters] = useState(null);

  // fetch salesmen
  const { data: salesmen = [] } = useQuery({
    queryKey: ["salesmen"],
    queryFn: getSalesmen,
  });

  // fetch routes only after show clicked
  const { data: rows = [] } = useQuery({
    queryKey: ["routes", filters],
    queryFn: () => getRoutes(filters.planDate, filters.salesman),
    enabled: !!filters,
  });

  const approveMutation = useMutation({
    mutationFn: approveRoutes,
    onSuccess: () => {
      toast.success("Routes approved") 
      setPlanDate("")
      setSalesman("");
      setFilters(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleShow = () => {
    if (!planDate || !salesman) {
      toast.error("Select date and salesman");
      return;
    }

    setFilters({
      planDate,
      salesman,
    });
  };

  const handleApprove = () => {
    approveMutation.mutate({
      planDate: filters.planDate,
      userId: filters.salesman,
    });
  };

  return (
    <>
      <Card width="100rem">
        <Section>
          <FormGrid>
            <FormGroup>
              <Label>Plan Date</Label>
              <Input
                type="date"
                value={planDate}
                onChange={(e) => setPlanDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Salesman</Label>
              <Select
                value={salesman}
                onChange={(e) => setSalesman(e.target.value)}
              >
                <option value="">Select Salesman</option>

                {salesmen.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormGrid>

          <Center>
            <Button variation="primary" size="md" onClick={handleShow}>
              Show
            </Button>
          </Center>
        </Section>
      </Card>

      {rows.length > 0 && (
        <Card width="100rem">
          <Section>
            <Table>
              <Table.Header>
                <th>S No.</th>
                <th>Location</th>
              </Table.Header>

              <Table.Body
                data={rows}
                render={(row, index) => (
                  <Table.Row key={row.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{row.shop_name}</Table.Cell>
                  </Table.Row>
                )}
              />
            </Table>

            <Center>
              <Button
                variation="primary"
                size="md"
                onClick={handleApprove}
                disabled={approveMutation.isPending}
              >
                Approve
              </Button>
            </Center>
          </Section>
        </Card>
      )}
    </>
  );
}

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
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: var(--color-brown-600);
  }
`;

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;
