import React, { useState } from "react";
import InputText from "../../components/input-text/input-text";
import Button from "../../components/button/button";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle, signInWithMail } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signInGoogle = () => {
    console.log(signInWithGoogle());
  };

  const signInEmail = async () => {
    const res = await signInWithMail(email, password);
    if (!res) {
      setError("Błędy login lub hasło");
    } else {
      console.log(1);
    }
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="flex h-[400px] flex-col-reverse md:flex-row">
        <div className="w-[300px] rounded-b-xl bg-white p-3 shadow-lg md:rounded-b-none md:rounded-l-xl">
          <div className="flex h-[100%] flex-col items-center justify-center">
            <div className="mb-5 text-3xl font-medium">Logowanie</div>
            <div
              className="mb-4 flex cursor-pointer flex-row gap-3 rounded-lg bg-blue-500 px-2 py-2 text-white"
              onClick={signInGoogle}
            >
              <GoogleIcon className="" />
              Logowanie Google
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
            <div className="mb-4">{error}</div>
            <div className="">
              <Button text="Zaloguj" onClick={signInEmail} />
            </div>
          </div>
        </div>
        <div className="flex w-[300px] flex-col justify-center rounded-t-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3 shadow-lg md:rounded-l-none md:rounded-r-xl">
          <div className="mb-5 text-center text-3xl font-bold text-white">
            AquaFriend
          </div>
          <div className="px-3 text-center text-lg text-white">
            Oferujemy najlepszy manager akwarium na rynku
          </div>
          <div className="mt-8 px-3 text-center text-white">
            Nie masz konta?
          </div>
          <div
            className="mt-2 px-3 text-center text-white"
            onClick={() => navigate("/registration")}
          >
            Zarejestruj się
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
