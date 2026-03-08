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
    <div className="flex flex-col items-center gap-1 w-[40vw]">
      <h1>Get Recipe</h1>
      <button className="hover:underline hover:cursor-pointer"
        onClick={ async () => {
        setRecipe("");
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