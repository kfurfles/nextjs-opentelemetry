import { getAuth } from "firebase/auth";
import { useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";

export const useLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(
    getAuth()
  );

  const login = async () => {
    return signInWithGoogle(["profile", "email"]).then((resp) => {
      localStorage.setItem('@firebase', JSON.stringify(resp))
    })
  };

  return {
    login,
    user,
    loading,
    error,
  };
};

export const useLogout = () => {
  const [signOut, loading, error] = useSignOut(getAuth());

  const logout = () => {
    return signOut()
      .then(() => localStorage.clear())
  }

  return {
    logout,
    loading, 
    error
  }
}
