import { Recipe } from '../types';
import { FunctionComponent } from 'react';
import humanize from '../util/humanize-duration';

const StructuredData: FunctionComponent<{ recipe: Recipe }> = ({ recipe }) => {
	const nutritionData = [
		{ value: recipe.calories, unit: 'calories', label: 'calories' },
		{ value: recipe.fatContent, unit: 'g', label: 'fatContent' },
		{ value: recipe.cholesterolContent, unit: 'mg', label: 'cholesterolContent' },
		{ value: recipe.proteinContent, unit: 'g', label: 'proteinContent' },
		{ value: recipe.carbohydrateContent, unit: 'g', label: 'carbohydrateContent' },
	].filter((x) => !!x.value);

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: `{
                "@context": "https://schema.org/",
                "@type": "Recipe",
                "name": "${recipe.title}",
                "image": [
                    "${recipe.image.url}"
                ],
                "datePublished": "${recipe._publishedAt}",
                "description": "${recipe.description}",
                ${
                    recipe.prepTime &&
                    `"prepTime": "PT${humanize(recipe.prepTime * 60 * 1000, {
                        lang: 'iso',
                        spacer: '',
                    })}",`
                }
                ${
                    recipe.totalTime &&
                    `"totalTime": "PT${humanize(recipe.totalTime * 60 * 1000, {
                        lang: 'iso',
                        spacer: '',
                    })}",`
                }
                "recipeYield": "${recipe.servings}",
                ${
                    nutritionData.length !== 0
                        ? `"nutrition": {
                                "@type": "NutritionInformation",
                                ${nutritionData.map(
                                    (info) => `"${info.label}": "${info.value} ${info.unit}"`
                                )}},`
                        : ''
                }
                "recipeIngredient": [
                    ${recipe.ingredients.map((ingredient) => `"${ingredient}"`)}
                    ],
                "recipeInstructions": [
                    ${recipe.instructions.map(
						(instruction) => `
                        {
                            "@type": "HowToStep",
                            "text": "${instruction.replace(/"/g, '&quot;')}"
                        }`)}
                ]
            }`,
			}}
		></script>
	);
};

export default StructuredData;
