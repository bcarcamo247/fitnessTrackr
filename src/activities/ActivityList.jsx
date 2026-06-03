import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const tryDelete = async (id) => {
    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (error) {
      setError(error.message);
    }
};
  return (
    <ul>
      {error && <p role="alert">{error}</p>}
      {activities.map((activity) => (
        <li key={activity.id}>{activity.name}
        {token && (<button onClick={() => tryDelete(activity.id)}>Delete</button>)}
        </li>
      ))}
    </ul>
  );
}
