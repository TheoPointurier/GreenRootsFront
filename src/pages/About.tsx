import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MapComponent from '../components/Map';

function About() {
  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    scrollToHash();

    // Écoute les changements de hash quand on est déjà sur la page
    window.addEventListener('hashchange', scrollToHash);

    // Nettoyage de l'écouteur
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [location]);

  return (
    <div className="w-full h-full px-4 lg:px-[15rem] mb-20">
      <section
        className="flex-1 flex flex-col justify-center items-center lg:pl-10 lg:pr-10"
        aria-labelledby="about-section"
      >
        <h1
          id="about-section"
          className="text-h1 font-bold text-black p-3 mt-5 mb-2"
        >
          À propos de GreenRoots
        </h1>

        <h3 className="text-h3 text-black p-3 mb-2">
          GreenRoots est une initiative fictive, conçue pour répondre à
          l'urgence de la reforestation et de la lutte contre le changement
          climatique. En développant une plateforme d'e-commerce, GreenRoots
          permet aux particuliers et aux entreprises d'acheter des arbres à
          planter, contribuant ainsi à la restauration de nos forêts. En
          partenariat avec des associations de reforestation, nous aspirons à
          créer un impact positif sur l'environnement.
        </h3>

        <div className="flex justify-around items-center">
          <img
            src="/Images/Equipe.webp"
            alt="L'équipe GreenRoots travaillant sur la plateforme"
            className="w-[300px] object-cover"
            loading="lazy"
          />
        </div>

        <ul className="text-gray-700 mt-10 mb-4 flex flex-col justify-around items-center">
          <li>
            Quoi ? Une plateforme d'e-commerce pour acheter des arbres à
            planter.
          </li>
          <li className="text-gray-700 mt-4 mb-4">
            Qui ? GreenRoots est une entreprise fictive engagée dans la
            préservation de l'environnement.
          </li>
          <li className="text-gray-700 mt-4 mb-4">
            Pour qui ? Les éco-citoyens, les entreprises responsables et les
            associations soucieuses de l'environnement.
          </li>
          <li className="text-gray-700 mt-4 mb-4">
            Comment ? Organisation en équipe, utilisant une méthodologie agile.
          </li>
          <li className="text-gray-700 mt-4 mb-4">
            Quand ? Projet développé en 4 semaines, découpé en sprints de
            travail.
          </li>
          <li className="text-gray-700 mt-4 mb-4">
            Pourquoi ? Réalisation d'un projet pédagogique pour préparer les
            étudiants au Titre Professionnel.
          </li>
        </ul>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="coordonnees"
      >
        <h2 id="coordonnees" className="text-h2 font-bold text-black p-3 mt-2">
          Coordonnées de GreenRoots
        </h2>
        <ul className="flex flex-col justify-center items-center gap-2 text-gray-700 mt-4 mb-2">
          <li>GreenRoots</li>
          <li>123 Rue de la Forêt 75000 Paris, France</li>
          <li>Téléphone : +33 1 00 00 00 00</li>
          <li>Email : contact@greenroots.fr</li>
        </ul>

        <h2 className="text-h2 font-bold text-black p-3 mt-2 mb-2">Carte</h2>

        <div className="App flex-1 flex justify-center">
          <div className="lg:w-[600px] lg:h-[400px] w-[250px] h-[200px] z-0">
            <MapComponent />
          </div>
        </div>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="cgv"
      >
        <h2 id="cgv" className="text-h2 font-bold text-black p-3 mt-6 mb-2">
          Conditions Générales de Vente (CGV)
        </h2>

        <h3 className="text-h3 text-black p-3 mt-2 mb-2">
          Les présentes Conditions Générales de Vente régissent les transactions
          sur la plateforme GreenRoots. En utilisant notre plateforme, vous
          acceptez de vous conformer aux termes suivants.
        </h3>

        <p className="text-gray-700 mt-4">
          Objet : Vente d’arbres à planter, en partenariat avec des
          associations, pour contribuer à des projets de reforestation.
          Processus de commande : Une fois sélectionnés, les arbres sont ajoutés
          au panier et l’utilisateur passe par un tunnel d’achat fictif.
          Modalités de paiement : Le processus de paiement est fictif et destiné
          à une démonstration. Rétractation : Aucun remboursement n’est
          nécessaire, car il s’agit d’un projet fictif.
        </p>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="confidentialite"
      >
        <h2
          id="confidentialite"
          className="text-h2 font-bold text-black p-3 mt-6"
        >
          Politique de Confidentialité
        </h2>

        <h3 className="text-h3 text-black p-3 mt-2 mb-2">
          Chez GreenRoots, la confidentialité et la protection de vos données
          personnelles sont essentielles. En tant qu’utilisateur, vous pouvez
          accéder à notre site en sachant que vos informations personnelles sont
          protégées.
        </h3>

        <p className="text-gray-700 mt-4 mb-4">
          Collecte de données : Nous collectons uniquement les données
          nécessaires à la création de comptes et au suivi des commandes.
          Utilisation des données : Les données collectées sont exclusivement
          utilisées pour des opérations de gestion de comptes et de commandes.
          Droits des utilisateurs : Conformément à la réglementation RGPD, vous
          avez le droit de consulter, modifier ou supprimer vos données
          personnelles à tout moment. Sécurité des données : Nous appliquons des
          mesures de sécurité pour protéger vos données contre tout accès non
          autorisé. Contact : Pour toute demande relative à vos données,
          contactez-nous à l’adresse suivante : contact@greenroots.fr.
        </p>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="mentions-legales"
      >
        <h2
          id="mentions-legales"
          className="text-h2 font-bold text-black p-3 mt-6 mb-2"
        >
          Mentions légales
        </h2>

        <p className="text-gray-700 mt-4 mb-4">
          Éditeur du site GreenRoots (fictif) 123 Rue de la Forêt 75000 Paris,
          France Téléphone : +33 1 00 00 00 00 Email : contact@greenroots.fr
        </p>

        <h3 className="text-h3 text-black p-3 mt-2 mb-2">
          Responsabilité : Les informations diffusées sur ce site sont fournies
          uniquement à titre informatif. GreenRoots ne garantit pas l'exactitude
          ni la complétude des informations et ne saurait être tenu responsable
          des erreurs.
        </h3>

        <h3 className="text-h3 text-black p-3 mt-2 mb-2">
          Présentation du Projet de Développement
        </h3>

        <h4 className="text-h4 text-black p-3 mt-2 mb-2">
          Le projet GreenRoots a été développé avec les objectifs pédagogiques
          suivants :
        </h4>

        <h5 className="text-h5 text-black p-3 mt-2 mb-2">
          Fonctionnalités principales :
        </h5>
        <p>
          Une landing page introduisant GreenRoots et ses actions pour la
          reforestation. Système d’inscription et de connexion pour les
          utilisateurs. Gestion des arbres proposés par GreenRoots (création,
          édition, suppression). Consultation des arbres disponibles et
          possibilité de les "acheter". Suivi des commandes dans un espace
          utilisateur dédié.
        </p>

        <h5 className="text-h5 text-black p-3 mt-2 mb-2">
          Technologies et contraintes :
        </h5>
        <p>
          Sécurité : Nous avons mis en œuvre des mesures pour protéger les
          données et empêcher les failles courantes. Déploiement : Ce projet
          inclut une procédure de déploiement fictif pour simuler un
          environnement réel.
        </p>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="rgpd"
      >
        <h2 id="rgpd" className="text-h2 font-bold text-black p-3 mt-6 mb-2">
          Conformité au RGPD (Règlement Général sur la Protection des Données)
        </h2>

        <p className="text-gray-700 mt-4 mb-4">
          GreenRoots respecte la législation européenne en matière de protection
          des données personnelles, et notamment le Règlement Général sur la
          Protection des Données (RGPD). Nous nous engageons à protéger la vie
          privée de nos utilisateurs et à garantir la sécurité de leurs
          informations personnelles.
        </p>

        <ul className="text-gray-700 mt-4 mb-4 flex flex-col justify-around items-center">
          <li>
            Consentement : En utilisant notre plateforme, vous consentez à la
            collecte et à l’utilisation de vos données personnelles dans le
            cadre des services que nous offrons.
          </li>
          <li>
            Transparence : Vous avez le droit d’accéder à vos données, de les
            modifier, de les supprimer ou de demander leur portabilité à tout
            moment.
          </li>
          <li>
            Protection des données : Nous mettons en œuvre des mesures de
            sécurité pour protéger vos données contre tout accès non autorisé ou
            toute perte accidentelle.
          </li>
        </ul>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="accessibilite"
      >
        <h2
          id="accessibilite"
          className="text-h2 font-bold text-black p-3 mt-6 mb-2"
        >
          Accessibilité
        </h2>

        <p className="text-gray-700 mt-4 mb-4">
          Nous nous engageons à rendre notre site Web accessible à tous, y
          compris aux personnes en situation de handicap. Nous avons conçu
          GreenRoots pour respecter les normes d’accessibilité Web, en mettant
          en œuvre des pratiques inclusives pour garantir une expérience
          utilisateur optimale, quelle que soit la technologie ou le dispositif
          utilisé.
        </p>

        <ul className="text-gray-700 mt-4 mb-4 flex flex-col justify-around items-center">
          <li>Contrastes suffisants pour les utilisateurs malvoyants.</li>
          <li>
            Navigation au clavier disponible pour les personnes ayant des
            difficultés à utiliser une souris.
          </li>
          <li>Des descriptions textuelles pour toutes les images et vidéos.</li>
          <li>Des liens accessibles et correctement décrits.</li>
        </ul>
      </section>      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10"
        aria-labelledby="rgpd"
      >
        <h2 id="rgpd" className="text-h2 font-bold text-black p-3 mt-6 mb-2">
          Conformité au RGPD (Règlement Général sur la Protection des Données)
        </h2>

        <p className="text-gray-700 mt-4 mb-4">
          GreenRoots respecte la législation européenne en matière de protection des données personnelles, et notamment le Règlement Général sur la Protection des Données (RGPD). Nous nous engageons à protéger la vie privée de nos utilisateurs et à garantir la sécurité de leurs informations personnelles.
        </p>

        <ul className="text-gray-700 mt-4 mb-4 flex flex-col justify-around items-center">
          <li>Consentement : En utilisant notre plateforme, vous consentez à la collecte et à l’utilisation de vos données personnelles dans le cadre des services que nous offrons.</li>
          <li>Transparence : Vous avez le droit d’accéder à vos données, de les modifier, de les supprimer ou de demander leur portabilité à tout moment.</li>
          <li>Protection des données : Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé ou toute perte accidentelle.</li>
        </ul>
      </section>

      <section
        className="flex flex-col justify-around items-center lg:pl-10 lg:pr-10 mb-5"
        aria-labelledby="accessibilite"
      >
        <h2 id="accessibilite" className="text-h2 font-bold text-black p-3 mt-6 mb-2">
          Accessibilité
        </h2>

        <p className="text-gray-700 mt-4 mb-4">
          Nous nous engageons à rendre notre site Web accessible à tous, y compris aux personnes en situation de handicap. Nous avons conçu GreenRoots pour respecter les normes d’accessibilité Web, en mettant en œuvre des pratiques inclusives pour garantir une expérience utilisateur optimale, quelle que soit la technologie ou le dispositif utilisé.
        </p>

        <ul className="text-gray-700 mt-4 mb-4 flex flex-col justify-around items-center">
          <li>Contrastes suffisants pour les utilisateurs malvoyants.</li>
          <li>Navigation au clavier disponible pour les personnes ayant des difficultés à utiliser une souris.</li>
          <li>Des descriptions textuelles pour toutes les images et vidéos.</li>
          <li>Des liens accessibles et correctement décrits.</li>
        </ul>
      </section>

    </div>
  );
}

export default About;
