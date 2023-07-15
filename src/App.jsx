import Hero from "./components/Hero";
import "./App.css";
import { useEffect } from "react";
import Form from "./components/Form";
import AOS from "aos";
import "aos/dist/aos.css";
import { useToast } from "@chakra-ui/react";

const App = () => {
  const toast = useToast();
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="fade">
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Form />
      </div>
    </main>
  );
};

export default App;
