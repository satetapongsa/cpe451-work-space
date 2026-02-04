import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { styles } from './styles/app.styles';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const Content = ({ children }) => {
  return (
    <View style={styles.contentContainer}>
      {children}
    </View>
  );
};

const MyButton = ({ title, onPress, styleType }) => {
  return (
    <TouchableOpacity style={[styles.btn, styleType]} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

//Main App Component (Root)

export default function App() {
  //State สำหรับคะแนน
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  //Load Fonts
  const [fontsLoaded] = useFonts({
    'PlaypenSansThai-Bold': require('./assets/fonts/PlaypenSansThai-Bold.ttf'),
    'PlaypenSansThai-Regular': require('./assets/fonts/PlaypenSansThai-Regular.ttf'),
  });

  //eturn null/Loading View
  if (!fontsLoaded) {
    return null;
  }

  //Functions
  const handleIncreaseLike = () => {
    setLike(like + 1);
  };

  const handleIncreaseDislike = () => {
    setDislike(dislike + 1);
  };

  const handleClearVote = () => {
    //Alert
    Alert.alert(
      "ยืนยันการล้างคะแนน",
      "คุณต้องการรีเซ็ตคะแนนทั้งหมดใช่หรือไม่?",
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        {
          text: "ลบ",
          style: "destructive", // สีแดงใน iOS
          onPress: () => {
            setLike(0);
            setDislike(0);
          }
        }
      ]
    );
  };

  // --- Render ---
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>

        {/* Header Component */}
        <Header title="=== My Vote ===" />

        {/* Content Component */}
        <Content>

          {/* ส่วนแสดงคะแนน */}
          <View style={styles.voteBoard}>
            <Text style={styles.scoreText}>Like: {like}</Text>
            <Text style={styles.scoreText}>DisLike: {dislike}</Text>
          </View>

          {/* ส่วนปุ่มกด */}
          <View style={styles.buttonGroup}>
            <View style={styles.actionButtons}>
              <MyButton
                title="LIKE"
                onPress={handleIncreaseLike}
                styleType={styles.btnLike}
              />
              <MyButton
                title="DISLIKE"
                onPress={handleIncreaseDislike}
                styleType={styles.btnDislike}
              />
            </View>

            {/* ปุ่ม Clear Vote เรียกใช้ TouchableOpacity โดยตรงหรือผ่าน Component ก็ได้ */}
            <TouchableOpacity style={styles.btnClear} onPress={handleClearVote}>
              <Text style={styles.btnText}>CLEAR VOTE</Text>
            </TouchableOpacity>
          </View>

        </Content>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}