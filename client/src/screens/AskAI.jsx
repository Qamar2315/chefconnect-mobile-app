import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const AskAIScreen = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAskAI = () => {
    // Here you would implement logic to send the question to your AI system and get a response
    // For this example, let's just echo the question as the response
    setResponse(question);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
        placeholder="Ask your question..."
        value={question}
        onChangeText={(text) => setQuestion(text)}
      />
      <Button title="Ask AI" onPress={handleAskAI} />
      {response !== "" && (
        <View style={{ marginTop: 20 }}>
          <Text>AI Response:</Text>
          <Text>{response}</Text>
        </View>
      )}
    </View>
  );
};

export default AskAIScreen;
