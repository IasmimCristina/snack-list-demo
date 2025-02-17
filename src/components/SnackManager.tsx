import React from "react";
import SnackForm from "./SnackForm";
import SnackList from "./SnackList";
import { SnackState } from "../reducers/snackReducer";
import { User } from "../types/User";

type SnackManagerProps = {
  snacks: SnackState;
  dispatch: React.Dispatch<any>;
  user: User;
};

const SnackManager: React.FC<SnackManagerProps> = ({
  snacks,
  dispatch,
  user,
}) => {
  if (!user.isLoggedIn) {
    return (
      <p className="app__message">
        Login to start adding your favorite snacks!
      </p>
    );
  }

  return (
    <div className="app__content">
      <SnackForm dispatch={dispatch} />
      <div className="app__lists">
        <SnackList
          title="Snacks I like 👍"
          snacks={snacks.likes}
          dispatch={dispatch}
        />
        <SnackList
          title="Snacks I do not like 👎"
          snacks={snacks.dislikes}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default SnackManager;
