import { useState, useEffect } from "react";
import { ReactComponent as UserIcon } from "feather-icons/dist/icons/user.svg";
import { collection, query, doc, where, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router";
import { ReactComponent as DropdownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as DropupIcon } from "feather-icons/dist/icons/chevron-up.svg";

const MobileUsers = (props) => {
    const navigate = useNavigate();
    const [activeUsers, setActiveUsers] = useState([]);
    const [dropdown, setDropdown] = useState(false);

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
    return (
        <div class="lg:hidden mb-20">
            <div class="fixed z-30 top-0 w-full">
                <div style={{ backgroundColor: "#5011CC" }} class="p-4 flex justify-between align-center text-white ">
                    <h2
                        class="text-xl font-bold">
                        Active Users
                    </h2>
                    {dropdown ? <DropupIcon onClick={() => setDropdown(false)} class="w-8 h-8 cursor-pointer hover:text-gray-300" /> : <DropdownIcon onClick={() => setDropdown(true)} class="w-8 h-8 cursor-pointer hover:text-gray-300" />}
                </div>

                {dropdown &&
                    <div style={{ borderColor: "#5011CC", backgroundColor: "lightblue" }} class="absolute w-full rounded-b-lg text-center z-30 bg-gray-300 border-b">
                        <ul>
                            <li>
                                {activeUsers.map((user) => {
                                    return (
                                        <div class="mx-8 flex align-center py-2 gap-5">
                                            <UserIcon class="text-black" />
                                            <p class="text-black">{user.userInfo.provider.displayName}</p>
                                        </div>
                                    )
                                })}
                            </li>
                        </ul>
                        <button
                            onClick={logoutHandler}
                            style={{ backgroundColor: "#6415FF" }}
                            class="block mx-auto text-white font-bold rounded px-10 py-3 my-2 hover:text-gray-200"
                        >
                            LOG OUT
                        </button>
                    </div>

                }
            </div>
        </div>
    )
}

export default MobileUsers