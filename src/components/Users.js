import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UsersList from './UsersList';
import Modal from './Modal';
import '../styles/Users.css';
import UsersForm from './UsersForm';
import useAnimationModal from '../hooks/useAnimationModal';

/* const usersDb = [
    {
        id: 1,
        first_name: "Horangel",
        last_name: "Millan",
        email: "horangelmillan@gmail.com",
        birthday: "1996-06-01",
        password: "TheLegendOfZelda"
    },
    {
        id: 2,
        first_name: "Manuel",
        last_name: "Perez",
        email: "manuelperez@gmail.com",
        birthday: "1980-01-15",
        password: "holaqaze"
    }
] */

const Users = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        /* setUsers(usersDb); */
        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setUsers(res.data));
    }, []);

    const getUsers = () => {
        /* setUsers(usersDb); */
        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setUsers(res.data));
    };

    const addUser = (userByForm) => {
        /* usersDb.push(userByForm);
        getUsers(); */
        axios.post('https://users-crud1.herokuapp.com/users/', userByForm)
            .then(res => getUsers(), console.log('add:', userByForm))
            .catch(error => console.log('Hubo un error: ' + error));
    };

    const editUser = (userEdited) => {
        /* delete userEdited.id;
        const userIndex = usersDb.findIndex(user => user.id === selectedUser.id);
        users[userIndex] = userEdited;
        setUsers([...users]) */
        axios.put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, userEdited)
            .then(res => getUsers(), console.log('edited:', userEdited, selectedUser.id))
            .catch(error => console.log('Hubo un error: ' + error));
    };

    const selectUser = (userSelected) => {
        setSelectedUser(userSelected);
    };

    const deleteUser = (idUser) => {
        /* for (let i = 0; i < users.length; i++) {
            if (users[i].id === idUser) {
                users.splice(i, 1);
                setUsers([...users]);
            };
        }; */
        axios.delete(`https://users-crud1.herokuapp.com/users/${idUser}/`)
            .then(res => getUsers(), clearInputs(), console.log(`deleted: user ${idUser}`))
            .catch(error => console.log('Hubo un error: ' + error));
    };

    const clearInputs = () => setSelectedUser(null);

    const openCloseModal = (modModal) => {
        setIsModal(modModal);

    };

    const { animationModal, fadeOut } = useAnimationModal(openCloseModal);

    return (
        <div className='users'>

            <div className='animated-figures'>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <button onClick={() => openCloseModal('addUser', clearInputs())}><h2>Add new user</h2></button>

            {
                isModal && (
                    <Modal isModal={isModal} openCloseModal={openCloseModal}>
                        {
                            isModal === 'editUser' ? (
                                <UsersForm
                                    openCloseModal={openCloseModal}
                                    addUser={addUser}
                                    selectedUser={selectedUser}
                                    editUser={editUser}
                                    clearInputs={clearInputs}
                                />
                            ) : isModal === 'addUser' ? (
                                <UsersForm
                                    openCloseModal={openCloseModal}
                                    addUser={addUser}
                                    editUser={editUser}
                                    clearInputs={clearInputs}
                                    selectedUser={selectedUser}
                                />
                            ) : isModal === 'deleteUser' && (

                                <div className={`delete-user ${fadeOut && 'fadeOut'}`}>
                                    <h2>¿Do you want delete this user?</h2>
                                    <button onClick={() => deleteUser(selectedUser.id, animationModal(), clearInputs())}>Yes, i want</button>
                                    <button onClick={animationModal} >No, i don't</button>
                                </div>

                            )
                        }
                    </Modal>
                )
            }

            <UsersList
                openCloseModal={openCloseModal}
                users={users} selectUser={selectUser}
                selectedUser={selectedUser}
                deleteUser={deleteUser}
                clearInputs={clearInputs}
            />

        </div>
    );
};

export default Users;