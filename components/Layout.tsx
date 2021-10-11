import { FunctionComponent } from 'react';
import Link from 'next/link';
import { AppBar, SvgIcon, Toolbar, Typography } from '@mui/material';
import Icon from '../public/icon.svg';
import SearchBox from './SearchBox';
import SkipLink from './SkipLink';

const Layout: FunctionComponent = ({ children }) => {
	return (
		<>
			<SkipLink />
			<AppBar position="sticky">
				<Toolbar style={{ justifyContent: 'space-between' }}>
					<Link href="/">
						<a>
							<SvgIcon
								component={Icon}
								viewBox="0 0 512 512"
								aria-labelledby="page-title"
							/>
							<Typography variant="h5" component="span" id="page-title">
								Recipes.com
							</Typography>
						</a>
					</Link>
					<SearchBox />
				</Toolbar>
			</AppBar>
			<main id="main">{children}</main>
		</>
	);
};

export default Layout;
