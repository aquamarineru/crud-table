import { useState } from 'react';
import cl from 'classnames';
import styles from './styles.module.scss';
import { MdOutlineSaveAlt } from "react-icons/md";
import axios from 'axios';

export default function AddUser({ index, userData, setUsers, setShowNewUserRow }) {
    const newUsers = {
        name: '',
        last_name: '',
        email: '',
        position: '',
        location: '',
        salary: '',
        experience: '',
        skills: '',
        education: ''
    };
    const [newUser, setNewUser] = useState(newUsers);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('name:', name, 'value:', value);
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user', newUser);
            console.log('user created', response);
            setUsers([...userData, response.data]);
            setNewUser(newUsers);
            setShowNewUserRow(false);
        } catch (error) {
            console.error('Ошибка:', error);
            console.error('Error response:', error.response);
        }
    };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="position"
                    value={newUser.position}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="location"
                    value={newUser.location}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="salary"
                    value={newUser.salary}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="experience"
                    value={newUser.experience}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="skills"
                    value={newUser.skills}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="education"
                    value={newUser.education}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
            </td>
            <td>
                <div className={styles.userTableBtnAction}>
                    <button 
                        className={cl(styles.saveButton, "btn btn-success")}
                        onClick={handleSaveClick}
                    >
                        <MdOutlineSaveAlt />
                    </button>
                </div>
            </td>
        </tr>
    );
}
