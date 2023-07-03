import Hero from "./components/Hero";
import "./App.css";
import { useEffect } from "react";
import Form from "./components/Form";
import { FloatButton, notification } from "antd";
import { console_easteregg } from "./utils/util";

const App = () => {
  console.log(`%c${console_easteregg}`, "color: blue");

  useEffect(() => {
    notification.open({
      message: "Hey there! 🙋🏻‍♂️",
      description:
        "Due to the high demand on the GPT API, load times might be long depending on what time you use the app. Sorry for the inconvinience, and good travelling.   \n -Vedat  ",
      placement: "bottomRight",
      duration: 8,
    });
  }, []);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Form />
        <FloatButton.BackTop />
      </div>
    </main>
  );
};

export default App;
