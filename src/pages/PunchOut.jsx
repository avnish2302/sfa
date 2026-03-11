import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Card from "../components/Card";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPunchSummary, punchOut } from "../services/apiPunch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useActiveCheckin from "../hooks/useActiveCheckin";

export default function PunchOut() {
  const { checkinId } = useActiveCheckin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: summary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["punchSummary"],
    queryFn: getPunchSummary,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  });

  const image = watch("image");
  const ownVehicle = Boolean(summary?.ownVehicle); // comes from backend summary

  const punchOutMutation = useMutation({
    mutationFn: punchOut,
    onSuccess: () => {
      toast.success("Punch Out Successful!");
      // React Query stores the result in cache
      // After punching out, there is no active punch session anymore, so we update the cache
      queryClient.setQueryData(["punchSummary"], null);
      reset();
      navigate("/punchin", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const onSubmit = (data) => {
    if (checkinId) {
      toast.error("Please checkout from shop before punching out");
      return;
    }

    punchOutMutation.mutate({
      end_odometer_reading: ownVehicle ? Number(data.odometer) : null,
      shops_visited: summary?.shopsVisited ?? 0,
      shops_pending: summary?.shopsPending ?? 0,
    });
  };
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <Spinner />;
  if (isError) navigate("/punchin");

  return (
    <Wrapper>
      <Time>
        Time :{" "}
        {currentTime.toLocaleTimeString("en-IN", {
          hour12: false,
        })}
      </Time>

      <Card width="100rem">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Section>
            <h2>Activity Summary</h2>
            <Grid>
              <GridItem>Entered Inventory</GridItem>
              <GridItem>: {summary?.totalInventory}</GridItem>

              <GridItem>Collected Cash</GridItem>
              <GridItem>: {summary?.cashCollected} Rs</GridItem>

              <GridItem>Promotion Given</GridItem>
              <GridItem>: </GridItem>

              <GridItem>Distance covered</GridItem>
              <GridItem>: </GridItem>

              <GridItem>Shops Visited</GridItem>
              <GridItem>: {summary?.shopsVisited ?? 0}</GridItem>

              <GridItem>Shops not visited</GridItem>
              <GridItem>: {summary?.shopsPending ?? 0}</GridItem>
            </Grid>
          </Section>

          {ownVehicle && (
            <Section>
              <Field>
                <Label>Odometer Reading (KM)</Label>
                <Input
                  type="number"
                  {...register("odometer", {
                    required: "Odometer reading is required",
                  })}
                />
                {errors.odometer && (
                  <ErrorText>{errors.odometer.message}</ErrorText>
                )}
              </Field>

              <Field>
                <Label>Upload Image</Label>

                <HiddenFileInput
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />

                <UploadButton htmlFor="fileInput">
                  {image?.length ? "Choose Another" : "Choose Image"}
                </UploadButton>

                {image?.length > 0 && <FileName>{image[0].name}</FileName>}

                {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
              </Field>
            </Section>
          )}

          <ButtonWrapper>
            <Button
              type="submit"
              variation="primary"
              size="md"
              disabled={ownVehicle ? !isValid : false}
            >
              Punch Out
            </Button>
          </ButtonWrapper>
        </Form>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2.4rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.section`
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-brown-700);
    margin-bottom: 1.2rem;
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
`;

const GridItem = styled.div`
  font-size: 1.8rem;
  color: var(--color-brown-600);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  cursor: pointer;
  background-color: var(--color-grey-200);
  padding: 0.8rem 1.4rem;
  font-size: 1.3rem;
  border-radius: var(--radius-sm);
  width: fit-content;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const FileName = styled.span`
  font-size: 1.2rem;
  color: var(--color-brown-600);
`;

const ErrorText = styled.span`
  font-size: 1.2rem;
  color: #dc2626;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Time = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 1.6rem;
`;
