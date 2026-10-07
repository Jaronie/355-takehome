import Status from './StatusLabel';
import { formatDate } from '../statuses';

/**
 * Renders each application
 */

export default function JobCard( { application }) {
    const {
        company,
        role,
        status,
        appliedOn,
        source,
        notes
    } = application;

    return (
        <li className="job-card">
            <div className="container">
                <h3>{role}</h3>
                <div className="company">{company}</div>
                <div className="date">
                    Applied on {formatDate(appliedOn)}
                    {source ? ` . via ${source}` : ''}
                </div>
                {notes && <p className="note">{notes}</p>}
            </div>
            <StatusBadge status={status} />
        </li>
    );
}