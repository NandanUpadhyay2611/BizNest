
import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/Button"; 
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const { user, setUser } = useAuth();
  const navigate=useNavigate();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img src={user.picture} alt="profile" className="w-8 h-8 rounded-full" />
        <span className="text-sm">{user.name}</span>
        <Button
          variant="outline"
          onClick={() => {
            googleLogout();
            setUser(null);
          }}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
       const decoded = jwtDecode(credentialResponse.credential);
setUser({
  name: decoded.name,
  email: decoded.email,
  picture: decoded.picture,
  token: credentialResponse.credential
});
    navigate('/home')}}
      onError={() => alert("Login Failed")}
    />
  );
}
