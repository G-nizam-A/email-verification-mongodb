import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const [error, setError] = useState("");

    const params = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            const apiURL = process.env.REACT_APP_API_URL;
            try {
                const url = `${apiURL}api/users/${params.id}/verify/${params.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.error("Email verification error:", error);
                setValidUrl(false);
                setError("An error occurred while verifying your email. Please try again.");
            }
        };
        verifyEmailUrl();
    }, [params]);

    return (
        <div className={styles.container}>
            {validUrl ? (
                <div className={styles.success_container}>
                    <img src={success} alt="Success" className={styles.success_img} />
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <button className={styles.green_btn}>Login</button>
                    </Link>
                </div>
            ) : (
                <div className={styles.error_container}>
                    <h1>404 Not Found</h1>
                    {error && <p>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default EmailVerify;
