import JobList from './components/List';
import SummaryBar from './components/SummaryBar';

import { applications } from './applications';
import { byNewest } from './statuses';

/**
 * The starting point. Right now it dumps the raw data on the page so you can
 * see it is loading — replace all of this with your components.
 *
 * The stylesheet already has classes for everything you need, so you do not
 * have to write any CSS: container, site-header, summary, summary-tile,
 * job-list, job-card, badge, badge-applied (and one per status), page-head,
 * empty.
 */
export default function App() {

	const sortedList = [...applications].sort(byNewest);
	return (
		<>
			<header className="site-header">
				<div className="container">
					<h1>Job Application Tracker</h1>
				</div>
			</header>

			<main className="container">
				<SummaryBar applications={sortedList} />
				<div className="page-head">
					<h2>Applications</h2>
				</div>
				<JobList applications={sortedList} />
			</main>
		</>
	);
}