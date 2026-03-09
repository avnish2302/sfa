import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPunchSummary } from "../services/apiPunch";
import Spinner from "./Spinner";

export default function PunchRequiredRoutes({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ["punchSummary"],
    queryFn: getPunchSummary,
    retry: false,
  });

  if (isLoading) return <Spinner />;

  const punchedIn = !!data;

  if (!punchedIn) return <Navigate to="/punchin" replace />;

  return children;
}