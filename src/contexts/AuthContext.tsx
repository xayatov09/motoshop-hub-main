import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  promoCode?: string;
  discount?: number;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login - in production, this would call an API
    if (email && password.length >= 6) {
      const savedUsers = localStorage.getItem('registeredUsers');
      const users = savedUsers ? JSON.parse(savedUsers) : {};
      
      if (users[email] && users[email].password === password) {
        setUser({
          id: users[email].id,
          email,
          name: users[email].name,
        });
        return true;
      }
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    if (email && password.length >= 6 && name) {
      const savedUsers = localStorage.getItem('registeredUsers');
      const users = savedUsers ? JSON.parse(savedUsers) : {};
      
      if (users[email]) {
        return false; // User already exists
      }
      
      const newUser = {
        id: crypto.randomUUID(),
        email,
        name,
        password, // In production, this would be hashed
      };
      
      users[email] = newUser;
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      setUser({
        id: newUser.id,
        email,
        name,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      orders,
      login,
      signup,
      logout,
      addOrder,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
