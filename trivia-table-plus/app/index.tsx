import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const categories = [
    {
      image: require("@/assets/images/cardCience.png"),
      name: "Ciência",
      route: "Ciência",
    },
    {
      image: require("@/assets/images/cardSport.png"),
      name: "Esportes",
      route: "Esportes",
    },
    {
      image: require("@/assets/images/cardGeography.png"),
      name: "Geografia",
      route: "Geografia",
    },
    {
      image: require("@/assets/images/cardArt.png"),
      name: "Artes",
      route: "Artes",
    },
    {
      image: require("@/assets/images/cardHistory.png"),
      name: "Historia",
      route: "Historia",
    },
    {
      image: require("@/assets/images/cardEnterteriment.png"),
      name: "Entretenimento",
      route: "Entretenimento",
    },
  ];

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.text}>Escolha a Categoria</Text>
      </View>
      <View style={styles.buttonContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.imageButton}
            onPress={() => router.push(`/${category.route}`)}
          >
            <ImageBackground
              source={category.image}
              style={styles.image}
              imageStyle={{ borderRadius: 12 }}
            >
              <Text style={styles.imageText}>{category.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content2}>
        <Text style={styles.text}>Feito por Murilo</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  content: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    width: "90%",
  },
  content2: {
    padding: 8,
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: 22,
    width: "70%",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
    flexGrow: 1,
    alignContent: "center",
    alignItems: "center",
  },
  imageButton: {
    width: "40%",
    height: undefined,
    aspectRatio: 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 32,
      height: 32,
    },
    shadowOpacity: 1.29,
    shadowRadius: 12,
    elevation: 23,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  imageText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 8,
    paddingVertical: 4,
  },
});
