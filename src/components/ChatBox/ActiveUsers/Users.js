import { useState, useEffect } from "react";
import { ReactComponent as UserIcon } from "feather-icons/dist/icons/user.svg";
import { collection, query, doc, where, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router";

const Users = (props) => {
    const navigate = useNavigate();
    const [activeUsers, setActiveUsers] = useState([]);

    const inactivityTime = 1000 * 60 * 30; // 15 minutes (adjust as needed)
    let logoutTimer;

    const startLogoutTimer = () => {
        logoutTimer = setTimeout(async () => {
            await logoutHandler();
        }, inactivityTime);
    };

    const resetLogoutTimer = () => {
        clearTimeout(logoutTimer);
        startLogoutTimer();
    };

    const updateActiveUsers = (snapshot) => {
        const activeUsersData = snapshot.docs.map((doc) => doc.data());
        setActiveUsers(activeUsersData);
    };

    const removeUserFromActiveUsers = async () => {
        const usersCollectionRef = collection(db, "activeUsers");
        const userQuery = query(usersCollectionRef, where('userInfo.uid', '==', props.user.uid));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
            const logoutUserRef = querySnapshot.docs[0].ref;
            try {
                await deleteDoc(logoutUserRef);
            } catch (error) {
                console.error('Error removing user info:', error.message);
            }
        }
    };

    const logoutHandler = async () => {
        removeUserFromActiveUsers();
        try {
            await auth.signOut();
            localStorage.removeItem('authToken');
            navigate("/");
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    useEffect(() => {
        const activeUsersCollectionRef = collection(db, 'activeUsers');
        const getActiveUsers = async () => {
            const activeUsersSnapshot = await getDocs(activeUsersCollectionRef);
            const activeUsersData = activeUsersSnapshot.docs.map((doc) => doc.data());
            setActiveUsers(activeUsersData);
        }
        getActiveUsers();
        const unsubscribe = onSnapshot(activeUsersCollectionRef, (snapshot) => {
            updateActiveUsers(snapshot);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        startLogoutTimer(); // Start the logout timer

        document.addEventListener('mousedown', resetLogoutTimer);
        document.addEventListener('keydown', resetLogoutTimer);
        return () => {
            clearTimeout(logoutTimer);
            document.removeEventListener('mousedown', resetLogoutTimer);
            document.removeEventListener('keydown', resetLogoutTimer);
        };
    }, []);


    return (
        <div class='hidden lg:flex h-full flex-col justify-between'>
            <div class="overflow-y-auto">
                <h2
                    style={{ backgroundColor: "#5011CC" }}
                    class="py-4 mb-4 bg-sky-800 text-3xl font-bold text-white text-center">
                    Active Users
                </h2>
                <ul>
                    <li>
                        {activeUsers.map((user) => {
                            return (
                                <div class="mx-8 flex align-center py-2 gap-5">
                                    <UserIcon class="text-white" />
                                    <p class="text-white">{user.userInfo.provider.displayName}</p>
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>
            <div>
                <button
                    onClick={logoutHandler}
                    style={{ backgroundColor: "#6415FF" }}
                    class="block mx-auto text-white font-bold rounded px-24 py-4 my-4 hover:text-gray-200"
                >
                    LOG OUT
                </button>
            </div>
        </div>
    )
}

export default Users