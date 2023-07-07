import Hero from "./components/Hero";
import "./App.css";
import { useEffect } from "react";
import Form from "./components/Form";
import { FloatButton, notification } from "antd";
import { balloon } from "./assets";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const gifIcon = <img src={balloon} alt="GIF icon" />;
  return (
    <main className="fade">
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Form />
        <FloatButton.BackTop icon={gifIcon} tooltip={"Float Up"} />
      </div>
    </main>
  );
};

export default App;
