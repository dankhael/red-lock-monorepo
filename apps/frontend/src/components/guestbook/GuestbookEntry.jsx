import { formatDate } from '../../utils/formatDate';

function GuestbookEntry({ entry }) {
  return (
    <div className="guestbook-entry">
      <div className="guestbook-entry-header">
        <span className="guestbook-author">{entry.authorName}</span>
        <span className="guestbook-date">{formatDate(entry.createdAt)}</span>
      </div>
      <p className="guestbook-message">{entry.message}</p>
      {entry.website && (
        <a
          href={entry.website}
          target="_blank"
          rel="noopener noreferrer"
          className="guestbook-website"
        >
          {entry.website}
        </a>
      )}
    </div>
  );
}

export default GuestbookEntry;
