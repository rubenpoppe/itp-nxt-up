import { Recipe } from '../types';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.CMS_URL, {
	headers: { Authorization: `Bearer ${process.env.CMS_API_KEY}` },
});

export const getAllRecipes = (): Promise<{ allRecipe: Recipe[] }> => {
	const query = gql`
		{
			allRecipes {
				title
				slug
				description
				vegan
				vegetarian
				image {
					url
					alt
				}
				totalTime
				_publishedAt
			}
		}
	`;

	return client.request(query);
};

export const getRecipeBySlug = (slug: string): Promise<{ recipe: Recipe }> => {
	const query = gql`
		{
			recipe(filter: { slug: { eq: "${slug}" } }) {
				title
				description
				image {
					url
				}
				vegetarian
				vegan
				servings
				prepTime
				totalTime
				ingredients
				instructions
				calories
				fatContent
				cholesterolContent
				proteinContent
				carbohydrateContent
				_publishedAt
			}
		}
	`;

	return client.request(query);
};

export const getAllRecipesSlug = (): Promise<{
	allRecipes: { slug: string }[];
}> => {
	const query = gql`
		{
			allRecipes {
				slug
			}
		}
	`;

	return client.request(query);
};
