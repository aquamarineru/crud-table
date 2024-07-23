import { useState, useEffect } from 'react';
import cl from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.scss';
import axios from 'axios';
import { MdEdit, MdDelete, MdOutlineSaveAlt } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import AddUser from './AddUser';
import Pagination from '../pagination/Pagination';
import Search from '../search/Search';

const columnMapping = {
    name: 'Имя',
    last_name: 'Фамилия',
    email: 'Email',
    position: 'Должность',
    location: 'Локация',
    salary: 'Зарплата',
    experience: 'Опыт',
    skills: 'Навыки',
    education: 'Образование'
};

const columns = Object.keys(columnMapping);

export default function UserTable({ className, userData, setUsers }) {
    const [isEditing, setIsEditing] = useState(null);
    const [showNewUserRow, setShowNewUserRow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(userData);
    const rowsPerPage = 6;

    useEffect(() => {
        setFilteredData(userData);
    }, [userData]);

    const handleEditClick = (index) => {
        setIsEditing(index);
    };

    const handleSaveClick = async (index) => {
        try {
            const user = filteredData[index];
            await axios.put(`http://localhost:8080/api/user/${user._id}`, user);
            setIsEditing(null);
            console.log('User data updated:', user);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newData = [...filteredData];
        newData[index] = { ...newData[index], [name]: value };
        setFilteredData(newData);
        // Update the original user data as well to keep them in sync
        const originalIndex = userData.findIndex((user) => user._id === newData[index]._id);
        const originalData = [...userData];
        originalData[originalIndex] = newData[index];
        setUsers(originalData);
    };

    const handleDeleteClick = async (index) => {
        try {
            const user = filteredData[index];
            await axios.delete(`http://localhost:8080/api/user/${user._id}`);
            const newData = filteredData.filter((user, i) => i !== index);
            setFilteredData(newData);
            const originalData = userData.filter((u) => u._id !== user._id);
            setUsers(originalData);
            console.log('User deleted:', user);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleSearch = (searchText, selectedColumns) => {
        if (searchText === '') {
            setFilteredData(userData);
        } else {
            const lowercasedFilter = searchText.toLowerCase();
            const filteredData = userData.filter(item => 
                selectedColumns.some(column => 
                    item[column] && item[column].toString().toLowerCase().includes(lowercasedFilter)
                )
            );
            setFilteredData(filteredData);
        }
        setCurrentPage(1);
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={cl(className, styles.tableContainer)}>
            <Search 
                columns={columns.map(key => columnMapping[key])} 
                onSearch={(searchText, selectedColumns) => {
                    const selectedKeys = selectedColumns.map(column => Object.keys(columnMapping).find(key => columnMapping[key] === column));
                    handleSearch(searchText, selectedKeys);
                }} 
            />
            <div className={styles.tableContainerAddUser}>
                <button 
                    className={cl(styles.tableContainerAddUserButton, "btn btn-primary")}
                    onClick={() => setShowNewUserRow(true)}
                >
                    <FaUser />
                    Добавить 
                </button>
            </div>
            {currentRows.length === 0 ? (
                <div className={styles.noDataMessage}>
                    Данных нет
                </div>
            ) : (
                <div className={cl(className, styles.tableContainerResponsive, "table-responsive" )}>
                    <table className={cl(styles.userTableTable, "table table-bordered")}>
                        <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Имя</th>
                                <th scope="col">Фамилия</th>
                                <th scope="col">Email</th>
                                <th scope="col">Должность</th>
                                <th scope="col">Локация</th>
                                <th scope="col">Зарплата</th>
                                <th scope="col">Опыт</th>
                                <th scope="col">Навыки</th>
                                <th scope="col">Образование</th>
                                <th scope="col">Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{indexOfFirstRow + index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={user.last_name || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="position"
                                            value={user.position || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="location"
                                            value={user.location || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="salary"
                                            value={user.salary || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={user.experience || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="skills"
                                            value={user.skills || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="education"
                                            value={user.education || ''}
                                            onChange={(e) => handleInputChange(e, index)}
                                            disabled={isEditing !== index}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <div className={styles.tableContainerBtnAction}>
                                            {isEditing === index ? (
                                                <button 
                                                    className={cl(styles.tableContainerBtnActionButton, "btn btn-success")}
                                                    onClick={() => handleSaveClick(index)}
                                                >
                                                    <MdOutlineSaveAlt />
                                                </button>
                                            ) : (
                                                <div>
                                                    <button 
                                                        className={cl(styles.tableContainerBtnActionButton, "btn btn-primary")} 
                                                        onClick={() => handleEditClick(index)}
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button 
                                                        className={cl(styles.tableContainerBtnActionButton, "btn btn-danger")} 
                                                        onClick={() => handleDeleteClick(index)}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {showNewUserRow && (
                                <AddUser 
                                    index={userData.length} 
                                    userData={userData} 
                                    setUsers={setUsers} 
                                    setShowNewUserRow={setShowNewUserRow}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
}
