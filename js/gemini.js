import { GoogleGenAI } from "@google/genai";

export async function askGemini(groceryArray){
    if(groceryArray.length < 2) {return "Enter more items to get an AI generated meal!"}
    let buffer = ''
    for(let i = 0;i < groceryArray.length;i++){
        buffer += `${groceryArray[i].itemName}, `
    }
    let question = `You're going to design a meal out of the given foods: ${buffer}
    Format your response so it will be displayed neatly in a text box in an HTML web page.`;

    return await GeminiAPICall(question);

}

async function GeminiAPICall(prompt) {

    const API_KEY = import.meta.env.VITE_GEMINI_KEY;
    console.log(import.meta.env.VITE_GEMINI_KEY)
    //Amazing security, I know. Laziness is the crux of all security.    try {
    try{
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({contents: [{parts: [{text: prompt}]}]})
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text
    }
    catch (error) {
        console.log(error)
        return "An error occured communicating with Google Gemini.";
    }
}


async function sendQuestionToGemini(question){
    try {
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: question,
        });
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
    }
}