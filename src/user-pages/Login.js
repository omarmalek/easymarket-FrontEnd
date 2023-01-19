import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [passsword, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, passsword]);

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!username || !passsword) {
      setErrMsg("أدخل اسم المستخدم وكلمةالمرور!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/authenticate",
        JSON.stringify({
          userName: username,
          userPassword: passsword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const token = response.accessToken;
      localStorage.setItem("token", token);
      //should erease the Local Storage temp customer here...
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      //setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUsername("");
      setPassword("");

      navigate(`/customerhistory/10`);
      //navigate(`/customerhistory/${customer.id}`);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("هنالك خطأ في اسم المستخدم أو كلمة المرور ");
      }
    }
  };
  return (
    <div className="Signup-component">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Login</h1>

        <form onSubmit={handleLogIn}>
          <label>اسم المستخدم</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            ref={userRef}
            //required
          />

          <label> كلمة المرور</label>
          <input
            type="password"
            value={passsword}
            onChange={(e) => setPassword(e.target.value)}
            //required
          />

          <button>Long in</button>
        </form>
        <p>
          ليس لديك حساب؟
          <br />
          <span className="line">
            <Link to="/signup"> انشاء حساب </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
