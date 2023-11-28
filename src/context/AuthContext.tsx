//LOCAL ONDE OCORRE A COMUNICAÇÃO DAS APIS (REGISTRO, SENHA E QUALQUER OUTRA ROTA)
import { ReactNode, createContext, useState } from "react";
import { toast } from "react-toastify";
// import { AxiosResponse } from "axios";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { destroyCookie, parseCookies, setCookie } from "nookies";
// import { ReactNode, createContext, useEffect, useState } from "react";

interface IUser {
  email: string;
  name: string;
  saram: string;
  motorista?: boolean;
  gestor?: boolean;
  aprovador?: boolean;
  chefe?: boolean;
  senha?: string;
  confirm_senha?: string;
  photo?: string;
}

export interface IViatura {
  placa: string;
  modelo: string;
  status: string;
}

export interface IModelo {
  modelo: string;
}

export interface IRegisterUser {
  email: string;
  name: string;
  saram: string;
  senha: string;
  confirm_senha?: string;
  photo?: string;
}

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  relatorio: any;
  setRelatorio: React.Dispatch<React.SetStateAction<any>>;
  submitLogin: () => Promise<void>;
  setSenha: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  senha: string;
  //signOut: () => Promise<void>;
  //signOutResident: () => Promise<void>;
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
  const [user, setUser] = useState<IUser>({} as IUser);
  const [relatorio, setRelatorio] = useState([]);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const url = "http://localhost:8080/";

  async function getEmail() {
    try {
      const response = await fetch(url + "email/" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.clear();
        const userJSON = JSON.stringify(data);
        window.localStorage.setItem("user", userJSON);
        window.location.href = "/dashboard";
      } else {
        // A solicitação falhou (código de status não 2xx)
        console.error("Falha no login:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  async function submitLogin() {
    const formData = { email, senha };

    // Exemplo de como enviar o arquivo para o back-end usando fetch API.
    fetch(url + "loginUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response: any) => {
        if (response.status === 200) {
          toast.success(`Login efetuado com sucesso!`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          getEmail();
        } else if (response.status === 401) {
          // Invalid ID
          toast.error("Ops! Login ou senha incorreto.");
        } else {
          toast.error("Ops! Login ou senha incorreto.");
        }
      })
      .catch((error) => {
        toast.error(`Ops! Algo inesperado aconteceu`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        relatorio,
        setRelatorio,
        submitLogin,
        setEmail,
        setSenha,
        email,
        senha,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
