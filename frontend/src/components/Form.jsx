import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constans";
import "../styles/Form.css";
import "../styles/LoadingIndicator.css"; // Optional: Add your styles here
import LoadingIndicator from "./Loadingindicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading();
       e.preventDefault(); // 

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                alert("Registration successful! Please login.");
                navigate("/login");
            }
        } catch (error) {
            alert(error.response?.data.detail || "Something went wrong");
        } finally {
            setLoading(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // ✅ Fixed
                placeholder="Password"
                required
            />
            { loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Please wait..." : name}
            </button>
        </form>
    );
}

export default Form;
