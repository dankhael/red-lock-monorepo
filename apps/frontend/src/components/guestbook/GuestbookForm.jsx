import { useState } from 'react';
import { submitGuestbookEntry } from '../../services/guestbookService';

function GuestbookForm({ onEntrySubmitted }) {
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!authorName.trim()) {
      setError('Nome é obrigatório.');
      return;
    }
    if (!message.trim()) {
      setError('Mensagem é obrigatória.');
      return;
    }
    if (message.trim().length > 500) {
      setError('Mensagem deve ter no máximo 500 caracteres.');
      return;
    }

    setSubmitting(true);
    try {
      await submitGuestbookEntry({
        authorName: authorName.trim(),
        message: message.trim(),
        website: website.trim() || undefined,
      });
      setSubmitted(true);
      setAuthorName('');
      setMessage('');
      setWebsite('');
      if (onEntrySubmitted) onEntrySubmitted();
    } catch (err) {
      console.error('Failed to submit guestbook entry:', err);
      setError('Falha ao enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="guestbook-form-success">
        <p>Mensagem enviada com sucesso! Ela aparecerá após aprovação.</p>
        <button onClick={() => setSubmitted(false)} className="guestbook-btn">
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="guestbook-form" onSubmit={handleSubmit}>
      <h3>Deixe sua mensagem</h3>
      {error && <p className="guestbook-error">{error}</p>}
      <div className="guestbook-field">
        <label htmlFor="authorName">Nome *</label>
        <input
          id="authorName"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          maxLength={100}
          placeholder="Seu nome"
        />
      </div>
      <div className="guestbook-field">
        <label htmlFor="message">Mensagem *</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="Sua mensagem (máx. 500 caracteres)"
        />
        <span className="guestbook-char-count">{message.length}/500</span>
      </div>
      <div className="guestbook-field">
        <label htmlFor="website">Website (opcional)</label>
        <input
          id="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          maxLength={200}
          placeholder="https://..."
        />
      </div>
      <button type="submit" className="guestbook-btn" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

export default GuestbookForm;
