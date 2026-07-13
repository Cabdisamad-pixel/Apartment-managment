function StatusBadge({ status }) {
  let badgeClass = 'bg-yellow-100 text-yellow-700';

  if (status === 'Paid') {
    badgeClass = 'bg-emerald-100 text-emerald-700';
  }

  if (status === 'Overdue') {
    badgeClass = 'bg-rose-100 text-rose-700';
  }

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
