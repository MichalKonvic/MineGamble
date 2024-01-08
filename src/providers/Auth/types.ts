import { AuthError, AuthTokenResponsePassword, Session } from "@supabase/supabase-js";

interface IAuthContext {
    login: (email: string, password: string) => Promise<AuthTokenResponsePassword>; 
    discordLogin: () => void;
    logout: () => void;
    session: null|Session;
    isLoading: boolean;
}
export type {IAuthContext};