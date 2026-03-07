import { useState } from "react";

export default function GeminiCall() {
  const [recipe, setRecipe] = useState("");
  const [call, setCall] = useState(false)

  async function generateRecipe() {
    const res = await fetch("/api/recipes/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ["rice", "eggs", "soy sauce"] }),
    });

    const data = await res.json();
    setRecipe(data.recipe);
  }

  return (
    <div>
      <h1>Call Gemini</h1>
      <button onClick={ async () => {
        setCall(true);
        await generateRecipe();
        setCall(false);
      }}>
        {call ? `Waiting...` : `Call`}
        </button>
      {recipe && <div>{recipe}</div>}
    </div>
  );
}