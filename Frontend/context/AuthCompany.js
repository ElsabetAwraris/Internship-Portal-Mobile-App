import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "./AuthContext";

const TOKEN_KEY = "my-jwt";
const AuthCompany = createContext();

export const companyAuth = () => {
  return useContext(AuthCompany);
};

export const AuthCompanyProvider = ({ children }) => {
  const [company, setCompany] = useState([]);
  const [companyState, setCompanyState] = useState({
    token: null,
    authenticated: false,
  });
  const [id, setId] = useState(SecureStorage.getItemAsync("id"));
  const [role, setRole] = useState(SecureStorage.getItemAsync("role"));
  const navigation = useNavigation();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStorage.getItemAsync(TOKEN_KEY);
      const _id = await SecureStorage.getItemAsync("id");
      const role = await SecureStorage.getItemAsync("role");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setCompanyState({ token: token, authenticated: true });
        setId(_id);
        setRole(role);
        navigation.navigate("CompanyDashboardScreen");
      }
    };
    loadToken();
  }, []);

  const fetchCompany = async () => {
    const response = await axios.get(`${API_URL}/company`);
    setCompany(response.data);
  };

  const registerCompany = async (
    companyName,
    industry,
    address,
    phoneNumber,
    password,
    email
  ) => {
    try {
      return await axios.post(`${API_URL}/company/registration`, {
        companyName,
        industry,
        address,
        phoneNumber,
        password,
        email,
      });
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const login = async (email, password, myToken) => {
    try {
      const result = await axios.post(`${API_URL}/company/login`, {
        email,
        password,
        myToken,
      });
      setCompanyState({ token: result.data.token, authenticated: true });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStorage.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStorage.setItemAsync("id", result.data._id);
      await SecureStorage.setItemAsync("role", result.data.role);

      setId(result.data._id);
      setRole(result.data.role);

      return result;
    } catch (e) {
      return { error: true, message: e };
    }
  };
  const confirmation = async (email, myrole) => {
    try {
      const result = await axios.post(`${API_URL}/user/confirmation`, {
        email,
        role: myrole,
      });

      return result;
    } catch (e) {
      return { error: true, message: e };
    }
  };

  const confirmCode = async (email, code, role) => {
    try {
      const result = await axios.post(`${API_URL}/user/check`, {
        email,
        code,
        role,
      });
      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const resetPassword = async (email, newPassword, role) => {
    try {
      const result = await axios.post(`${API_URL}/user/resetPassword`, {
        email,
        newPassword,
        role,
      });
      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const logout = async () => {
    await SecureStorage.deleteItemAsync(TOKEN_KEY);
    await SecureStorage.deleteItemAsync("role");
    axios.defaults.headers.common["Authorization"] = "";
    setCompanyState({ token: null, authenticated: false });
    setRole("");
    setId("");
    navigation.navigate("WelcomeScreen");
  };
  const value = {
    login,
    logout,
    registerCompany,
    fetchCompany,
    confirmation,
    confirmCode,
    resetPassword,
    company,
    companyState,
    role,
    id,
  };

  return <AuthCompany.Provider value={value}>{children}</AuthCompany.Provider>;
};
