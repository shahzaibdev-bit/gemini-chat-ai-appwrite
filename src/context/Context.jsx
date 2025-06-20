import { createContext, useEffect, useState } from "react";
import main from "../config/gemini";
import service from "../appwrite/config"; // appwrite service class
import { useSelector } from "react-redux";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const { userData } = useSelector((state) => state.auth);

  // Fetch prompts when user logs in
  useEffect(() => {
    if (userData?.$id) {
      fetchUserPrompts(userData.$id);
    }
  }, [userData]);

  const fetchUserPrompts = async (userId) => {
    try {
      const response = await service.getPrompts(userId);
      if (response && response.documents) {
        const prompts = response.documents.map((doc) => doc.prompts);
        setPrevPrompt(prompts);
      }
    } catch (err) {
      console.error("Error fetching user prompts:", err);
    }
  };

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let finalPrompt = prompt || input;
    setRecentPrompt(finalPrompt);
    setPrevPrompt((prev) => [...prev, finalPrompt]);

    if (userData?.$id) {
      try {
        console.log("Storing prompt:", finalPrompt);
        await service.storePrompt({
          prompts: finalPrompt, // Corrected field
          userId: userData.$id,
        });
      } catch (error) {
        console.error("Error storing prompt:", error);
      }
    }

    const response = await main(finalPrompt);

    if (response) {
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          newResponse += `<h3>${responseArray[i]}</h3>`;
        } else {
          newResponse += responseArray[i];
        }
      }

      let newResponse2 = newResponse.split("*").join("<br/>");
      let formattedResponse = newResponse2.replace(/(\d+)\.\s*/g, "<br/>$1. ");
      let words = formattedResponse.split(" ");
      for (let i = 0; i < words.length; i++) {
        delayPara(i, words[i] + " ");
      }

      setInput("");
    }

    setLoading(false);
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
