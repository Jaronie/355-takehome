import JobCard from './JobCard';

/**
 * Creates list of current applications from the .js file, imported
 * in App.jsx
 */

export default function JobList({ applications, emptyMsg = 'No applications yet.'}) {
    if(applications.length === 0){
        return <p className="empty">{emptyMsg}</p>
    }

    return (
        <ul className="job-list">
        {applications.map((application) => (
        <JobCard key={application.id} applications={application} />
        ))}
        </ul>
    )
}
