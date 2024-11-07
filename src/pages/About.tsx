import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    <div className="flex-1 flex flex-col m-10">
      <h1 className="text-h1 font-bold text-black p-3 mt-2 mb-2">
        À propos de GreenRoots
      </h1>

      <h3 className="text-h3 text-black p-3 mt-2 mb-2">
        GreenRoots est une initiative fictive, conçue pour répondre à l'urgence
        de la reforestation et de la lutte contre le changement climatique. En
        développant une plateforme d'e-commerce, GreenRoots permet aux
        particuliers et aux entreprises d'acheter des arbres à planter,
        contribuant ainsi à la restauration de nos forêts. En partenariat avec
        des associations de reforestation, nous aspirons à créer un impact
        positif sur l'environnement.{' '}
      </h3>

      <ul className="text-gray-700 mt-4 mb-4">
        Quoi ? Une plateforme d'e-commerce pour acheter des arbres à planter.
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
          Quand ? Projet développé en 4 semaines, découpé en sprints de travail.
        </li>
        <li className="text-gray-700 mt-4 mb-4">
          Pourquoi ? Réalisation d'un projet pédagogique pour préparer les
          étudiants au Titre Professionnel.
        </li>
      </ul>

      <h2 className="text-h2 font-bold text-black p-3 mt-2 mb-2">
        Coordonnées de GreenRoots
      </h2>

      <p className="text-gray-700 mt-4 mb-4">
        GreenRoots 123 Rue de la Forêt 75000 Paris, France Téléphone : +33 1 23
        45 67 89 Email : contact@greenroots.fr Conditions Générales de Vente
        (CGV)
      </p>

      <h2 className="text-h2 font-bold text-black p-3 mt-2 mb-2">Carte</h2>

      <h2 id="cgv" className="text-h2 font-bold text-black p-3 mt-2 mb-2">
        Conditions Générales de Vente (CGV)
      </h2>

      <h3 className="text-h3 text-black p-3 mt-2 mb-2">
        Les présentes Conditions Générales de Vente régissent les transactions
        sur la plateforme GreenRoots. En utilisant notre plateforme, vous
        acceptez de vous conformer aux termes suivants.
      </h3>

      <p className="text-gray-700 mt-4 mb-4">
        Objet : Vente d’arbres à planter, en partenariat avec des associations,
        pour contribuer à des projets de reforestation. Processus de commande :
        Une fois sélectionnés, les arbres sont ajoutés au panier et
        l’utilisateur passe par un tunnel d’achat fictif. Modalités de paiement
        : Le processus de paiement est fictif et destiné à une démonstration.
        Rétractation : Aucun remboursement n’est nécessaire, car il s’agit d’un
        projet fictif.
      </p>

      <h2
        id="confidentialite"
        className="text-h2 font-bold text-black p-3 mt-2 mb-2"
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
        Collecte de données : Nous collectons uniquement les données nécessaires
        à la création de comptes et au suivi des commandes. Utilisation des
        données : Les données collectées sont exclusivement utilisées pour des
        opérations de gestion de comptes et de commandes. Droits des
        utilisateurs : Conformément à la réglementation RGPD, vous avez le droit
        de consulter, modifier ou supprimer vos données personnelles à tout
        moment. Sécurité des données : Nous appliquons des mesures de sécurité
        pour protéger vos données contre tout accès non autorisé. Contact : Pour
        toute demande relative à vos données, contactez-nous à l’adresse
        suivante : contact@greenroots.fr.
      </p>

      <h2
        id="mentions-legales"
        className="text-h2 font-bold text-black p-3 mt-2 mb-2"
      >
        Mentions légales
      </h2>

      <p className="text-gray-700 mt-4 mb-4">
        Éditeur du site GreenRoots (fictif) 123 Rue de la Forêt 75000 Paris,
        France Téléphone : +33 1 23 45 67 89 Email : contact@greenroots.fr
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
        Sécurité : Nous avons mis en œuvre des mesures pour protéger les données
        et empêcher les failles courantes. Déploiement : Ce projet inclut une
        procédure de déploiement et utilise Git et GitHub pour le suivi des
        versions. Accessibilité : Le site respecte les normes d’accessibilité
        WCAG. RGPD : Les mentions légales et la politique de confidentialité
        sont conformes à la réglementation RGPD. SEO : Des optimisations SEO ont
        été appliquées pour le référencement.
      </p>

      <h5 className="text-h5 text-black p-3 mt-2 mb-2">
        Évolutions possibles :
      </h5>
      <p>
        Suivi de la croissance des arbres. Back-office pour gérer les profils
        utilisateurs et suivre les arbres. Intégration d'un système de paiement
        sécurisé pour permettre de véritables transactions.
      </p>

      <h5 className="text-h5 text-black p-3 mt-2 mb-2">Note pédagogique</h5>

      <p className="text-gray-700 mt-4 mb-4">
        Ce site a été conçu par les étudiants de GreenRoots pour mettre en
        pratique les compétences acquises en développement web et gestion de
        projet. Ce projet fictif n’a aucune portée commerciale réelle.
      </p>
    </div>
  );
}

export default About;
