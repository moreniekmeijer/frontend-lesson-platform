import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import styles from "./UserManagementPage.module.css";
import {formatRoles} from "../../helpers/formatRole.js";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "../../context/AuthContext.jsx";

function UserManagementPage() {
    const { user: loggedInUsername } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        void fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Kon gebruikers niet ophalen.");
            setLoading(false);
        }
    }

    async function toggleAdminRole(username, isAdmin) {
        try {
            if (isAdmin) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/users/${username}/authorities/ROLE_ADMIN`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/users/${username}/authorities`, {
                    authority: "ROLE_ADMIN"
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            fetchUsers();
        } catch (err) {
            console.error(err);
            setError("Kon rol niet aanpassen.");
        }
    }

    async function deleteUser(username) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(prev => prev.filter(user => user.username !== username));
        } catch (err) {
            console.error(err);
            setError("Gebruiker verwijderen mislukt.");
        }
    }

    const numberOfAdmins = users.filter(user =>
        user.authorities.some(auth => auth.authority === 'ROLE_ADMIN')
    ).length;

    return (
        <section>
            <h2>Gebruikersbeheer</h2>
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
                    {users.map(user => {
                        const isAdmin = user.authorities.some(auth => auth.authority === 'ROLE_ADMIN');
                        const isOnlyAdmin = isAdmin && numberOfAdmins === 1;
                        const isCurrentUser = user.username === loggedInUsername.username;
                        console.log (user.username + " en " + loggedInUsername.username);

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
        </section>
    );
}

export default UserManagementPage;
