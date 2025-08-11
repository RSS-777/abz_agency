import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './SectionUsers.module.scss';
import { getUsers } from '../../api/usersApi';
import { Button } from "../Button/Button";

export const SectionUsers = () => {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isSuccess = useSelector(state => state.auth.isSuccess)

    // Fetching and sorting users
    const fetchUsers = async (currentPage) => {
        setIsLoading(true)
        const response = await getUsers(currentPage, 6)

        if (response.success) {
            const sortUsers = response.users.sort((a, b) => new Date(b.registration_timestamp) - new Date(a.registration_timestamp))

            if (currentPage === 1) {
                setUsers(sortUsers);
            } else {
                setUsers(prev => [...prev, ...sortUsers])
            }
            setTotalPages(response.totalPages);
        } // Error handling is done inside the API function (getUsers)

        setIsLoading(false)
    };

    // Call fetch when page changes
    useEffect(() => {
        fetchUsers(page)
    }, [page]);

    // Reload and reset user pages after successful registration
    useEffect(() => {
        if (isSuccess) {
            if (page === 1) {
                fetchUsers(1);
            } else {
                setPage(1);
            }
        }
    }, [isSuccess]);

    // Show more users
    const handleShowMore = () => {
        setPage(prev => prev + 1)
    };

    const isLastPage = totalPages !== null && page >= totalPages;

    return (
        <section id='users' className={styles['users']}>
            <h2 className={styles['users__title']}>Working with GET request</h2>
            <div className={styles['users__container']}>
                {users.length
                    ? users.map((user, index) => (
                        <div key={`${user.id}-${index}`} className={styles['user-card']}>
                            <img src={user.photo} alt={user.name} className={styles['user-card__img']} />
                            <p>{user.name}</p>
                            <p className={styles['user-card__block-info']}>
                                <span>{user.position}</span>
                                <span>{user.email}</span>
                                <span>{user.phone}</span>
                            </p>
                        </div>
                    ))
                    : <p className={styles['users__loading']}>Loading...</p>
                }
            </div>
            {!isLastPage && !isLoading && (
                <div className={styles['users__button-wrapper']}>
                    <Button label='Show more' onClick={handleShowMore} />
                </div>
            )}
        </section>
    )
};