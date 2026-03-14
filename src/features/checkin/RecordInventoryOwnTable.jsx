import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../services/apiProducts";

export default function RecordInventoryOwnTable({ rows, setRows }) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const emptyRow = {
    receipt: 0,
    casesWarm: 0,
    casesCold: 0,
    bottlesWarm: 0,
    bottlesCold: 0,
    product_id: "",
  };

  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : [];

  /* ---------- LOCAL HANDLERS ---------- */

  const handleAddRow = () => {
    if (!category || !product) return;
    const selectedProduct = products.find((p) => p.id === Number(product));
    setRows([...rows, { ...emptyRow, product_id: Number(product), product : selectedProduct?.name, }]);
  };

  const handleDeleteRow = (i) => {
    setRows(rows.filter((_, idx) => idx !== i));
  };

  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value === "" ? "" : Number(value);
    setRows(updated);
  };

  return (
    <Wrapper>
      {/* CATEGORY */}
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.category} value={c.category}>
            {c.category}
          </option>
        ))}
      </Select>

      {/* PRODUCT + ADD ROW */}
      <RowWrapper>
        <Select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="">Select Product</option>
          {!isLoading &&
            filteredProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </Select>

        <Button
          variation="neutral"
          size="md"
          onClick={handleAddRow}
          disabled={!category || !product}
        >
          Add Row
        </Button>
      </RowWrapper>

      {/* TABLE */}
      {rows.length > 0 && (
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <Th>Product</Th>
                <Th>Receipt</Th>
                <Th colSpan="2">Cases</Th>
                <Th colSpan="2">Bottles</Th>
                <Th>Action</Th>
              </tr>
              <tr>
                <Th>—</Th>
                <Th>—</Th>
                <Th>Warm</Th>
                <Th>Cold</Th>
                <Th>Warm</Th>
                <Th>Cold</Th>
                <Th>—</Th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <Td>{products.find((p) => p.id === r.product_id)?.name}</Td>

                  {[
                    "receipt",
                    "casesWarm",
                    "casesCold",
                    "bottlesWarm",
                    "bottlesCold",
                  ].map((field) => (
                    <Td key={field}>
                      <Input
                        type="number"
                        min="0"
                        value={r[field]}
                        onChange={(e) => handleChange(i, field, e.target.value)}
                      />
                    </Td>
                  ))}

                  <Td>
                    <Button
                      variation="delete"
                      size="sm"
                      onClick={() => handleDeleteRow(i)}
                    >
                      Delete
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      )}
    </Wrapper>
  );
}

/* =============================== STYLED COMPONENTS ============================== */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Select = styled.select`
  background-color: var(--color-grey-000);
  color: var(--color-grey-900);
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;
  background-color: var(--bg-main);
`;

const Th = styled.th`
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--border-color);
  background-color: var(--color-brown-700);
  color: var(--color-grey-0);
`;

const Td = styled.td`
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
`;

const Input = styled.input`
  background-color: var(--color-grey-0);
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--color-brown-600);
  }
`;
