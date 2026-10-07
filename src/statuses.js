/**
 * The four states an application can be in, in the order they happen.
 *
 * Keeping them in one place means the badge, the summary and (later) the
 * filter bar all agree. Adding a fifth status should mean editing this file
 * and nothing else.
 */
export const STATUSES = ['applied', 'interview', 'offer', 'rejected'];

export const STATUS_LABELS = {
	applied: 'Applied',
	interview: 'Interviewing',
	offer: 'Offer',
	rejected: 'Rejected'
};

/**
 * "2026-09-02" -> "Sep 2, 2026". Provided because the date handling is fiddly
 * and is not what this assignment is about.
 *
 * Note the split: passing a bare "YYYY-MM-DD" straight to new Date() parses it
 * as UTC, which renders as the previous day anywhere west of Greenwich.
 */
export function formatDate(iso) {
	if (!iso) return '';
	const [year, month, day] = iso.split('-').map(Number);
	const date = new Date(year, month - 1, day);
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
