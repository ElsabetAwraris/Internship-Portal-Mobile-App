import { createContext, useState } from "react";
import axios from "axios";
import { companyAuth } from "./AuthCompany";
import { API_URL, useAuth } from "./AuthContext";

const InternshipContext = createContext();

const InternshipProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);
  const [popularInternships, setPopularInternships] = useState([]);
  const [nearestInternships, setNearestInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [myApplications, setMyApplications] = useState([]);

  const { id } = companyAuth();
  const { userId } = useAuth();

  const fetchInternships = async () => {
    const response = await axios.get(`${API_URL}/internship`);
    setInternships(response.data);
  };
  const fetchPopularInternships = async () => {
    const response = await axios.get(`${API_URL}/internship/popular/recent`);
    setPopularInternships(response.data);
  };
  const fetchNearestInternships = async () => {
    const response = await axios.get(`${API_URL}/internship/nearest/recent`);
    setNearestInternships(response.data);
  };

  const addInternship = async (title, description, season) => {
    try {
      return await axios.post(`${API_URL}/internship`, {
        title,
        description,
        company: id,
        season,
      });
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const apply = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/application`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      return response;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const accept = async (internId) => {
    try {
      const response = await axios.post(
        `${API_URL}/application/accept/${internId}`
      );
      return response;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const fetchApplication = async () => {
    const response = await axios.get(`${API_URL}/application/${id}`);

    setApplications(response.data);
  };
  const fetchMyApplication = async () => {
    const response = await axios.get(`${API_URL}/application/`);

    setMyApplications(response.data);
  };

  const valueToShare = {
    internships,
    applications,
    popularInternships,
    nearestInternships,
    myApplications,
    fetchInternships,
    addInternship,
    apply,
    fetchApplication,
    fetchPopularInternships,
    fetchNearestInternships,
    accept,
    fetchMyApplication,
  };

  return (
    <InternshipContext.Provider value={valueToShare}>
      {children}
    </InternshipContext.Provider>
  );
};

export { InternshipProvider };

export default InternshipContext;
