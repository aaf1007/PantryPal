import { useState } from "react";

type RecipeResponse = {
  title: string,
  ingredients: string[],
  steps: string[],
  estimatedTime: number,
}

export default function GeminiCall() {
  const [data, setData] = useState<RecipeResponse | null>(null);
  const [call, setCall] = useState(false);

  // TODO: change data field since data.recipe does not exist
  async function generateRecipe() {
    setCall(true);
    const res = await fetch("/api/recipes/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ["rice", "eggs", "soy sauce"] }),
    });
    const dr = await res.json();
    setData(dr);
    setCall(false);
  }

  return (
    <div className="flex flex-col items-center gap-1 w-[40vw]">
      <h1>Get Recipe</h1>
      <button className="hover:underline hover:cursor-pointer"
        onClick={async () => await generateRecipe()}>
        {call ? `Waiting...` : `Call`}
        </button>
        {data && <RecipeCard data={data} />}
    </div>
  );
}

function RecipeCard({data} : {data: RecipeResponse}) {
  return (
    <div>
      {data.title}
      {data.ingredients.map(cur => (
        <li key={cur}>{cur}</li>
      ))}
      {data.steps.map(cur => (
        <li key={cur}>{cur}</li>
      ))}
      {data.estimatedTime}
    </div>
  )
}