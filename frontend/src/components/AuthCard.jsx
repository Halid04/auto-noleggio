import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { CircleUserRound } from "lucide-react";
import Login from "./Login";
import Register from "./Register";

function AuthCard() {
  const [visible, setVisible] = useState(false);
  const [showLogin, setShowLogin] = React.useState(true);
  const [showRegister, setShowRegister] = React.useState(false);

  const viewLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const viewRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div className="h-full w-full">
      <Button
        className="hover:bg-[#EEEEEE] py-1 px-2 rounded-lg inline-flex whitespace-nowrap w-full justify-center items-center outline-none bg-trasparent  text-[#192024]"
        // label="Accedi"
        onClick={() => setVisible(true)}
      >
        <CircleUserRound className="mr-1 " size={24} color="#192024" />
        <span className="hidden md:flex text-lg">Accedi</span>
      </Button>
      <Dialog
        visible={visible}
        style={{ width: "auto" }}
        onHide={() => setVisible(false)}
      >
        {showLogin ? (
          <Login viewRegister={viewRegister} setVisible={setVisible} />
        ) : null}
        {showRegister ? (
          <Register viewLogin={viewLogin} setVisible={setVisible} />
        ) : null}
      </Dialog>
    </div>
  );
}

export default AuthCard;
