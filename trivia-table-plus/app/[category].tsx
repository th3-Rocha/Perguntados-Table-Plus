import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { questionsDatabase } from "../utils/questionsLoader";

export default function CategoryScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Randomiza as perguntas apenas uma vez quando o componente é montado
  const randomizedQuestions = useMemo(() => {
    const questions =
      questionsDatabase[category as keyof typeof questionsDatabase] || [];

    if (questions.length === 0) return [];

    // Primeiro, identifica todas as dificuldades disponíveis
    const availableDifficulties = [
      ...new Set(questions.map((q) => q.difficulty).filter(Boolean)),
    ];

    if (availableDifficulties.length === 0) {
      // Fallback: se não houver dificuldades definidas, usa a lógica anterior
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(2, questions.length));
    }

    // Escolhe uma dificuldade aleatória
    const randomDifficulty =
      availableDifficulties[
        Math.floor(Math.random() * availableDifficulties.length)
      ];

    // Filtra perguntas da dificuldade escolhida
    const questionsOfDifficulty = questions.filter(
      (q) => q.difficulty === randomDifficulty
    );

    // Embaralha e seleciona até 2 perguntas dessa dificuldade
    const shuffled = [...questionsOfDifficulty].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(2, questionsOfDifficulty.length));
  }, [category]);

  const categoryColors: Record<string, string> = {
    Ciência: "#20c868",
    Esportes: "#ff9400",
    Geografia: "#1576ce",
    Artes: "#f32731",
    Historia: "#f9de41",
    Entretenimento: "#f352af",
  };
  const themeColor =
    categoryColors[category as keyof typeof categoryColors] || "#607D8B";

  // Pega a dificuldade das perguntas selecionadas
  const selectedDifficulty =
    randomizedQuestions.length > 0 ? randomizedQuestions[0].difficulty : null;

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>
      </View>

      <View style={styles.contentCard}>
        <View style={styles.subtitle}>
          {randomizedQuestions.length > 0 ? (
            <>
              {randomizedQuestions.map((question, index) => (
                <View key={question.id} style={styles.questionCard}>
                  <Text style={styles.questionText}>
                    {index + 1}. {question.question}
                  </Text>
                  {question.options.map((option, optionIndex) => (
                    <Text
                      key={optionIndex}
                      style={[
                        styles.questionText,
                        optionIndex === question.correct
                          ? {
                              backgroundColor: "rgba(47, 187, 52, 0.67)",
                              padding: 5,
                              borderRadius: 5,
                            }
                          : {
                              padding: 5,
                              borderRadius: 5,
                            },
                        ,
                      ]}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </Text>
                  ))}
                </View>
              ))}
            </>
          ) : (
            <View style={styles.noQuestionsContainer}>
              <Text style={styles.noQuestionsText}>
                Ainda não há perguntas para esta categoria.
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.backButton, countdown > 0 && styles.disabledButton]}
          onPress={() => countdown === 0 && router.back()}
          disabled={countdown > 0}
        >
          <Text style={styles.backButtonText}>
            {countdown > 0 ? `Aguarde ${countdown}s` : "Voltar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentCard: {
    flex: 1,
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    minHeight: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 0,
    width: "100%",
    paddingHorizontal: 60,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "rgba(100,100,100,0.6)",
    opacity: 0.6,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    width: "100%",

    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  difficultyText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600",
  },

  subtitle: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize: 4,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  questionCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "47.5%",
  },
  questionText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "500",
  },
  noQuestionsContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
  },
  noQuestionsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
});
