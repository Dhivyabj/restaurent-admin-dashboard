import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <AppContext.Provider value={{ menuItems, setMenuItems, orders, setOrders }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}