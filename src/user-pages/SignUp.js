import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "./api/axios";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const USER_REGEX = /[A-z0-9-_\u0621-\u064A ]{2,}$/;
const PWD_REGEX = /[a-zA-Z\u0621-\u064A0-9!@#$%*]{4,}$/;
//const PHONE_REGEX = /[0-9]{7,}$/;
// const REGISTER_URL = "/localhost:8080/registerNewUser";

const SignUp = () => {
  const { customer, updateCusomerInfo } = useGlobalContext();
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const passRef = useRef();

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  //const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    passRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(customer.name));
  }, [customer.name]);

  useEffect(() => {
    if (customer.phoneNumber)
      setValidPhoneNumber(() =>
        customer.phoneNumber.length > 0 ? true : false
      );
  }, [customer.phoneNumber]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [customer.name, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(customer.name);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/registerNewUser",
        JSON.stringify({
          userName: customer.name,
          password: pwd,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      //setUser("");
      setPwd("");
      setMatchPwd("");
      navigate(`/login`);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="Signup-component">
      {success ? (
        <section>
          <h1>تم تسجيل مستخدم جديد بنجاح!</h1>
          <p>
            <a href="/login"> سجل الدخول</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>إنشاء حساب</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="phone-number">رقم الجوال :</label>
            <input
              type="text"
              id="phone-number"
              ref={passRef}
              name="phoneNumber"
              onChange={updateCusomerInfo}
              value={customer.phoneNumber}
              required
            />
            <label htmlFor="username">اسم المستخدم:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={updateCusomerInfo}
              value={customer.name}
              name="name"
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              id="uidnote"
              className={
                userFocus && customer.name && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              أدخل أية حروف عربية أو انجليزيةأو أرقام
              <br />
              يجب ان لا يبدأ اسم المستخدم برقم
              <br />
              يسمح بالارقام والحروف و underscoresو hyphens .
            </p>
            <label htmlFor="adress">العنوان :</label>
            <textarea
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={updateCusomerInfo}
              required
            />

            <label htmlFor="password">
              كلمة السر:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              أدخل أية حروف عربية أو انجليزيةأو أرقام
              <br />
              أدخل أربعة حروف أو أرقام على الأقل
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              تأكيد كلمة السر:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={
                !validName || !validPwd || !validMatch || !validPhoneNumber
                  ? true
                  : false
              }
            >
              إنشاء حساب
            </button>
          </form>
          <p>
            هل تملك حساب؟
            <br />
            <span className="line">
              <Link to="/login"> تسجيل الدخول</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default SignUp;
