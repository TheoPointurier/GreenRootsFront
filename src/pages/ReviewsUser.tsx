import { useState } from 'react';
import type { ReviewsAdd } from '../@types/reviews';
import { useUser } from '../context/UserContext';
import apiClient from '../api/apiClient';

function ReviewsUser() {
    // Récupération l'utilisateur depuis le contexte
  const { user, isLoading, logout } = useUser();
  const [rating, setRating] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!user) {
    setError('Vous devez être connecté pour soumettre un avis.');
    return <p>Veuillez vous connecter pour soumettre un avis.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const review: ReviewsAdd = { rating, content, id_user: user.id };

    console.log(review);

    try {
      const response = await apiClient('/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (response.status === 200) {
        setSuccessMessage('Avis soumis avec succès !');
        setRating(1);
        setContent('');
      } else {
        setError("Une erreur est survenue lors de l'envoi de votre avis.");
      }
    } catch (error) {
      setError('Une erreur est survenue, veuillez réessayer.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-md my-40">
      <h2 className="text-2xl font-bold mb-4">Créer un avis</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <label htmlFor="rating" className="font-medium">Note (1 à 5)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min={1}
          max={5}
          value={rating || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setRating(0);
            } else {
              const numericValue = Number(value);
              if (!Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
                setRating(numericValue);
              }
            }
          }}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="content" className="font-medium">Commentaire</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        />

        <button
          type="submit"
          className="bg-greenroots_green text-white rounded-md py-2 px-4 hover:bg-indigo-600"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default ReviewsUser;
