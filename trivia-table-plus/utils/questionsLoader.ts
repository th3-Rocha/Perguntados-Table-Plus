// Importações dos arquivos JSON
import ArtQuestions from "../assets/questions/Art/Trivia_Art_PTBR.json";
import ScienceQuestions from "../assets/questions/Ciencia/Science-200.json";
import EntertainmentFilmQuestions from "../assets/questions/Entretenimento/entertaimente_film-200.json";
import EntertainmentBookQuestions from "../assets/questions/Entretenimento/entertainment_book-100.json";
import EntertainmentMusicQuestions from "../assets/questions/Entretenimento/entertainment_music-350.json";
import EntertainmentTVQuestions from "../assets/questions/Entretenimento/entertainment_television-150.json";
import SportsQuestions from "../assets/questions/Esportes/Sports-150.json";
import GeographyQuestions from "../assets/questions/Geografia/Geography-200.json";
import HistoryQuestions from "../assets/questions/Historia/history-250.json";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty?: string;
  type?: string;
}

function convertJsonQuestion(jsonQuestion: any, index: number): Question {
  const options = [
    jsonQuestion.correct_answer,
    ...jsonQuestion.incorrect_answers,
  ];
  const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(jsonQuestion.correct_answer);

  return {
    id: index + 1,
    question: jsonQuestion.question,
    options: shuffledOptions,
    correct: correctIndex,
    difficulty: jsonQuestion.difficulty,
    type: jsonQuestion.type,
  };
}

// Função para processar arrays de perguntas (com ou sem metadata)
function processQuestions(questionsData: any): Question[] {
  let questions = questionsData;

  // Se o arquivo tem metadata, pega o array de questions
  if (questionsData.questions && Array.isArray(questionsData.questions)) {
    questions = questionsData.questions;
  }

  // Se é um array direto, usa ele
  if (Array.isArray(questionsData)) {
    questions = questionsData;
  }

  return questions.map((q: any, index: number) =>
    convertJsonQuestion(q, index)
  );
}

// Carrega todas as perguntas e organiza por categoria
export const questionsDatabase = {
  Artes: processQuestions(ArtQuestions),
  Ciência: processQuestions(ScienceQuestions),
  Esportes: processQuestions(SportsQuestions),
  Geografia: processQuestions(GeographyQuestions),
  Historia: processQuestions(HistoryQuestions),
  Entretenimento: [
    ...processQuestions(EntertainmentFilmQuestions),
    ...processQuestions(EntertainmentBookQuestions),
    ...processQuestions(EntertainmentMusicQuestions),
    ...processQuestions(EntertainmentTVQuestions),
  ],
};

export default questionsDatabase;
