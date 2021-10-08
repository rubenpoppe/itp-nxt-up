export interface Recipe {
	title: string;
	slug: string;
	description: string;
	vegetarian: boolean;
	vegan: boolean;
	image: { url: string };
	servings: number;
	prepTime: number | undefined;
	totalTime: number | undefined;
	ingredients: string[];
	instructions: string[];
	calories: number | undefined;
	fatContent: number | undefined;
	cholesterolContent: number | undefined;
	proteinContent: number | undefined;
	carbohydrateContent: number | undefined;
	_publishedAt: string;
}
