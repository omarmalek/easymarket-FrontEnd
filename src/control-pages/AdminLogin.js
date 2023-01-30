import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();

  // const PHONE_REGEX = /[0-9]{7,}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState(localStorage.getItem("adminUser"));
  const [roleName, setRoleName] = useState(localStorage.getItem("roleName"));
  const [passsword, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    dispaching();
  }, [roleName]);
  const dispaching = () => {
    if (roleName) {
      if (roleName === "Admin") {
        navigate(`/admin/main`);
      }
      if (roleName === "Setter") {
        navigate(`/set`);
      }
      if (roleName === "Delivery") {
        navigate(`/dv`);
      }
    }
  };

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
        "http://localhost:8080/authenticateAdmins",
        JSON.stringify({
          userName: username,
          userPassword: passsword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const token = response.data.jwtToken;
      const userName = response.data.userName;
      const roleName = response.data.roleName;

      setRoleName(roleName);
      setUsername(userName);

      localStorage.setItem("admintoken", "Bearer " + token);
      localStorage.setItem("adminUser", userName);
      localStorage.setItem("roleName", roleName);

      setUsername("");
      setPassword("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("هنالك خطأ في اسم المستخدم أو كلمة المرور ");
      }
    }
  };
  return (
    <div>
      <br></br>

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
          <h3>أدارة التطبيق</h3>
          <form onSubmit={handleLogIn}>
            <label> اسم المستخدم </label>
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
        </section>
      </div>
    </div>
  );
};

export default Login;
