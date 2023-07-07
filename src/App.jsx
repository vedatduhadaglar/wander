import Hero from "./components/Hero";
import "./App.css";
import { useEffect } from "react";
import Form from "./components/Form";
import { FloatButton, notification } from "antd";
import { balloon } from "./assets";

const App = () => {
  // useEffect(() => {
  //   notification.open({
  //     message: "Hey there! 🙋🏻‍♂️",
  //     description:
  //       "Due to the high demand on the GPT API, load times might be long depending on what time you use the app. Sorry for the inconvinience, and good travelling.   \n -Vedat  ",
  //     placement: "bottomRight",
  //     duration: 12,
  //   });
  // }, []);

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
