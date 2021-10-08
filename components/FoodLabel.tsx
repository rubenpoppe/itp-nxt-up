import { FunctionComponent } from 'react';
import { Chip, SvgIcon } from '@mui/material';
import Leaf from '../assets/leaf.svg';

const FoodLabel: FunctionComponent<{
	size?: 'small' | 'medium';
	label: string;
}> = ({ size, label }) => {
	return (
		<Chip
			color="success"
			label={label}
			icon={<SvgIcon component={Leaf} />}
			size={size || 'medium'}
		/>
	);
};

export default FoodLabel;
