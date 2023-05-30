import React from "react";
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
}: props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const onClearHandler = () => {
    if (onChange) onChange("");
  };

  return (
    <div className="relative">
      <input
        className={`${style.inputText} ${error ? style.errorText : ""} ${
          searchIcon ? style.withSearchIcon : ""
        }`}
        type={password ? "password" : "text"}
        required={true}
        onChange={onChangeHandler}
        value={value}
      />

      {searchIcon && (
        <span className={style.searchIcon}>
          <SearchIcon />
        </span>
      )}

      {label && (
        <span className={`${style.label} ${error ? style.errorLabel : ""}`}>
          {label}
        </span>
      )}

      {helperText && (
        <span
          className={`${style.helperText}  ${error ? style.errorLabel : ""}`}
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
