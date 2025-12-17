import { ClerkProvider } from "@clerk/react-router"
import { BrowserRouter, Route, Routes } from "react-router"
import Root from "../components/special/Root/Root"
import SignedInPermission from "./permissions/SignedIn"
import Fours from "../components/special/404/Fours"
import AppShell from "../components/layout/AppShell/AppShell"
import HomePage from "../components/Home/page/HomePage"
import SupplierPage from "../components/Supplier/page/SupplierPage"
import InventoryPdfPage from "../components/Inventory/page/InventoryPdfPage"
import EmployeePage from "../components/Employee/page/EmployeePage"
import ProductsPage from "../components/products/page/ProductsPage"

function Routing() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}> 
        <Routes>
          {/* Sign in upon entering website */}
          <Route path="/" element={<Root />} />
          {/* Must be Signed in to use this app, All routes must sit in here other than the root/true home */}
          <Route element={ <SignedInPermission /> }>
            {/* Layout */}
            <Route element={<AppShell />}>

              {/* True Home */}
              <Route path="/home" element={<HomePage />} />

              <Route path="/download-inventory" element={<InventoryPdfPage />} />

              <Route path="/suppliers" element={<SupplierPage />} />

              <Route path="/employees" element={<EmployeePage />} />

              <Route path="/products" element={<ProductsPage />} />

              <Route path="*" element={<Fours />} />
              
            </Route>
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  )
}

export default Routing
