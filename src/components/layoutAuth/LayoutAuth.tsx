import React from "react";
import { Link } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <div>
          <ul>
            <li>
              <Link to={"/auth/signin"}>Sign In</Link>
            </li>
            <li>
              <Link to={"/auth/signup"}>Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
