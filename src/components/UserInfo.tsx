import type { FC } from 'react';
import type { UserInfoProps } from '../@types/users';

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="user-info">
      <h1>Bienvenue, {user.firstname} {user.lastname}</h1>
      <p>Email : {user.email}</p>
      <p>Ville : {user.city}</p>
      <p>Code postal : {user.postal_code}</p>
      <p>Adresse : {user.street} {user.street_number}</p>
      <p>Pays : {user.country}</p>
      {/* Affichez d'autres informations si nécessaire */}
    </div>
  );
};

export default UserInfo;
