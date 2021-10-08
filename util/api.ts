import { Recipe } from '../types';
import { GraphQLClient, gql } from 'graphql-request';

export const getAllRecipes = (): Promise<{ allRecipe: Recipe[] }> => {
	const client = new GraphQLClient(process.env.CMS_URL, {
		headers: { Authorization: `Bearer ${process.env.CMS_API_KEY}` },
	});

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
