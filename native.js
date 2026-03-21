// =====================navigation#01===============================================
import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Entypo from "@expo/vector-icons/Entypo";

const Stack = createStackNavigator();

// =====================สร้าง Screen Components======================================
function HomeScreen({ navigation }) { 
  // navigation จาก React Navigation ส่งเข้ามาให้ จึงไม่ต้องใช้  useNavigation Hook ของไลบรารี React Navigation
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>หน้าแรก</Text>
      <Button
        title="ไปหน้าถัดไป"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>หน้ารายละเอียด</Text>
    </View>
  );
}
// =================================================================================

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" // ชื่อสำหรับอ้างอิงในการ navigate
          component={HomeScreen} // component ที่จะแสดงในหน้านี้
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerBackImage: () => (
              <Image
                source={require("./assets/back-arrow.png")}
                style={{ width: 24, height: 24, marginLeft: 10 }}
              />
            ),
          }}
          // options={({ navigation }) => ({
          //   // รับ navigation จาก options
          //   headerLeft: () => (
          //     <Entypo
          //       name="arrow-with-circle-left"
          //       size={24}
          //       color="black"
          //       onPress={() => navigation.goBack()}
          //     />
          //   ),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

// =================================================================================
// =====================navigation#02===============================================
import { Text, View, Button } from "react-native";
import React from "react";
import { styles } from "../App"; // ดึงตัวแปรชื่อ styles จากไฟล์ App.js ที่อยู่ “โฟลเดอร์ระดับบน”

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า A"
          onPress={() => navigation.navigate("Screen A")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า B"
          onPress={() => navigation.navigate("Screen B")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า C"
          onPress={() => navigation.navigate("Screen C")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
// ===================================================================================

import { Text, View, Button } from "react-native";
import React from "react";
import { styles } from "../App";

const CompAScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CompA Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า B"
          onPress={() => navigation.navigate("Screen B")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า C"
          onPress={() => navigation.navigate("Screen C")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="กลับหน้าหลัก " onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

export default CompAScreen;
// ===================================================================================

import { Text, View, Button } from "react-native";
import React from "react";
import { styles } from "../App";

const CompBScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CompB Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า A"
          onPress={() => navigation.navigate("Screen A")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า C"
          onPress={() => navigation.navigate("Screen C")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="กลับหน้าหลัก " onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

export default CompBScreen;
// ===================================================================================

import { Text, View, Button } from "react-native";
import React from "react";
import { styles } from "../App";

const CompCScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CompC Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า A"
          onPress={() => navigation.navigate("Screen A")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า B"
          onPress={() => navigation.navigate("Screen B")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="กลับหน้าหลัก " onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

export default CompCScreen;
// ===================================================================================

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import HomeScreen from "./Components/HomeScreen";
import CompAScreen from "./Components/CompAScreen";
import CompBScreen from "./Components/CompBScreen";
import CompCScreen from "./Components/CompCScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" // กำหนดให้เริ่มที่หน้า Home
        // initialRouteName="Screen A" // กำหนดให้เริ่มที่หน้า Screen A
        screenOptions={({ navigation }) => ({ // ใช้ได้เลยเพราะ React Navigation จะ inject navigation เข้ามาให้โดยอัตโนมัติ
          // สีและสไตล์ของ header
          headerStyle: {
            backgroundColor: "#2196F3",
            height: 80,
          },
          // สไตล์ของข้อความ title
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
          },
          // จัดตำแหน่ง title
          headerTitleAlign: "center",
          // สีของปุ่ม back
          headerTintColor: "#fff",
          // กำหนดปุ่ม back custom
          headerLeft: () => (
            <Entypo
              name="arrow-with-circle-left"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          ),
          // เพิ่มปุ่มด้านขวา header
          headerRight: () => <Entypo name="menu" size={24} color="black" />,
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => null, // ไม่แสดงปุ่มกลับ
          }}
        />
        <Stack.Screen name="Screen A" component={CompAScreen} />
        <Stack.Screen name="Screen B" component={CompBScreen} />
        <Stack.Screen name="Screen C" component={CompCScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// สไตล์สำหรับ components ภายในหน้าต่างๆ
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "60%", // ความกว้างของปุ่ม
    marginVertical: 5, // ระยะห่างด้านบนและล่าง
  },
});

// ส่งออก styles เพื่อให้ component อื่นๆ นำไปใช้
export { styles };

// =================================================================================
// =====================navigation#03===============================================
import { Text, View, Button } from "react-native";
import React from "react";
import { styles } from "../App";

const CompAScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CompA Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า B"
          onPress={() =>
            navigation.navigate("Screen B", {
              itemId: 86,
              itemName: "Test Item",
              description: "This is a test item",
              price: 99.99,
            })
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า C"
          onPress={() => navigation.navigate("Screen C")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="กลับหน้าหลัก " onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

export default CompAScreen;
// =================================================================================
import { Text, View, Button } from "react-native";
import React from "react";
import { styles } from "../App";

const CompBScreen = ({ route, navigation }) => {
  const { itemId, itemName, description, price } = route.params ?? {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CompB Screen</Text>
      <Text>Item Details</Text>
      <Text>ID: {itemId}</Text>
      <Text>Name: {itemName}</Text>
      <Text>Description: {description}</Text>
      <Text>Price: ${price}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า A"
          onPress={() => navigation.navigate("Screen A")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="ไปหน้า C"
          onPress={() => navigation.navigate("Screen C")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="กลับหน้าหลัก " onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
};

export default CompBScreen;
// =================================================================================
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import HomeScreen from "./Components/HomeScreen";
import CompAScreen from "./Components/CompAScreen";
import CompBScreen from "./Components/CompBScreen";
import CompCScreen from "./Components/CompCScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" // กำหนดให้เริ่มที่หน้า Home
        // initialRouteName="Screen A" // กำหนดให้เริ่มที่หน้า Screen A
        screenOptions={({ navigation }) => ({
          // สีและสไตล์ของ header
          headerStyle: {
            backgroundColor: "#2196F3",
            height: 80,
          },
          // สไตล์ของข้อความ title
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
          },
          // จัดตำแหน่ง title
          headerTitleAlign: "center",
          // สีของปุ่ม back
          headerTintColor: "#fff",
          // กำหนดปุ่ม back custom
          headerLeft: () => (
            <Icon
              name="arrow-left-circle"
              type="material-community"
              size={40}
              color="white"
              containerStyle={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
          // เพิ่มปุ่มด้านขวา header
          headerRight: () => (
            <Icon
              name="menu"
              type="material"
              size={30}
              color="#fff"
              containerStyle={{ marginRight: 10 }}
            />
          ),
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => null, // ไม่แสดงปุ่มกลับ
          }}
        />
        <Stack.Screen name="Screen A" component={CompAScreen} />
        <Stack.Screen
          name="Screen B"
          component={CompBScreen}
          initialParams={{
            itemId: 0,
            itemName: "Default Nam",
            description: "Default description",
            price: 0,
          }}
        />
        <Stack.Screen name="Screen C" component={CompCScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// สไตล์สำหรับ components ภายในหน้าต่างๆ
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "60%", // ความกว้างของปุ่ม
    marginVertical: 5, // ระยะห่างด้านบนและล่าง
  },
});

// ส่งออก styles เพื่อให้ component อื่นๆ นำไปใช้
export { styles };
// =================================================================================
// =================================================================================
