import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";
import Header from "./Header";

const Login = () => {
  let navigate = useNavigate();
  const { customer, setCustomer } = useGlobalContext();
  //const PHONE_REGEX = /[0-9]{7,}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState(customer.phoneNumber);
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
      const url = "http://localhost:8080/authenticate";
      const response = await axios.post(
        url,
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
      localStorage.setItem("token", "Bearer " + token);
      const customerId = response.data.id;
      const userName = response.data.userName;
      const phone = response.data.phoneNumber;
      const address = response.data.address;
      //const city = response.data.customer.city; // for feuture use
      //const whatsappAcount = response.data.customer.whatsappAcount; // for feuture use
      setCustomer({
        id: customerId,
        name: userName,
        phoneNumber: phone,
        address: address,
        isAuthenticated: true,
      });
      navigate(`/customerhistory`);
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
      <Header />
      <br></br>
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

          <form onSubmit={handleLogIn}>
            <label> رقم الجوال</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              ref={userRef}
            />

            <label> كلمة المرور</label>
            <input
              type="password"
              value={passsword}
              onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default Login;
