import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// spinners import stuff
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// end spinners import stuff
const URL = "http://localhost:3001";

export default function Enter() {
  let params = useParams();
  let navigate = useNavigate();

  const signIn = async (email, magicLink) => {
    try {
      const res = await axios.post(`${URL}/users/enter`, { email, magicLink });
      if (res.data.token) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    debugger;
    signIn(params.email, params.link);
  }, []);

  return (
    <div>
      <p>Verifying your magic link</p>
      <FadeLoader color={"black"} loading={true} css={override} size={50} />
    </div>
  );
}
