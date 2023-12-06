import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import PlacesPage from "./PlacesPage.jsx";

export default function AccountPage () {
    const [redirect, setRedirect] = useState(null);
    const {setUser, ready, user} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready) {
        return 'Loading...';
    }

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    
    return (
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                     {user.name} <br />
                    <button onClick={logout} className="max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
};