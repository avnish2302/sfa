import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setLoginError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        // show error below password field
        setError("password", {
          type: "manual",
          message: result.message || "Invalid credentials",
        });
        return;
      }

      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      toast.success("Login successful");
      navigate("/punchin");
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <Page>
      <Card>
        <Content>
          <Heading>Login</Heading>

          <Input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}

          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}

          <Button
            variation="primaryBrown"
            size="lg"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Content>
      </Card>
    </Page>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Slight warm tint for better separation */
  background-color: var(--color-brown-50);
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-brown-700);
`;

const Input = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--color-grey-0);
  color: var(--text-primary);

  &:focus {
    outline: 2px solid var(--color-brown-500);
    outline-offset: 2px;
  }
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: #dc2626;
  margin-top: -6px;
  margin-bottom: 6px;
`;
