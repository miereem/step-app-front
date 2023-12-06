import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function loginUser(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {username, password});
            setUser(data);
            alert("Login successful.")
            setRedirect(true);
        } catch (e) {
            console.error(e);
            alert(e.message)
        }
    }

    if(redirect) {
        return (<Navigate to={'/'}/>);
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input type="username" placeholder="username" value={username}
                           onChange={event => setUsername(event.target.value)}/>
                    <input type="password" placeholder="password" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                    <button>Login</button>
                    <div className="text-center py-2 text-gray-500">New here? <Link className="text-black" to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}