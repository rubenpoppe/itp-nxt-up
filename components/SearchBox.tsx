import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';

const SearchBox: FunctionComponent = () => {
	const router = useRouter();
	const [query, setQuery] = useState(router.query.search);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const form = e.target as typeof e.target & {
			search: { value: string };
		};
		router.push({ pathname: '/', query: { search: form.search.value } });
	};
	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '0.2rem 0.5rem',
				background: 'rgba(255, 255, 255, 0.25)',
				borderRadius: '4px',
			}}
		>
			<Search style={{ position: 'absolute' }} />
			<InputBase
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				inputProps={{ 'aria-label': 'search', name: 'search', type: 'search' }}
				style={{ paddingLeft: '2em', color: '#fff' }}
			/>
		</form>
	);
};

export default SearchBox;
