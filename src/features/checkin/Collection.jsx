import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { saveCollection } from "../../services/apiCollection";

export default function Collection({ checkinId }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const file = watch("image");

  const collectionMutation = useMutation({
    mutationFn: saveCollection,
    onSuccess: () => {
      (toast.success("Saved successfully"), reset());
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data) => {
    console.log(data, "checkin ID:", checkinId);
    collectionMutation.mutate({
      checkinId,
      data,
    });
  };

  return (
    <>
      <Card width="100rem">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Collection</Title>

          <Field>
            <Label>Invoice #</Label>
            <Input
              {...register("invoice", {
                required: "Invoice number is required",
                minLength: {
                  value: 3,
                  message: "Invoice must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Invoice cannot exceed 20 characters",
                },
              })}
            />

            {errors.invoice && <Error>{errors.invoice.message}</Error>}
          </Field>

          <Field>
            <Label>Remarks</Label>
            <Input
              {...register("remarks", {
                required: "Remarks are required",
              })}
            />

            {errors.remarks && <Error>{errors.remarks.message}</Error>}
          </Field>

          <Field>
            <Label>Payment Mode</Label>
            <Select
              {...register("paymentMode", {
                required: "Payment mode is required",
              })}
            >
              <option value="">Select</option>
              <option value="Cash">Cash</option>
            </Select>

            {errors.paymentMode && <Error>{errors.paymentMode.message}</Error>}
          </Field>

          <Field>
            <Label>Amount</Label>
            <Input
              type="number"
              min="0"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 0.01,
                  message: "Amount must be greater than 0",
                },
                valueAsNumber: true,
              })}
            />

            {errors.amount && <Error>{errors.amount.message}</Error>}
          </Field>

          <Field>
            <Label>Image</Label>

            <HiddenFileInput
              id="imageInput"
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image is required",
                validate: {
                  fileType: (files) =>
                    files?.[0]?.type.startsWith("image/") ||
                    "Only image files are allowed",

                  fileSize: (files) =>
                    files?.[0]?.size < 10 * 1024 * 1024 ||
                    "Image must be less than 10 MB",
                },
              })}
            />

            <UploadButton htmlFor="imageInput">
              {file?.length ? "Choose Another" : "Choose File"}
            </UploadButton>

            {file?.length > 0 && <FileName>{file[0].name}</FileName>}

            {errors.image && <Error>{errors.image.message}</Error>}
          </Field>

          <Button
            type="submit"
            variation="primary"
            size="md"
            disabled={!isValid || collectionMutation.isPending}
            style={{ width: "100%" }}
          >
            {collectionMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </Form>
      </Card>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-brown-700);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
  color: var(--text-secondary);
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

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  cursor: pointer;
  background-color: var(--color-grey-200);
  padding: 0.8rem 1.4rem;
  border-radius: var(--radius-sm);
  width: fit-content;
  font-size: 1.3rem;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const FileName = styled.span`
  font-size: 1.2rem;
  color: var(--color-brown-600);
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: #dc2626;
`;
