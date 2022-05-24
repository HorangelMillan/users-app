import React, { useEffect, useState } from 'react';
import '../styles/UsersForm.css'

const UsersForm = ({ addUser, selectedUser, editUser, clearInputs, openCloseModal }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');

    const forceClearInputs = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setBirthday('');
        setPassword('');
    };

    useEffect(() => {
        if (selectedUser !== null) {
            setFirstName(selectedUser.first_name);
            setLastName(selectedUser.last_name);
            setEmail(selectedUser.email);
            setBirthday(selectedUser.birthday);
            setPassword(selectedUser.password);
            console.log(selectedUser);
        } else {
            forceClearInputs();
        }
    }, [selectedUser]);

    const userByForm = () => {
        const user = {
            id: Date.now(),
            first_name: firstName,
            last_name: lastName,
            email,
            birthday,
            password
        };
        if (selectedUser !== null) {
            user.id = selectedUser.id;
            editUser(user);
            clearInputs();
        } else {
            addUser(user);
            forceClearInputs();
        };
    };

    return (
        <form className='users-form'>
            <h2><b>{selectedUser ? 'Edit user' : 'Add User'}</b></h2>

            <label htmlFor="first-name"><b>First name </b></label>
            <div><input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" id='first-name' /></div>

            <label htmlFor="last-name"><b>Last name </b></label>
            <div><input onChange={e => setLastName(e.target.value)} value={lastName} type="text" id='last-name' /></div>

            <label htmlFor="email"><b>E-mail </b></label>
            <div><input onChange={e => setEmail(e.target.value)} value={email} type="text" id='email' /></div>

            <label htmlFor="birthday"><b>Birthday </b></label>
            <div><input onChange={e => setBirthday(e.target.value)} value={birthday} type="date" id='birthday' /></div>

            <label htmlFor="password"><b>{selectedUser ? 'New password' : 'Password'} </b></label>
            <div><input onChange={e => setPassword(e.target.value)} value={password} type="password" id='password' /></div>

            <button type='submit' onClick={() => userByForm(openCloseModal())}>Submit</button>
        </form>
    );
};

export default UsersForm;