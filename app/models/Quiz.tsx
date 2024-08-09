import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    quizScore: { type: Number, default: 0 },
    correctAnswer: { type: Number, default: 0 },
    wrongAnswer: { type: Number, default: 0 },
});

const QuizResult = mongoose.models.QuizResult || mongoose.model("QuizResult", QuizSchema);

export default QuizResult;
