import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch menu items
  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await api.get("/menu");
      setMenu(res.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menu, fetchMenu, loading }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
