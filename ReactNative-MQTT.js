import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import mqtt from "mqtt";

const App = () => {
  const clientRef = useRef(null);
  const [status, setStatus] = useState("disconnected");
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState([]);

  useEffect(() => {
    // ใช้ broker ที่รองรับ WebSocket / WSS
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");
    // console.log(client);
    // console.log(typeof client);
    // console.log("has on:", typeof client.on);
    // console.log("has publish:", typeof client.publish);
    // console.log("has subscribe:", typeof client.subscribe);
    // console.log("has end:", typeof client.end);

    clientRef.current = client;

    client.on("connect", () => {
      setStatus("connected");
      client.subscribe("spu/demo/temp", (err) => {
        if (err) {
          console.log("Subscribe error:", err);
        }
      });
    });

    client.on("message", (topic, payload) => {
      const text = payload.toString();
      setReceived((prev) => [`${topic}: ${text}`, ...prev]);
    });

    client.on("error", (err) => {
      console.log("MQTT error:", err);
      setStatus("error");
    });

    client.on("reconnect", () => {
      setStatus("reconnecting");
    });

    client.on("close", () => {
      setStatus("disconnected");
    });

    return () => {
      client.end();
    };
  }, []);

  const sendMessage = () => {
    if (!clientRef.current || status !== "connected") return;

    clientRef.current.publish("spu/demo/temp", message);
    setMessage("");
  };

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 60 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        MQTT Status: {status}
      </Text>

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="พิมพ์ข้อความ"
        style={{
          borderWidth: 1,
          marginTop: 16,
          marginBottom: 10,
          padding: 12,
          borderRadius: 8,
        }}
      />

      <Button title="Send MQTT Message" onPress={sendMessage} />

      <Text style={{ marginTop: 24, fontWeight: "bold", fontSize: 18 }}>
        Received:
      </Text>

      {received.map((item, index) => (
        <Text key={index}>
          {index}:{item}
        </Text>
      ))}
    </View>
  );
};

export default App;
