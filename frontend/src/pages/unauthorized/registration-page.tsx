import React, { useState } from "react";
import InputText from "../../components/input-text/input-text";
import {
  getToken,
  signInWithGoogle,
  signInWithMail,
  signUpWithMail,
} from "../../utils/firebase";
import Button from "../../components/button/button";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="flex h-[400px] flex-row">
        <div className="w-[300px] rounded-l-xl bg-white shadow-lg">
          <div className="flex h-[100%] flex-col items-center justify-center">
            <div className="mb-5 text-3xl font-medium">Rejestracja</div>
            <div
              className="mb-4 flex cursor-pointer flex-row gap-3 rounded-lg bg-blue-500 px-2 py-2 text-white"
              onClick={signInWithGoogle}
            >
              <GoogleIcon className="" />
              Rejestracja Google
            </div>
            <div className="mb-4">
              <InputText
                label="email"
                onChange={(value) => setEmail(value)}
                value={email}
              />
            </div>
            <div className="mb-4">
              <InputText
                label="hasło"
                password
                onChange={(value) => setPassword(value)}
                value={password}
              />
            </div>
            <div className="">
              <Button
                text="Zarejestruj"
                onClick={async () => signUpWithMail(email, password)}
              />
            </div>
          </div>
        </div>
        <div className="flex w-[300px] flex-col justify-center rounded-r-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
          <div className="mb-5 text-center text-3xl font-bold text-white">
            AquaFriend
          </div>
          <div className="px-3 text-center text-lg text-white">
            Oferujemy najlepszy manager akwarium na rynku
          </div>
          <div className="mt-8 px-3 text-center text-white">
            Masz już konto?
          </div>
          <div
            className="mt-2 px-3 text-center text-white"
            onClick={() => navigate("/login")}
          >
            Zaloguj się
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
