import { useState, useEffect, useCallback } from 'react';
import GuestbookForm from '../components/guestbook/GuestbookForm';
import GuestbookEntry from '../components/guestbook/GuestbookEntry';
import { getGuestbookEntries } from '../services/guestbookService';
import '../styles/guestbook.css';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadEntries = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getGuestbookEntries(page);
      setEntries(data.entries);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to load guestbook entries:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleEntrySubmitted = () => {
    loadEntries(1);
  };

  return (
    <div className="guestbook-page">
      <h1>Guestbook</h1>
      <p className="guestbook-intro">
        Deixe sua marca! Escreva uma mensagem, diga oi, ou compartilhe o que achou do site.
      </p>

      <GuestbookForm onEntrySubmitted={handleEntrySubmitted} />

      <div className="guestbook-entries">
        <h2>Mensagens</h2>
        {isLoading ? (
          <p className="guestbook-loading">Carregando mensagens...</p>
        ) : entries.length === 0 ? (
          <p className="guestbook-empty">Nenhuma mensagem ainda. Seja o primeiro!</p>
        ) : (
          <>
            {entries.map((entry) => (
              <GuestbookEntry key={entry.id} entry={entry} />
            ))}
            {totalPages > 1 && (
              <div className="guestbook-pagination">
                <button
                  onClick={() => loadEntries(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="guestbook-btn"
                >
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => loadEntries(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="guestbook-btn"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Guestbook;
