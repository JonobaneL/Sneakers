import React, { useState } from "react";
import styles from "./PasswordReset.module.scss";
import ValidationErrorMessages from "../../components/ValidationErrorMessages/ValidationErrorMessages";
import CInput from "../../components/UI/input/CInput";
import { useInput } from "../../hooks/useInput";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Toast from "../../components/ToastV2/Toast";

const PasswordReset = () => {
  const { resetPassword } = useAuth();
  const email = useInput(
    "",
    { isEmpty: true, isEmail: true },
    {
      isEmpty: "Email can't be blank",
      isEmail: "Provide a valid email address",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    type: "success",
    title: "",
    triger: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await resetPassword(email.value);
      setToast({
        type: "none",
        title: "Check your inbox for instructions",
        triger: true,
      });
    } catch {
      setToast({
        type: "error",
        title: "Failed to reset password",
        triger: true,
      });
    }
    setIsLoading(false);
  };
  const isFormValid = (params, loading) => {
    return params.includes(false) || loading == true ? true : false;
  };
  return (
    <div className={styles["password-reset"]}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Password Reset</h2>
          <ValidationErrorMessages
            durty={email.isDurty}
            errorMessages={email.currentErrors}
          >
            <CInput
              value={email.value}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
              id="email"
              mode="fullBorder"
              height="50"
              placeholder="Email"
              type="email"
              valid={email.isDurty && email.currentErrors.length > 0}
            />
          </ValidationErrorMessages>
          <button
            className={styles["submit-btn"]}
            type="submit"
            disabled={isFormValid([email.isValid], isLoading)}
          >
            Reset Password
          </button>
        </form>
        <div className={styles.message}>
          <p>
            Back to <Link to="/log-in">Log In</Link>
          </p>
        </div>
      </div>
      <Toast
        type={toast.type}
        title={toast.title}
        triger={toast.triger}
        closeHandler={(value) =>
          setToast((p) => {
            return { ...p, triger: value };
          })
        }
      />
    </div>
  );
};

export default PasswordReset;
