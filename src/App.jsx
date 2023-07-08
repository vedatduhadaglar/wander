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

  // toast({
  //   title: "Hey there 🙋🏻‍♂️",
  //   description:
  //     "Due to the high demand on the GPT API load times might be long depending on what time you use the application. Sorry for the inconvenience and good travelling. \n -Vedat",
  //   status: "info",
  //   duration: 9000,
  //   isClosable: true,
  //   position: "bottom-right",
  //   containerStyle: {
  //     width: "500px",
  //     maxWidth: "100%",
  //   },
  // });

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
