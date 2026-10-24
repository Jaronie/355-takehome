import { useEffect } from 'react';
import { useState } from 'react';
import JobList from './components/List';
import SummaryBar from './components/SummaryBar';
import { byNewest } from './statuses';

export default function App() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState('all');
	const [query, setQuery] = useState('');

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

	const needle = query.trim().toLowerCase();
	const visible = applications
		.filter((application) => status === 'all' || application.status === status)
		.filter(
			(application) =>
				!needle ||
				application.company.toLowerCase().includes(needle) ||
				application.role.toLowerCase().includes(needle)
		)
		.sort(byNewest);

	
	return (
		<>
			<header className="site-header">
				<div className="container">
					<h1>Job Application Tracker</h1>
				</div>
			</header>

			<main className="container">
				{loading && <p className="loading">Loading applications…</p>}
				{error && <p className="error">{error}</p>}

				<SummaryBar applications={applications} />
				<div className="page-head">
					<h2>Applications</h2>
				</div>
				<JobList applications={visible} />
			</main>
		</>
	);
}