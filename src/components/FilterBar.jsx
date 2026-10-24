import { STATUSES, STATUS_LABELS } from '../statuses';
export default function FilterBar({ status, query, onStatusChange, onQueryChange }) {
	return (
		<div className="filters">
			<button
				type="button"
				className={`chip ${status === 'all' ? 'active' : ''}`} onClick={() => onStatusChange('all')}>
				All
			</button>

			{STATUSES.map((value) => (
				<button
					key={value}
					type="button"
					className={`chip ${status === value ? 'active' : ''}`}
					onClick={() => onStatusChange(value)}>
					{STATUS_LABELS[value]}
				</button>
			))}
			<input
				type="search"
				value={query}
				placeholder="Search company or role…"
				aria-label="Search applications"
				onChange={(event) => onQueryChange(event.target.value)}
			/>
		</div>
	);
}