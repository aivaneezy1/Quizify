export interface UserType {
  clerkId: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  imageUrl: string;
}

interface Question  {
  questions: string;
  answer: string[];
  correctAnswer: string;
};
export interface QuestionType {
  questionProp: Question[];
  userId: string | undefined;
};
