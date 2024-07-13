import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const apiURL = process.env.REACT_APP_API_URL;
		if (!apiURL) {
			setError("API URL is not set. Please contact support.");
			return;
		}

		try {
			const url = `${apiURL}api/users`;
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
			setError("");
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				setError(error.response.data.message || "An error occurred.");
			} else if (error.request) {
				// The request was made but no response was received
				setError("No response from server. Please check your network and try again.");
			} else {
				// Something happened in setting up the request that triggered an Error
				setError("An error occurred while sending the request. Please try again.");
			}
			setMsg("");
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
						Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;


