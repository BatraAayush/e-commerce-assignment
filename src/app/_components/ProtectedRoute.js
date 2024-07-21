"use client";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Header from "../_components/Header";
import SpinningLoader from "./SpinningLoader";

const ProtectedRoute = ({ children, publicRoute = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (publicRoute && user) {
        router.push("/"); 
      } else if (!publicRoute && !user) {
        router.push("/login");
      }
    }
  }, [user, loading, router, publicRoute]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center mt-[5rem]">
        <SpinningLoader large={true}/>
        </div>
      </div>
    );
  }

  if (!publicRoute && !user) {
    return null;
  }

  return (
    <div>
      <Header userName={user?.name}/>
      {children}
    </div>
  );
};

export default ProtectedRoute;
