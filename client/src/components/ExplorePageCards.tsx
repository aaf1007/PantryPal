import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import type { Recipe } from "@/types/Recipe";
import { useState } from "react";

type CardProps = {
    recipe: Recipe
}

export default function ExplorePageCards({recipe} :CardProps) {
    const [dialog, setDialog] = useState(false);

    return (
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>
            <div>
                Ingredients: {recipe.ingredients.join(", ")}
            </div>
            <div>
                Estimated Time: {recipe.estimatedTime}
            </div>
            <div>
                Steps: {recipe.steps.join(", ")}
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter>
            <Dialog open={dialog} onOpenChange={setDialog}>
                <Button className="w-full hover:cursor-pointer" onClick={() => setDialog(true)}>
                    View Recipe
                </Button>
                <DialogContent className="w-full md:min-w-[850px]">
                    <DialogHeader>
                        <DialogTitle>{recipe.title}</DialogTitle>
                        <DialogDescription>
                            Estimated Time: {recipe.estimatedTime} minutes
                        </DialogDescription>
                    </DialogHeader>
                    {/* TODO: Implement Dialog */}
                    <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4">
                        <div>
                        </div>
                        <div></div>
                    </div>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
    )
}

  
