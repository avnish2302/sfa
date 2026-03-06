import Table from "../../components/Table";
import Button from "../../components/Button";
import styled from "styled-components";

export default function AssetAssignmentTable({ rows, setRows }) {
  const updateRow = (index, key, value) => {
    const copy = [...rows];
    copy[index][key] = value;
    setRows(copy);
  };

  const deleteRow = (index) => setRows(rows.filter((_, i) => i !== index));

  return (
    <Table>
      <Table.Header>
        <Table.Cell>Brand</Table.Cell>
        <Table.Cell>Asset</Table.Cell>
        <Table.Cell>Remarks</Table.Cell>
        <Table.Cell>Image</Table.Cell>
        <Table.Cell>Action</Table.Cell>
      </Table.Header>

      <Table.Body
        data={rows}
        render={(row, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <Table.Input
                value={row.brand}
                onChange={(e) => updateRow(i, "brand", e.target.value)}
              />
            </Table.Cell>

            <Table.Cell>
              <Table.Input
                value={row.asset}
                onChange={(e) => updateRow(i, "asset", e.target.value)}
              />
            </Table.Cell>

            <Table.Cell>
              <Table.Input
                value={row.remarks}
                onChange={(e) => updateRow(i, "remarks", e.target.value)}
              />
            </Table.Cell>

            <Table.Cell>
              <FileUploadWrapper>
                {!row.image ? (
                  <FileButton>
                    Choose File
                    <Table.HiddenInput
                      type="file"
                      onChange={(e) => updateRow(i, "image", e.target.files[0])}
                    />
                  </FileButton>
                ) : (
                  <FileInfo>
                    <FileName>{row.image.name}</FileName>

                    <Table.ChangeLabel>
                      Change
                      <Table.HiddenInput
                        type="file"
                        onChange={(e) =>
                          updateRow(i, "image", e.target.files[0])
                        }
                      />
                    </Table.ChangeLabel>
                  </FileInfo>
                )}
              </FileUploadWrapper>
            </Table.Cell>

            <Table.Cell>
              <Button variation="delete" onClick={() => deleteRow(i)}>
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        )}
      />
    </Table>
  );
}

/* Styled Components for File Upload */
const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const FileButton = styled.label`
  cursor: pointer;
  background-color: var(--color-grey-200);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 1.2rem;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
`;

const FileName = styled.span`
  font-size: 1.2rem;
  word-break: break-word;
`;
