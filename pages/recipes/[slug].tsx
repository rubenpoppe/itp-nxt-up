import type { NextPage } from 'next';
import { Recipe } from '../../types';
import { useState } from 'react';
import { Print, Share } from '@mui/icons-material';
import {
	Checkbox,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import FoodLabel from '../../components/FoodLabel';
import { getAllRecipesSlug, getRecipeBySlug } from '../../util/api';
import humanize from '../../util/humanize-duration';
import style from '../../styles/Detail.module.css';

export async function getStaticProps({ params }: any) {
	const recipe = await getRecipeBySlug(params.slug);
	return { props: recipe };
}

export async function getStaticPaths() {
	const { allRecipes: allSlugs } = await getAllRecipesSlug();
	return {
		paths: allSlugs.map(({ slug }) => ({ params: { slug: slug } })),
		fallback: false,
	};
}

const Detail: NextPage<{ recipe: Recipe }> = ({ recipe }) => {
	const [ingredientsChecked, setIngredientsChecked] = useState(['']);

	const handleIngredientClick = (ingredient: string) => {
		const idx = ingredientsChecked.indexOf(ingredient);
		const temp = [...ingredientsChecked];
		idx === -1 ? temp.push(ingredient) : temp.splice(idx, 1);
		setIngredientsChecked(temp);
	};

	return (
		<article>
			<section>
				<div
					className={style.hero}
					style={{
						backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent), url(${recipe.image.url})`,
					}}
					title={recipe.image.alt}
				></div>
				<div className={style.wrapper}>
					<div className={style.toolbar}>
						<Typography variant="h2" component="h1">
							{recipe.title}
						</Typography>
						<div>
							<IconButton onClick={() => window.print()}>
								<Print fontSize="large" />
							</IconButton>
							<IconButton>
								<Share />
							</IconButton>
						</div>
					</div>
					<div className={style['chip-wrapper']}>
						{recipe.vegetarian && <FoodLabel label="Vegetarian" />}
						{recipe.vegan && <FoodLabel label="Vegan" />}
					</div>
				</div>
				<div className={style['recipe-info']}>
					<Typography variant="overline">
						Serves <b>{recipe.servings}</b> people
					</Typography>
					{recipe.prepTime && (
						<Typography variant="overline">
							Prep time: {humanize(recipe.prepTime * 60 * 1000)}
						</Typography>
					)}
					{recipe.totalTime && (
						<Typography variant="overline">
							Total time: {humanize(recipe.totalTime * 60 * 1000)}
						</Typography>
					)}
				</div>
				<Typography>{recipe.description}</Typography>
			</section>
			<section>
				<Typography variant="h4" component="h2">
					Ingredients
				</Typography>
				<List className={style['ingredient-list']} dense>
					{recipe.ingredients.map((ingredient) => (
						<ListItem key={ingredient} disablePadding>
							<ListItemButton onClick={() => handleIngredientClick(ingredient)}>
								<ListItemIcon>
									<Checkbox
										checked={ingredientsChecked.includes(ingredient)}
										tabIndex={-1}
										inputProps={{ 'aria-label': ingredient }}
									/>
								</ListItemIcon>
								<ListItemText primary={ingredient} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</section>
			<section>
				<Typography variant="h4" component="h2">
					Instructions
				</Typography>
				<ol className={style['instructions']}>
					{recipe.instructions.map((instruction, idx) => (
						<Typography key={idx} component="li">
							{instruction}
						</Typography>
					))}
				</ol>
			</section>
			{[
				recipe.calories,
				recipe.fatContent,
				recipe.cholesterolContent,
				recipe.proteinContent,
				recipe.carbohydrateContent,
			].some((x) => !!x) && (
				<section>
					<Typography variant="h4" component="h2">
						Nutrition facts
					</Typography>
					<Table>
						<TableHead>
							<TableRow>
								{recipe.calories && <TableCell>Calories</TableCell>}
								{recipe.fatContent && <TableCell>Fat (g)</TableCell>}
								{recipe.cholesterolContent && (
									<TableCell>Cholesterol (mg)</TableCell>
								)}
								{recipe.proteinContent && <TableCell>Protein (g)</TableCell>}
								{recipe.carbohydrateContent && <TableCell>Carbs (g)</TableCell>}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								{recipe.calories && <TableCell>{recipe.calories}</TableCell>}
								{recipe.fatContent && (
									<TableCell>{recipe.fatContent}</TableCell>
								)}
								{recipe.cholesterolContent && (
									<TableCell>{recipe.cholesterolContent}</TableCell>
								)}
								{recipe.proteinContent && (
									<TableCell>{recipe.proteinContent}</TableCell>
								)}
								{recipe.carbohydrateContent && (
									<TableCell>{recipe.carbohydrateContent}</TableCell>
								)}
							</TableRow>
						</TableBody>
					</Table>
				</section>
			)}
		</article>
	);
};

export default Detail;
