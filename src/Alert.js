import React, { useEffect, useState } from "react";

export default function Alert({ style, msg, removeAlert }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);
  return <p className={`alert alert-${style}`}>{msg}</p>;
}
//code to put in parent or context
//this is state >>
// const [alert, setAlert] = useState({ show: false, style: "", msg: "" });

//this is Functions >>
// const showAlert = (style, msg) => {
//   setAlert({ shpw:true, style, msg });
// };

//this where the alert displayed to make component refresh >>
// const removeAlert =()=>{
//     setAlert({false, "", ""});
// }

//this to put inside JSX >>
//  {alert.show && <Alert {...alert} removeAlert={removeAlert} />;}
