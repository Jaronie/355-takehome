import { useEffect } from 'react';
import { useState } from 'react';
import JobList from './components/List';
import SummaryBar from './components/SummaryBar';

import { applications } from './public/applications';
import { byNewest } from './statuses';

export default function App() {

		useEffect(() => {

		const controller = new AbortController();

		fetch('/applications.json', { signal: controller.signal })
			.then((response) => {

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