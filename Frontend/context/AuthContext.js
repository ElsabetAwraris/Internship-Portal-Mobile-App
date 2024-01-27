import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const TOKEN_KEY = "my-jwt";
export const API_URL = "http://10.194.65.31:8000/portal";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });

  const [id, setId] = useState(SecureStorage.getItemAsync("id"));
  const [role, setRole] = useState(SecureStorage.getItemAsync("urole"));
  const [user, setUser] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStorage.getItemAsync(TOKEN_KEY);
      const _id = await SecureStorage.getItemAsync("id");
      const role = await SecureStorage.getItemAsync("urole");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token: token, authenticated: true });
        setId(_id);
        setRole(role);
        navigation.navigate("InternshipListScreen");
      }
    };
    loadToken();
  }, []);

  const register = async (
    name,
    phoneNumber,
    university,
    major,
    email,
    password
  ) => {
    try {
      return await axios.post(`${API_URL}/user/registration`, {
        name,
        phoneNumber,
        university,
        major,
        email,
        password,
      });
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const login = async (email, password, myToken) => {
    try {
      const result = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
        myToken,
      });
      setAuthState({ token: result.data.token, authenticated: true });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStorage.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStorage.setItemAsync("id", result.data._id);
      await SecureStorage.setItemAsync("urole", result.data.role);

      setId(result.data._id);
      setRole(result.data.role);

      return result;
    } catch (e) {
      return { error: true, message: e };
    }
  };

  const fetchUser = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/${id}`);
      setUser(result.data);
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const logout = async () => {
    await SecureStorage.deleteItemAsync(TOKEN_KEY);
    await SecureStorage.deleteItemAsync("urole");
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
    setRole("");
    setId("");
    navigation.navigate("WelcomeScreen");
  };

  const updateInformation = async (
    name,
    major,
    companyName,
    address,
    phoneNumber,
    role
  ) => {
    try {
      const result = await axios.put(`${API_URL}/user/${id}`, {
        name,
        major,
        companyName,
        address,
        phoneNumber,
        role,
      });

      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const changePassword = async (currentPassword, newPassword, role) => {
    try {
      const result = await axios.put(`${API_URL}/user/password/change`, {
        id,
        currentPassword,
        newPassword,
        role,
      });
      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const updateEmail = async (email, role) => {
    try {
      const result = await axios.put(`${API_URL}/user/email/${id}`, {
        email,
        role,
      });

      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const value = {
    user,
    onLogin: login,
    onLogout: logout,
    userRole: role,
    register,
    authState,
    userId: id,
    fetchUser,
    updateInformation,
    changePassword,
    updateEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
