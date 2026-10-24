import { useEffect } from 'react';
import { useState } from 'react';
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

		useEffect(() => {
		// React runs effects twice in development to surface exactly this kind of
		// bug. Without the controller, two requests race and the slower one wins.
		const controller = new AbortController();

		fetch('/applications.json', { signal: controller.signal })
			.then((response) => {
				// fetch only rejects on a network failure — a 404 still resolves,
				// so the status has to be checked by hand.
				if (!response.ok) throw new Error(`Could not load applications (${response.status})`);
				return response.json();
			})
			.then((data) => {
				setApplications(data);
				setLoading(false);
			})
			.catch((problem) => {
				if (problem.name === 'AbortError') return;
				setError(problem.message);
				setLoading(false);
			});
			
		return () => controller.abort();

		}, []);


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