import type { NextPage } from 'next';
import { Recipe } from '../types';
import Link from 'next/link';
import { getAllRecipes } from '../util/api';
import humanize from '../util/humanize-duration';
import {
	Card,
	CardContent,
	CardMedia,
	Chip,
	SvgIcon,
	Typography,
} from '@mui/material';
import style from '../styles/Home.module.css';
import Leaf from '../assets/leaf.svg';

export async function getStaticProps() {
	const recipes = await getAllRecipes();
	return { props: recipes };
}

const Home: NextPage<{ allRecipes: Recipe[] }> = ({ allRecipes }) => {
	return (
		<>
			<h1 style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
				Overview
			</h1>
			<div className={style.wrapper}>
				{allRecipes.map((recipe: Recipe) => (
					<Link href={`/recipes/${recipe.slug}`} passHref key={recipe.slug}>
						<Card
							className={style.card}
							tabIndex={0}
							role="link"
							aria-label={recipe.title}
						>
							<CardMedia
								component="img"
								height="194"
								image={recipe.image.url}
								alt={recipe.image.alt}
							/>
							<CardContent>
								<Typography variant="h5" component="h2">
									{recipe.title}
								</Typography>
								{!!recipe.totalTime && (
									<Typography variant="overline">
										{humanize(recipe.totalTime * 60 * 1000)}
									</Typography>
								)}
								<div className={style['chip-wrapper']}>
									{recipe.vegetarian && (
										<Chip
											color="success"
											label="Vegetarian"
											icon={<SvgIcon component={Leaf} />}
											size="small"
										/>
									)}
									{recipe.vegan && (
										<Chip
											color="success"
											label="Vegan"
											icon={<SvgIcon component={Leaf} />}
											size="small"
										/>
									)}
								</div>
								<Typography variant="body2" color="text.secondary">
									{recipe.description}
								</Typography>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</>
	);
};

export default Home;
