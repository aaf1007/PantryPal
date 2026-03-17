import ExplorePageCards from "@/components/ExplorePageCards";
import type { Recipe } from "@/types/Recipe";

export default function ExplorePage() {
    return (
        <div className="max-w-[900px] m-auto mb-40 pt-30">
          <header>
            <h1 className="text-xl font-bold text-sage-900">Explore Page</h1>
          </header>
          <div className="grid md:grid-cols-3 gap-3">
            {recipes.map(cur => (
                <div className="my-3">
                    <ExplorePageCards recipe={cur} key={cur.title} />
                </div>
            ))}
        </div>
        </div>
    )
}

export const recipes: Recipe[] = [
    {
      title: "Garlic Butter Pasta",
      ingredients: ["pasta", "garlic", "butter", "parmesan"],
      steps: ["Boil the pasta.", "Saute the garlic in butter.", "Toss with pasta and parmesan."],
      estimatedTime: 20,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Veggie Omelette",
      ingredients: ["eggs", "spinach", "bell pepper", "cheese"],
      steps: ["Whisk the eggs.", "Cook the vegetables.", "Add eggs and fold in the cheese."],
      estimatedTime: 10,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Chicken Rice Bowl",
      ingredients: ["chicken breast", "rice", "soy sauce", "broccoli"],
      steps: ["Cook the rice.", "Pan-sear the chicken.", "Steam the broccoli and serve together."],
      estimatedTime: 30,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Tomato Basil Soup",
      ingredients: ["tomatoes", "basil", "onion", "vegetable broth"],
      steps: ["Cook the onion.", "Simmer with tomatoes and broth.", "Blend and stir in basil."],
      estimatedTime: 25,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Shrimp Tacos",
      ingredients: ["shrimp", "tortillas", "cabbage", "lime"],
      steps: ["Season and cook the shrimp.", "Warm the tortillas.", "Assemble with cabbage and lime."],
      estimatedTime: 18,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Avocado Toast",
      ingredients: ["bread", "avocado", "lemon", "chili flakes"],
      steps: ["Toast the bread.", "Mash avocado with lemon.", "Spread and top with chili flakes."],
      estimatedTime: 8,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Beef Stir Fry",
      ingredients: ["beef", "broccoli", "soy sauce", "garlic"],
      steps: ["Slice and sear the beef.", "Cook the broccoli.", "Toss with sauce and garlic."],
      estimatedTime: 22,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Berry Yogurt Parfait",
      ingredients: ["yogurt", "berries", "granola", "honey"],
      steps: ["Layer the yogurt, berries, and granola.", "Drizzle with honey.", "Serve chilled."],
      estimatedTime: 5,
      imageUrl: "/plate.jpg"
    },
    {
      title: "Pesto Grilled Cheese",
      ingredients: ["bread", "mozzarella", "pesto", "butter"],
      steps: ["Butter the bread.", "Add pesto and mozzarella.", "Grill until golden and melted."],
      estimatedTime: 12,
      imageUrl: "/plate.jpg"
    },
  ]