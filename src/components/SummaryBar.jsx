import { STATUSES, STATUS_LABELS, countByStatus } from '../statuses';


/**
 * 
 * Displays application count, by status. Summarized bar.
 */

export default function SummaryBar({ applications }) {
    const counts = countByStatus(applications);

	return (
		<section className="summary" aria-label="Application Summarized">
			<div className="summary-tile">
				<div className="count">{applications.length}</div>
				<div className="label">Total</div>
			</div>
			{STATUSES.map((status) => (
				<div className="summary-tile" key={status}>
					<div className="count">{counts[status]}</div>
					<div className="label">{STATUS_LABELS[status]}</div>
				</div>
			))}
		</section>
	);
}