//LOCAL ONDE OCORRE A COMUNICAÇÃO DAS APIS (REGISTRO, SENHA E QUALQUER OUTRA ROTA)
import { ReactNode, createContext, useState } from "react";
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

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        relatorio,
        setRelatorio,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
