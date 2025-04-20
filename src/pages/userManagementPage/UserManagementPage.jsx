import {useContext, useEffect, useState} from "react";
import Button from "../../components/button/Button.jsx";
import styles from "./UserManagementPage.module.css";
import {formatRoles} from "../../helpers/formatRole.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import useApiRequest from "../../hooks/useApiRequest.js";

function UserManagementPage() {
    const {user: loggedInUsername} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { executeRequest } = useApiRequest();

    useEffect(() => {
        void fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            setLoading(true);
            setError(null);
            const response = await executeRequest("get", `${import.meta.env.VITE_API_URL}/users`);
            if (response?.data) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error(error);
            setError("Kon gebruikers niet ophalen.");
        } finally {
            setLoading(false);
        }
    }

    async function toggleAdminRole(username, isAdmin) {
        try {
            if (isAdmin) {
                await executeRequest(
                    "delete",
                    `${import.meta.env.VITE_API_URL}/users/${username}/authorities/ROLE_ADMIN`
                );
            } else {
                await executeRequest(
                    "post",
                    `${import.meta.env.VITE_API_URL}/users/${username}/authorities`,
                    { authority: "ROLE_ADMIN" }
                );
            }
            await fetchUsers();
        } catch (error) {
            console.error(error);
            setError("Kon rol niet aanpassen.");
        }
    }

    async function deleteUser(username) {
        try {
            await executeRequest(
                "delete",
                `${import.meta.env.VITE_API_URL}/users/${username}`
            );
            setUsers(prev => prev.filter(user => user.username !== username));
        } catch (error) {
            console.error(error);
            setError("Gebruiker verwijderen mislukt.");
        }
    }

    const numberOfAdmins = users.filter(user =>
        user.authorities.some(auth => auth.authority === 'ROLE_ADMIN')
    ).length;

    return (
        <section className="leftContainer">
            <h2>Gebruikersbeheer</h2>
            <div className={styles.tableContainer}>
                {loading && <p>Gebruikers worden geladen...</p>}
                {error && <p>{error}</p>}
                {!loading && users.length > 0 && (
                    <table className={styles.userTable}>
                        <thead>
                        <tr>
                            <th>Gebruikersnaam</th>
                            <th>Email</th>
                            <th>Rollen</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users
                            .slice()
                            .sort((a, b) => a.username.localeCompare(b.username))
                            .map(user => {
                            const isAdmin = user.authorities.some(auth => auth.authority === 'ROLE_ADMIN');
                            const isOnlyAdmin = isAdmin && numberOfAdmins === 1;
                            const isCurrentUser = user.username === loggedInUsername.username;

                            return (
                                <tr key={user.username}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{formatRoles(user.authorities.map(a => a.authority))}</td>
                                    <td className={styles.actions}>
                                        <Button
                                            variant="secondary"
                                            onClick={() => toggleAdminRole(user.username, isAdmin)}
                                            disabled={isOnlyAdmin || isCurrentUser}
                                        >
                                            {isAdmin ? "Ontneem Admin" : "Maak Admin"}
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteUser(user.username)}
                                            disabled={isOnlyAdmin || isCurrentUser}
                                        >
                                            Verwijder
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
}

export default UserManagementPage;
