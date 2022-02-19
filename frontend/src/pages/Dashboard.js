import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return <div>DashBoard</div>;
}

export default DashBoard;
