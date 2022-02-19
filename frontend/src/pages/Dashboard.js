import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, resetGoal } from "../features/goals/goalsSlice";

function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const { isLoading, isError, message, goals } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate("/login");

    dispatch(getGoals());
    return () => {
      dispatch(resetGoal());
    };
  }, [user, navigate, dispatch, message, isError]);

  if (isLoading) {
    return <Spinner />;
  }
  console.log(goals.data);
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals?.data?.length > 0 ? (
          <div className="goals">
            {goals?.data?.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default DashBoard;
