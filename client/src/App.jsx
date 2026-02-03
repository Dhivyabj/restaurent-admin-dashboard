import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import Orders from "./pages/Orders";
import Home from "./pages/Home";


import { MenuProvider } from "./context/MenuContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <MenuProvider>
      <OrderProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            {/* Top navigation bar */}
            <Sidebar />

            {/* Page content below */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<MenuManagement />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </OrderProvider>
    </MenuProvider>
  );
}

export default App;
