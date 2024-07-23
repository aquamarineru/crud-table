import { useState } from 'react';
import cl from 'classnames';
import styles from './styles.module.scss';
import { MdPersonSearch } from "react-icons/md";

export default function Search({ className, columns, onSearch }) {
    const [searchText, setSearchText] = useState('');
    const [selectedColumns, setSelectedColumns] = useState(columns);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleColumnChange = (e) => {
        const options = e.target.options;
        const selectedColumns = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedColumns.push(options[i].value);
            }
        }
        setSelectedColumns(selectedColumns);
    };

    const handleSearch = () => {
        onSearch(searchText, selectedColumns);
    };

    return (
        <div className={cl(className, styles.search)}>
            <input
                type="text"
                value={searchText}
                onChange={handleSearchTextChange}
                className={styles.searchInput}
                placeholder="Поиск..."
            />
            <div className={cl(styles.dropdown, "dropdown")}>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Выберите колонки
                </button>
                <ul className={cl("dropdown-menu", styles.searchSelect)} aria-labelledby="dropdownMenuButton">
                    {columns.map((column) => (
                        <li key={column}>
                            <a className="dropdown-item" href="#" onClick={() => handleColumnChange(column)}>
                                {column}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleSearch} className={cl(className, styles.searchButton, "btn btn-info")}>
                Искать <MdPersonSearch />
            </button>
        </div>
    );
}
