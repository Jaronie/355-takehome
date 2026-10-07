import { STATUS_LABELS } from '../statuses';

/**
 * Fetching the status data from statuses.js
 */

export default function StatusLabel ({status}){
    const label = STATUS_LABELS[status] ?? status;
    return <span className={`badge badge-${status}`}>{label}</span>;
}