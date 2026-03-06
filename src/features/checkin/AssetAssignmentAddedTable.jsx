import Table from "../../components/Table";
import Button from "../../components/Button";
import styled from "styled-components";
import { useState } from "react";

export default function AssetAssignmentAddedTable({saved, setSaved}) {

  const [editIndex, setEditIndex] = useState(null);

const handleSavedChange = (i, key, value) => {
const copy = [...saved];
copy[i][key] = value;
setSaved(copy);
};

const handleDeleteSaved = (i) =>
setSaved(saved.filter((_, idx) => idx !== i));

const handleSaveEdit = () => setEditIndex(null)

  return (
    <Table>
      <Table.Header>
        <Table.Cell>Brand</Table.Cell>
        <Table.Cell>Asset</Table.Cell>
        <Table.Cell>Remarks</Table.Cell>
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
                  value={row.brand}
                  onChange={(e) =>
                    handleSavedChange(i, "brand", e.target.value)
                  }
                />
              ) : (
                row.brand
              )}
            </Table.Cell>

            <Table.Cell>
              {editIndex === i ? (
                <Table.Input
                  value={row.asset}
                  onChange={(e) =>
                    handleSavedChange(i, "asset", e.target.value)
                  }
                />
              ) : (
                row.asset
              )}
            </Table.Cell>

            <Table.Cell>
              {editIndex === i ? (
                <Table.Input
                  value={row.remarks}
                  onChange={(e) =>
                    handleSavedChange(i, "remarks", e.target.value)
                  }
                />
              ) : (
                row.remarks
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