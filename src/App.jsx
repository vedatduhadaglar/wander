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
        title: "Hey there 🙋🏻‍♂️",
        description:
          "Due to the high demand on the GPT API, load times might be long depending on when you use the app. Sorry for the incovinience and good travelling. \n -Vedat",
        status: "info",
        duration: 8000,
        isClosable: true,
        // position: "bottom-right",
      });
    }, 800);

    // Clear the timeout on component unmount (cleanup)
    return () => clearTimeout(toastTimer);
  }, [toast]);

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
