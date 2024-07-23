import cl from 'classnames';
import styles from './styles.module.scss';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export default function Pagination({ className, currentPage, totalPages, onPageChange }) {
    const handleClickPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className={cl(className, styles.pagination)}>
            <button
                className={cl(className, styles.paginationButton)}
                onClick={() => handleClickPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaAngleDoubleLeft />
            </button>
            {[...Array(totalPages)].map((_, pageNumber) => (
                <button
                    key={pageNumber}
                    className={cl(styles.paginationButton, {
                        [styles.activePage]: currentPage === pageNumber + 1
                    })}
                    onClick={() => handleClickPage(pageNumber + 1)}
                >
                    {pageNumber + 1}
                </button>
            ))}
            <button
                className={styles.paginationButton}
                onClick={() => handleClickPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaAngleDoubleRight />
            </button>
        </div>
    );
}
