import type { FC } from 'react';
import type { UserInfoProps } from '../@types/users';

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="user-info max-w-md mx-auto p-6 bg-greenroots_sand shadow-md rounded-md m-10">
      <h1 className="text-h1 font-bold text-center mb-8">Bienvenue, {user.firstname} {user.lastname}</h1>
      <p className="mt-1 block w-full px-4 py-2">Email : {user.email}</p>
      <p className="mt-1 block w-full px-4 py-2">Téléphone : {user.phone_number}</p>
      <p className="mt-1 block w-full px-4 py-2">Adresse : {user.street_number} {user.street}</p>
      <p className="mt-1 block w-full px-4 py-2">Code postal : {user.postal_code}</p>
      <p className="mt-1 block w-full px-4 py-2">Ville : {user.city}</p>
      <p className="mt-1 block w-full px-4 py-2">Pays : {user.country}</p>

      <p className="mt-1 block w-full px-4 py-2">Société / Association  : {user.entity_name}</p>
      <p className="mt-1 block w-full px-4 py-2">Type structure : {user.entity_type}</p>
      <p className="mt-1 block w-full px-4 py-2">Numéro de SIRET : {user.entity_siret}</p>
      {/* Affichez d'autres informations si nécessaire */}
    </div>
  );
};

export default UserInfo;
