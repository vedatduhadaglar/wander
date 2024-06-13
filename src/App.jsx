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
    const toastTimer = setTimeout(() => {
      toast({
        title: "Under Maintenance 👷🏼",
        description:
          "Due to OpenAI's pricing policy change, Wander is temporarily unavailable. The issue will be fixed ASAP. \n -Vedat",
        status: "info",
        duration: 8000,
        isClosable: true,
      });
    }, 800);

    // Clear the timeout on component unmount (cleanup)
    return () => clearTimeout(toastTimer);
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
