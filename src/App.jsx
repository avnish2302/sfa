import { BrowserRouter, Routes as BrowserRouterRoutes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import CheckIn from "./pages/CheckIn";
import PunchIn from "./pages/PunchIn";
import CheckOut from "./pages/CheckOut";
import MainLayout from "./layouts/MainLayout";
import GlobalStyles from "./styles/GlobalStyles";
import PunchOut from "./pages/PunchOut";
import { VehicleProvider } from "./contexts/VehicalContext";
import Routes from "./pages/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoutes";
import PunchRequiredRoutes from "./components/PunchRequiredRoutes";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer position="top-right" autoClose={3000} />
        <VehicleProvider>
          <BrowserRouter>
            <BrowserRouterRoutes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
                <Route path="/checkin" element={<Navigate to="/checkin/main" replace/>} />
                <Route path="/checkin/:tab" element={ <PunchRequiredRoutes><CheckIn/></PunchRequiredRoutes>}/>
                <Route path="/checkout" element={<PunchRequiredRoutes><CheckOut/></PunchRequiredRoutes>}/>
                <Route path="/punchin" element={<PunchIn />}/>
                <Route path="/punchout" element={<PunchRequiredRoutes><PunchOut/></PunchRequiredRoutes>}/>
                <Route path="/routes" element={<Navigate to="/routes/self" replace />}/>
                <Route path="/routes/:tab" element={<Routes/>}/>
              </Route>
            </BrowserRouterRoutes>
          </BrowserRouter>
        </VehicleProvider>
      </QueryClientProvider>
    </>
  )
}
