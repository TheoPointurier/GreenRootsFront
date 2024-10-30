import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Campaigns() {
  const navigate = useNavigate();
  const [isContributionOpen, setIsContributionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <h1 className="text-h1 font-bold text-black">
        Contribue à la campagne
        <span className="bg-greenroots_green text-white rounded-lg px-4">
          ton choix
        </span>
      </h1>
      <div className="flex items-center justify-center mt-20">
        <img src="/Images/tea-field-plantation.jpg" loading="lazy"
          alt="Champ de plantation de thé"
          className="w-full max-w-md md:w-[600px] object-cover"
        />
      </div>
      <article className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-h3 font-bold text-black mb-4">Nom de la campagne</h3>
        <h4 className="text-h4 font-semibold text-gray-700 mb-2">Contexte blabla</h4>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod, nisi vel vehicula viverra.
        </p>
        <h4 className="text-h4 font-semibold text-red-600 mb-6">Date limite pour contribuer : 25/12/2025</h4>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate('/campaigns/:id')}
            className="bg-greenroots_green text-white py-2 px-4 rounded-lg shadow-md hover:bg-greenroots_orange transition-colors duration-300"
            type="button"
          >
            En savoir plus
          </button>
          <button
            onClick={() => setIsContributionOpen(!isContributionOpen)}
            className="bg-greenroots_orange text-white py-2 px-4 rounded-lg shadow-md hover:bg-greenroots_green transition-colors duration-300"
            type="button"
          >
            <div className="flex items-center justify-between">
              <span>Je contribue</span>
              <span className="ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 transform ${isContributionOpen ? 'rotate-180' : ''}`}
                  aria-labelledby="contribution-icon"
                >
                  <title id="contribution-icon">Flèche déroulante</title>
                  <path
                    fillRule="evenodd"
                    d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.465l5.879-5.879a1 1 0 111.414 1.414L12 15.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
        {isContributionOpen && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center mb-4">
              <img src="/Images/chene.jpg" loading="lazy"
                alt="Chêne"
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h4 className="text-h4 font-semibold text-black">Chêne</h4>
                <p className="text-gray-700">Age : 2 ans</p>
              </div>
            </div>
            <h3 className="text-h3 font-bold text-greenroots_green mb-4">50 €</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="bg-gray-300 text-black px-3 py-2"
                  type="button"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, Number.parseInt(e.target.value) || 0))}
                  onFocus={(e) => e.target.select()}
                  className="w-12 text-center border-none appearance-none outline-none"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 text-black px-3 py-2"
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                className="bg-greenroots_orange text-white py-2 px-6 rounded-lg shadow-md hover:bg-greenroots_green transition-colors duration-300"
                type="button"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export default Campaigns;
