import type { NextPage } from 'next';
import Head from 'next/head';
import { Recipe } from '../types';
import Link from 'next/link';
import { getAllRecipes } from '../util/api';
import humanize from '../util/humanize-duration';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import FoodLabel from '../components/FoodLabel';
import style from '../styles/Home.module.css';

export async function getStaticProps() {
	const recipes = await getAllRecipes();
	return { props: recipes };
}

const Home: NextPage<{ allRecipes: Recipe[] }> = ({ allRecipes }) => {
	return (
		<>
			<Head>
				<title>Recipes.com</title>
				<meta name="description" content="All the recipes in one place" />
			</Head>
			<h1
				style={{
					position: 'absolute',
					width: 0,
					height: 0,
					overflow: 'hidden',
				}}
				aria-hidden="true"
			>
				Recipes.com overview
			</h1>
			<div className={style.wrapper}>
				{allRecipes.map((recipe: Recipe) => (
					<Card className={style.card} key={recipe.slug}>
						<CardMedia
							component="img"
							height="194"
							image={recipe.image.url}
							alt={recipe.image.alt}
						/>
						<CardContent>
							<Typography variant="h5" component="h2">
								<Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
							</Typography>
							{!!recipe.totalTime && (
								<Typography variant="overline">
									{humanize(recipe.totalTime * 60 * 1000)}
								</Typography>
							)}
							<div className={style['chip-wrapper']}>
								{recipe.vegetarian && (
									<FoodLabel label="Vegetarian" size="small" />
								)}
								{recipe.vegan && <FoodLabel label="Vegan" size="small" />}
							</div>
							<Typography variant="body2" color="text.secondary">
								{recipe.description}
							</Typography>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
};

export default Home;
