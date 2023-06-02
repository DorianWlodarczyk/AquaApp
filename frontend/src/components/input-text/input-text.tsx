import React, { useEffect, useState } from "react";
import style from "./input-text.module.css";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface props {
  password?: boolean;
  error?: boolean;
  searchIcon?: boolean;
  value?: string;
  helperText?: string;
  label?: string;
  clearIcon?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputText = ({
  value,
  helperText,
  searchIcon,
  password,
  error,
  label,
  clearIcon,
  onChange,
  onFocus,
  onBlur,
}: props) => {
  const [localError, setLocalError] = useState(false);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setLocalError(false);
    }
    if (onChange) onChange(e.target.value);
  };

  const onClearHandler = () => {
    if (onChange) onChange("");
  };

  const onFocusHandler = () => {
    if (onFocus) onFocus();
  };

  const onBlurHandler = () => {
    if (onBlur) onBlur();
  };

  useEffect(() => {
    if (value !== "") {
      setLocalError(error ?? false);
    }
  }, [error, value]);

  return (
    <div className="relative">
      <input
        className={`${style.inputText} ${localError ? style.errorText : ""} ${
          searchIcon ? style.withSearchIcon : ""
        }`}
        type={password ? "password" : "text"}
        required={true}
        onChange={onChangeHandler}
        value={value}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />

      {searchIcon && (
        <span className={style.searchIcon}>
          <SearchIcon />
        </span>
      )}

      {label && (
        <span
          className={`${style.label} ${localError ? style.errorLabel : ""}`}
        >
          {label}
        </span>
      )}

      {helperText && (
        <span
          className={`${style.helperText}  ${
            localError ? style.errorLabel : ""
          }`}
        >
          {helperText}
        </span>
      )}

      {clearIcon && (
        <span className={style.clear} onClick={onClearHandler}>
          <HighlightOffIcon />
        </span>
      )}
    </div>
  );
};

export default InputText;
