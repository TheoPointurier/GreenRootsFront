import { useState } from 'react';
import { createReview } from '../api/reviews';
import type { ReviewsAdd } from '../@types/reviews';
import { useUser } from '../context/UserContext';

function ReviewCreate() {
  const { user } = useUser();
  const [rating, setRating] = useState<number | string>(1);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!user) {
    setError('Vous devez être connecté pour soumettre un avis.');
    return <p>Veuillez vous connecter pour soumettre un avis.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission.

    // Si la note est vide ou invalide, afficher un message d'erreur
    if (rating === '' || typeof rating === 'string' || rating < 1 || rating > 5) {
      setError('Veuillez entrer une note valide entre 1 et 5.');
      return;
    }

    const review: ReviewsAdd = { rating, content }; // Crée un objet structuré pour l'avis.

    try {
      await createReview(review); // Appel à l'API pour soumettre l'avis.
      // Si tout se passe bien, message de succès et réinitialisation des champs.
      setSuccessMessage('Avis soumis avec succès !');
      setRating(1); // Réinitialise la note.
      setContent(''); // Réinitialise le contenu.
    } catch (error: unknown) {
      // Gère les erreurs API, par exemple, si l'utilisateur n'est pas authentifié.
      if (error instanceof Error && error.message.includes('401')) {
        setError('Vous devez être connecté pour soumettre un avis.');
      } else {
        setError('Une erreur est survenue, veuillez réessayer.');
      }
      console.error('Erreur lors de la soumission :', error);
    }
  };

  return (
    <main>
      <div className="max-w-lg mx-auto p-4 border rounded-md shadow-md xl:mb-40">
        <h2 className="text-2xl font-bold mb-4">Créer un avis</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <label htmlFor="rating" className="font-medium">Note (1 à 5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min={1}
            max={5}
            value={rating || ''} // Permet de laisser le champ vide si nécessaire
            onChange={(e) => {
              const value = e.target.value;
              // Si l'utilisateur efface la note, on permet de la laisser vide
              if (value === '') {
                setRating('');
              } else {
                const numericValue = Number(value);
                if (!Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
                  setRating(numericValue); // Met à jour si la valeur est valide
                } else {
                  setError('Veuillez entrer une note valide entre 1 et 5.');
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
            onChange={(e) => {
              setContent(e.target.value); // Met à jour le contenu de l'avis.
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            required
          />

          <button
            type="submit"
            className="bg-greenroots_green text-white rounded-md py-2 px-4 hover:bg-greenroots_orange duration-300"
          >
            Soumettre
          </button>
        </form>
      </div>
    </main>
  );
}

export default ReviewCreate;
