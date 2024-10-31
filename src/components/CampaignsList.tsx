import { useState, useEffect } from 'react';
import TreesList from './TreesList';

interface CampaignsListProps {
  campaigns: {
    id: number;
    name: string;
    country: string;
    description: string;
    trees: { id: number; name: string; price: number; age: number; location: string }[];
  }[];
}

function CampaignsList({ campaigns }: CampaignsListProps) {
  const [contributionStates, setContributionStates] = useState<boolean[]>([]);

  useEffect(() => {
    setContributionStates(new Array(campaigns.length).fill(false));
  }, [campaigns]);

  const toggleContribution = (index: number) => {
    setContributionStates(prevStates =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-xl mx-auto p-4">
      {campaigns.map((campaign, idx) => (
        <article key={campaign.id} className="flex flex-col rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg max-w-full">
          <div className="flex justify-center w-full">
            <img
              src="../../public/Images/Hetre2.webp"
              alt={campaign.name}
              className="w-full h-40 rounded-t-[20px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col p-4">
            <h3 className="text-h3 font-bold">{campaign.name}</h3>
            <h3 className="text-h3">{campaign.country}</h3>
            <p className="p-2">{campaign.description}</p>
          </div>
          <div className="flex flex-row justify-between items-center p-2 mb-2">
            <button type="button" className="bg-greenroots_green text-greenroots_white text-[0.8rem] p-2 rounded-full">
              En savoir plus
            </button>
            <button
              type="button"
              onClick={() => toggleContribution(idx)}
              className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 rounded-full"
            >
              <div className="flex items-center justify-between">
                <span>Je contribue</span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 transform ${contributionStates[idx] ? 'rotate-180' : ''}`}>
                    <title>Flèche déroulante</title>
                    <path fillRule="evenodd" d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.465l5.879-5.879a1 1 0 111.414 1.414L12 15.293z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
          {contributionStates[idx] && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(200px,1fr)] gap-4 max-w-[600px] mx-auto">
              {campaign.trees.map(tree => (
                <TreesList key={tree.id} tree={tree} />
              ))}
            </div>
          </div>                
          )}
        </article>
      ))}
    </div>
  );
}

export default CampaignsList;
