import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passsword, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  const handleLogIn = () => {};
  return (
    <div className="Signup-component">
      <section>
        <h1>Login</h1>
        {errMsg && <p>هنالك خطأ في اسم المستخدم أو كلمة المرور</p>}
        <form onSubmit={handleLogIn}>
          <label>اسم المستخدم</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label> كلمة المرور</label>
          <input
            type="password"
            value={passsword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button>Long in</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
