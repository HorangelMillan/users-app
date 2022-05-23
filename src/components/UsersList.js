import React from 'react';
import '../styles/UsersList.css'

const UsersList = ({ users, selectUser, openCloseModal }) => {

    return (
        <ul className='users-list'>
            {
                users.map(user => (
                    <li key={user.id}>
                        <div>
                            <h2>{user.first_name}  {user.last_name}</h2>
                            <p><span>{user.email}</span></p>
                            <p>{user.birthday}</p>
                        </div>
                        <div>
                            <button onClick={() => selectUser(user, openCloseModal('editUser'))}>Edit</button>
                            <button onClick={() => selectUser(user, openCloseModal('deleteUser'))}>Delete</button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default UsersList;