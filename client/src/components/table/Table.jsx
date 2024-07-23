import {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.scss';
import cl from 'classnames';
import axios from 'axios';
//import { FaUser } from "react-icons/fa";
//import { MdEdit, MdDelete, MdOutlineSaveAlt } from "react-icons/md";
import UserTable from '../userTable/UserTable';

export default function Table({ className }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            }
            catch(error){
                console.log('error', error)
            }
        }
        fetchData();
    }, [])

  return (
    <div className={cl(className, styles.table)}>
        <UserTable className={styles.table} userData={users} setUsers={setUsers} />
    </div>
  )
}
