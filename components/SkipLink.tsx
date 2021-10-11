import { FunctionComponent } from 'react';
import { Fab } from '@mui/material';

const SkipLink: FunctionComponent = () => {
	return (
		<Fab
			color="secondary"
			variant="extended"
			component="a"
			href="#main"
			id="skiplink"
		>
			Skip to content
		</Fab>
	);
};

export default SkipLink;
