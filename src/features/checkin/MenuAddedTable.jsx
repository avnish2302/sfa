import Table from "../../components/Table";
import Button from "../../components/Button";
import styled from "styled-components";
import { useState } from "react";

export default function MenuAddedTable({ saved, setSaved }) {
  const [editIndex, setEditIndex] = useState(null);

  const formatPrice = (value) => value.replace(/[^0-9.]/g, "");

  const handleSavedChange = (i, key, value) => {
    const copy = [...saved];
    if (key === "price") {
      value = formatPrice(value);
    }
    copy[i][key] = value;
    setSaved(copy);
  };

  const handleDeleteSaved = (i) =>
    setSaved(saved.filter((_, idx) => idx !== i));

  const handleSaveEdit = () => setEditIndex(null);

  return (
    <Table>
      <Table.Header>
        <Table.Cell>Category</Table.Cell>
        <Table.Cell>Product</Table.Cell>
        <Table.Cell>Price</Table.Cell>
        <Table.Cell>Image</Table.Cell>
        <Table.Cell>Actions</Table.Cell>
      </Table.Header>

      <Table.Body
        data={saved}
        render={(row, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              {editIndex === i ? (
                <Table.Input
                  value={row.category}
                  onChange={(e) =>
                    handleSavedChange(i, "category", e.target.value)
                  }
                />
              ) : (
                row.category
              )}
            </Table.Cell>

            <Table.Cell>
              {editIndex === i ? (
                <Table.Input
                  value={row.product}
                  onChange={(e) =>
                    handleSavedChange(i, "product", e.target.value)
                  }
                />
              ) : (
                row.product
              )}
            </Table.Cell>

            <Table.Cell>
              {editIndex === i ? (
                <Table.Input
                  value={row.price}
                  onChange={(e) =>
                    handleSavedChange(i, "price", e.target.value)
                  }
                />
              ) : (
                `₹ ${row.price}`
              )}
            </Table.Cell>

            <Table.Cell>{row.image?.name || "Image"}</Table.Cell>

            <Table.Cell>
              <Actions>
                {editIndex === i ? (
                  <Button variation="saveEdit" onClick={handleSaveEdit}>
                    Save Edit
                  </Button>
                ) : (
                  <Button variation="edit" onClick={() => setEditIndex(i)}>
                    Edit
                  </Button>
                )}

                <Button variation="delete" onClick={() => handleDeleteSaved(i)}>
                  Delete
                </Button>
              </Actions>
            </Table.Cell>
          </Table.Row>
        )}
      />
    </Table>
  );
}

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;
