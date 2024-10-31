import Image from '../../public/Images/weeping-willow-tree.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

function CampaingDetail () {
  return (
    <main className="container mx-auto flex flex-col p-5">

    {/* Back link */}
    <section className="flex justify-start mt-5">
      <a href="/" className='pr-1'><FontAwesomeIcon icon={faChevronLeft} className='pr-1 ml-1'/> Retour</a>
    </section>

    {/* Title campaign*/}
    <section className='flex flex-row justify-evenly mt-2 p-1 items-center'>
      <h2 className="text-h2 items-center text-center mt-10 mb-10">
        Reforestation de la forêt du <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">Pinsan</span>
      </h2>
    </section>

    {/* Forest photo */}
    <section className="flex justify-evenly mt-5 mb-5">
    <img 
      src={Image}
      alt="forêt du Pinsan" 
      className="w-full max-w-sm md:max-w-md lg:max-w-lg h-100 rounded-[20px] object-cover"
    />
    </section>

    {/* Information campaign */}
    <section className="flex flex-col justify-between p-5 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
      <h3 className="text-h3 pl-3 mb-2">Contexte projet</h3>
      <p className="text-sm p-1 m-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam maiores corporis.</p>
      <p className="text-sm font-bold p-1 m-1">Data limite pour contribuer : 25/12/2025</p>
    </section>

    {/* Method campaign */}
    <section className="flex flex-col justify-between p-5 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
      <h3 className="text-h3 pl-3 mb-2">Comment allons nous procéder?</h3>
      <p className="text-sm p-1 m-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam maiores corporis.</p>
    </section>

    <section className='flex flex-row justify-evenly mt-2 p-1 items-center'>
      <h2 className="text-h2 items-center text-center mt-2 mb-10">
        Je<span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">contribue</span> à cette campagne ! 
      </h2>
    </section>

    {/* Trees of campaign */}
    <section className="flex flex-col justify-between p-5 mb-2 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
      <h3 className="text-h3 pl-3 mb-8">Notre sélection d'arbres adapté à cette campagne</h3>
      <p className="text-sm p-1 mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam maiores corporis.</p>
      <div>
      <article className="flex flex-col mt-3 rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg w-full max-w-xs mx-auto h-full">
      <div className="flex justify-center w-full">
        <img
          src="../../public/Images/view-of-flower.webp"
          alt="Nom arbre"
          className="w-full h-40 rounded-t-[20px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-row justify-between items-center pl-2 pr-2 mt-5 mb-2">
        <h3 className="text-h3 font-bold">Chêne</h3>
        <p className="p-1 text-xs">Âge : 0 à 2 ans</p>
      </div>
      <div className='flex justify-end items-center'>
        <p className="text-greenroots_green pr-2 mb-2">50 €</p>
      </div>
      <form input="submit" className="flex flex-row justify-between items-center p-2 mb-2 w-full flex-nowrap">
        <div className="flex items-center">
          <button type="button" className="border border-blue-300 rounded-l-full w-8 text-sm md:text-base">-</button>
          <span className="border-t border-b border-blue-300 flex items-center justify-center px-4 text-sm md:text-base font-medium">1</span>
          <button type="button" className="border border-blue-300 rounded-r-full w-8 text-sm md:text-base">+</button>
        </div>
        <button
          type="submit"
          className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 rounded-full"
        >
          Ajouter au panier
        </button>
      </form>
    </article>
      </div>
    </section>
  </main>
  );
}

export default CampaingDetail;