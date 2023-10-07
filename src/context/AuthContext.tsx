//LOCAL ONDE OCORRE A COMUNICAÇÃO DAS APIS (REGISTRO, SENHA E QUALQUER OUTRA ROTA)

// import api from "@/services/api";
import { ReactNode, createContext, useState } from "react";
// import { AxiosResponse } from "axios";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { destroyCookie, parseCookies, setCookie } from "nookies";
// import { ReactNode, createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

interface IUser {
  user_email: string;
  user_name: string;
  saram: string;
  password: string;
  confirm_password?: string;
}

interface IAuthProvider {
  children: ReactNode;
}

// interface IAuthContext {
//     user: IUser | null;
//     signOut: () => Promise<void>;
//     signOutResident: () => Promise<void>;
//     currentBranch: ICurrentBranch | null;
//     getCurrentBranch: () => Promise<void>;
//     getProductPermissions: () => Promise<void>;
//     userBranches: IBranch[] | null;
//     getProfile: (userToken: string) => Promise<void>;
//     decodedToken: JwtPayload | null;
//     productDashboard: any;
// }

//export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  // const [user, setUser] = useState<IUser>({});
  return (
    console.log("OI")
    // <AuthContext.Provider
    //   value={
    //     {
    //         user,
    //         getProductPermissions,
    //         signOut,
    //         userBranches,
    //         currentBranch,
    //         getCurrentBranch,
    //         getProfile,
    //         decodedToken,
    //         signOutResident,
    //         productDashboard,
    //     }
    //   }
    // >
    //   {children}
    // </AuthContext.Provider>
  );
};

export default AuthProvider;
