//LOCAL ONDE OCORRE A COMUNICAÇÃO DAS APIS (REGISTRO, SENHA E QUALQUER OUTRA ROTA)
import { ReactNode, createContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
// import { AxiosResponse } from "axios";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { destroyCookie, parseCookies, setCookie } from "nookies";
// import { ReactNode, createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

interface IUser {
  email: string;
  name: string;
  saram: string;
  motorista: boolean;
  gestor: boolean;
  aprovador: boolean;
  emissor: boolean;
  password?: string;
  confirm_password?: string;
  photo?: string;
}

export interface IRegisterUser {
  email: string;
  name: string;
  saram: string;
  password: string;
  confirm_password?: string;
  photo?: string;
}

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  user: IUser;
  //signOut: () => Promise<void>;
  //signOutResident: () => Promise<void>;
  registerUser: (data: IRegisterUser) => Promise<void>;
  // currentBranch: ICurrentBranch | null;
  //getCurrentBranch: () => Promise<void>;
  //getProductPermissions: () => Promise<void>;
  // userBranches: IBranch[] | null;
  //getProfile: (userToken: string) => Promise<void>;
  // decodedToken: JwtPayload | null;
  // productDashboard: any;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser>({
    name: "Testando",
    saram: "123123123123",
    email: "testando#gmail.com",
    password: "XXXXXX",
    motorista: true,
    gestor: true,
    aprovador: true,
    emissor: true,
    photo: "imagem"
  }); {/* Esse usuário TESTANDO é para teste! */ }

  const navigate = useNavigate();

  const registerUser = async (data: IRegisterUser) => {
    try {
      // await api.post("/registraUsuario", data);
      setUser({
        name: data.name,
        saram: data.saram,
        email: data.email,
        motorista: true,
        gestor: true,
        aprovador: true,
        emissor: true,
        photo: "imagem"
      });


      // Checking if user.name has registered by RegisterForm
      // FIXME: Remove it when sync with database
      if (user.email === "testando#gmail.com" && user.password === "XXXXXX") {
        toast.error(`Ops! Deu algo de errado!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Cadastramos você, agora faça o login!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/", { replace: true });
      }

      toast.success(`Cadastramos você, agora faça o login!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/", { replace: true });

    } catch (err) {
      toast.error(`Ops! Deu algo de errado!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
