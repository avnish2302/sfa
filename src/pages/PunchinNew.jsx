import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { toast } from "react-toastify";

export default function punchIn() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const {register, handleSubmit, watch, reset, formState :{isValid, errors}} =useForm({mode : "onChange", shouldUnregister : true})
    const ownVehicle = watch("ownVehicle")

    const mutation = useMutation({
        mutationFn : punchIn,
        onSuccess : () => {
            toast.success("Punchin Successfull")
            queryClient.invalidateQueries(["punchSummary"])
            reset()
            navigate("/checkin")
        }
    })

    const onSubmit = (data) => {
        mutation.mutate({
            ownVehicle : data.ownVehicle === "yes",
            vehicleType : data.vehicleType || null,
            odometerReading : data.odometerReading || null
        }
        )
    }

    return (
        <Wrapper>                                               // div
            <Card>                                              // 
               <Title>PUNCHIN</Title>                           // h2
               <Form onSubmit={handleSubmit(onSubmit)}>                                           // form
                <FormGroup>                                     // div
                    <Label>Own vehicle?</Label>                 // label
                    <Select {...register("ownVehicle", {required : true})}>                                    // select
                        <option value="">SELECT</option>
                        <option value = "yes">Yes</option>
                        <option value = "no">No</option>
                    </Select>
                </FormGroup>
                  {
                    ownVehicle === "yes" && (
                        <>
                        <FormGroup>
                            <Label>Vehicle type</Label>
                            <Select {...register("vehicleType", {required : "vehicle type is required"})}>
                                <option value="">SELECT</option>
                                <option >Car</option>
                                <option >Bike</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Odometer Reading</Label>
                            <Input
                            type="number"
                            {...register("odometerReading", {required : "odometer reading is required"})}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Upload Imaage</Label>
                            <Input
                            id = "fileinput"
                            type = "file"
                            accept = "image/*"
                            {...register("image", {required : "Image is required"})}
                            />
                        </FormGroup>
                        </>
                    )
                  }

                  <Button
                  type="submit"
                  variation = "primary"
                  size="md"
                  disabled={!isValid}
                  >punch-in</Button>

               </Form>
            </Card>
        </Wrapper>
    )
}






// apiPunch.js

export async function punchin (data) {
const token = localStorage.getItem("token")

const payload = {
    own_vehicle : data.ownVehicle,
    vehicle_type : data.vehicleType,
    odometer_reading : data.odometerReading
}

const res = await fetch("https://localhost:5000/api/punch/in", {
    method : "POST",
    headers : {"Content-Type" : "application/json" , Authorization : `Bearer ${token}`},
    body : JSON.stringify(payload)
})

const result = res.json()
if (!res.ok) throw new Error(result.message)
    return result
}

