export default {
    name: "animals",
    title: "Animals",
    type: "document",
    fields: [
        {
            name: "animalQuestions",
            title: "Question",
            type: "string",
        },
        {
            name: "animalAnswer",
            title: "Answer",
            type: "array",
            of: [{type: "string"}],
        },
        {
            name: "correctAnswer",
            title: "Correct Answer",
            type: 'string'
        }
    ]
}