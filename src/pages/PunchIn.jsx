import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { punchIn } from "../services/apiPunch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function PunchIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()                 // access tanstack query's global cache

  const {register, handleSubmit, watch, reset, formState: { isValid, errors }} = useForm({
    mode: "onChange",                                  // validation runs while typing
    shouldUnregister: true,                            // when a field dissappears (like conditional fields) its value is removed from form state
  })

  const ownVehicle = watch("ownVehicle")               // watch() subscribe to field changes, if user selects Own Vehicle = yes, then ownVehicle = "yes"
  const image = watch("image")

  const mutation = useMutation({                       // tanstack/react query mutation : handle API requests that modify server data
    mutationFn: punchIn,
    onSuccess: () => {                                 // server returns success -> toast notification -> refresh punch summary -> reset form -> redirect to checkin. refresh because sidebar and navbar depend on punch status
      toast.success("Punch In Successful!")
      queryClient.invalidateQueries(["punchSummary"])  // refresh punch summary everywhere in app, eg sidebar, navbar, etc. queryKey : ["punchSummary"] was created in sidebar
      reset()
      navigate("/checkin")
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const onSubmit = (data) => {
    mutation.mutate({
      ownVehicle: data.ownVehicle === "yes", //converting to boolean. if ownVehicle = "yes", then "yes" === "yes" becomes true, if ownVehicle  = "no", then "no" === "yes" becomes false
      vehicleType: data.vehicleType || null,
      odometerReading: data.odometerReading || null,
    });
  };

  return (
    <Wrapper>
      <Card width="42rem">
        <Title>Punch In</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <FormGroup>
            <Label>Own Vehicle?</Label>
            <Select {...register("ownVehicle", { required: true })}>
              <option value="">Select</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Select>
          </FormGroup>

          {
            ownVehicle === "yes" && (
              <>
              <FormGroup>
                <Label>Vehicle Type</Label>
                <Select
                  {...register("vehicleType", {required: "Vehicle type is required"})}>
                  <option value="">Select</option>
                  <option>Bike</option>
                  <option>Car</option>
                </Select>
              </FormGroup>


              <FormGroup>
                <Label>Odometer Reading (KM)</Label>
                <Input
                  type="number"
                  {...register("odometerReading", {required: "Odometer reading is required"})}
                />
              </FormGroup>

              <FormGroup>
                <Label>Upload Image</Label>
                <UploadWrapper htmlFor="fileInput">
                  <HiddenFileInput
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    {...register("image", {required: "Image is required"})}
                  />
                  <UploadButton>
                    {image?.length ? "Choose Another" : "Choose Image"}
                  </UploadButton>
                </UploadWrapper>
                {image?.length > 0 && <FileName>{image[0].name}</FileName>}
                {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
              </FormGroup>
              </>
           )
          }

          <Button
            type="submit"
            variation="primary"
            size="md"
            disabled={!isValid || mutation.isPending}
          >
            {mutation.isPending ? "Punching..." : "Punch In"}
          </Button>
        </Form>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brown-700);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FormGroup = styled.div`
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

/* 🔥 Upload Styling */

const UploadWrapper = styled.label`
  position: relative;
  width: fit-content;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadButton = styled.div`
  background-color: var(--color-grey-200);
  padding: 0.8rem 1.4rem;
  border-radius: var(--radius-sm);
  font-size: 1.3rem;

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
