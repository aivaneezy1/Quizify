export default {
    name: "questions",
    title: "Questions",
    type: "document",
    fields: [
        {
            name: "questions",
            title: "Question",
            type: "string",
        },
        {
            name: "answer",
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