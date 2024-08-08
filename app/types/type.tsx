export interface UserType {
  clerkId: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  imageUrl: string;
}

interface Question  {
  question: string;
  answer: string[];
  correctAnswer: string;
};
export interface QuestionType {
  questions: Question[];
  userId: string | undefined;
};
