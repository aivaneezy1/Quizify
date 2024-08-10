export interface UserType {
  clerkId: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  imageUrl: string;
  
}

interface Question {
  id: number;
  question: string;  // Change 'questions' to 'question'
  answers: string[]; // Change 'answer' to 'answers'
  correctAnswer: string;
}

export interface QuestionType {
  questionProp: Question[];
 
};

export interface StatsCardType {
  title: string,
  value: number
}
