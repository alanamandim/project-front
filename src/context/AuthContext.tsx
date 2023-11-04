//LOCAL ONDE OCORRE A COMUNICAÇÃO DAS APIS (REGISTRO, SENHA E QUALQUER OUTRA ROTA)
import { ReactNode, createContext, useEffect, useState } from "react";
// import { AxiosResponse } from "axios";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { destroyCookie, parseCookies, setCookie } from "nookies";
// import { ReactNode, createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

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
  idSolicitacao: number | null;
  setIdSolicitacao: React.Dispatch<React.SetStateAction<any>>;
  //signOut: () => Promise<void>;
  //signOutResident: () => Promise<void>;
  // currentBranch: ICurrentBranch | null;
  //getCurrentBranch: () => Promise<void>;
  //getProductPermissions: () => Promise<void>;
  // userBranches: IBranch[] | null;
  getUser: (email: string) => Promise<void>;
  getSolicitacaoId: (saram: string) => Promise<void>;
  // decodedToken: JwtPayload | null;
  // productDashboard: any;
}

export const AuthContext = createContext({} as IAuthContext);
const url = "http://localhost:8080";

const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [emailGet, setEmailGet] = useState<string>({} as string);
  const [idSolicitacao, setIdSolicitacao] = useState(null);

  async function getUser(email: string) {
    const response = await fetch(url + `/email/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
      setEmailGet(user.email);
    }
  }

  async function getSolicitacaoId(saram: string) {
    const response = await fetch(
      // FIXME: Change the URL to get tanque selects
      url + `/listaSolicitacaoInspecao/${saram}`,
      {
        method: "GET",
        // FIXME: Check if the post method is correct
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setIdSolicitacao(data.idSolicitacao);
      // FIXME: Change the state than will receive the value
    }
  }

  useEffect(() => {
    getUser(emailGet);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        getUser,
        idSolicitacao,
        setIdSolicitacao,
        getSolicitacaoId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
