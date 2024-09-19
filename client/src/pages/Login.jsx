import { useContext, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";


export function Login() {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    const { changeLoginStatus } = useContext(GlobalContext)
    const navigate = useNavigate();

    function submitForm(e) {
        e.preventDefault();

        setIsFormValidated(true);

        const minUsernameLength = 3;
        const maxUsernameLength = 20;
        const minPasswordLength = 12;
        const maxPasswordLength = 100;

        let usernameError = '';
        if (username.length > maxUsernameLength) {
            usernameError = 'Username is too long(max 20)';
        } else if (username.length < minUsernameLength) {
            usernameError = 'Username is too shot(min 3)';
        }
        setUsernameError(usernameError);

        let passwordError = '';
        if (password.length > maxPasswordLength) {
            passwordError = 'Password is too long(max 100)';
        } else if (password.length < minPasswordLength) {
            passwordError = 'Password is too short(min 12)';
        }
        setPasswordError(passwordError);

        if (!usernameError && !passwordError) {
            fetch('http://localhost:5020/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            }).then(res => res.json())
                .then(data => {
                    setApiResponse(data)
                    if (data.status === 'Success') {
                        changeLoginStatus(true);
                        navigate('/dashboard');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <Header />
            <main className="form-signin container w-50">
                <form onSubmit={submitForm} className="row-12">
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                    {apiResponse && apiResponse.status === 'Success' ? <p className="alert alert-success">Success</p> : null}
                    {apiResponse && apiResponse.status === 'Error' ? <p className="alert alert-danger">{apiResponse.data}</p> : null}
                    <div className="form-floating">
                        <input type="text"
                            className={"form-control " + (!isFormValidated ? null : usernameError ? 'is-invalid' : 'is-valid')}
                            id="floatingInput" placeholder="Bill" value={username} onChange={e => setUsername(e.target.value.trim())}></input>
                        <label htmlFor="floatingInput">User name</label>
                        {usernameError && <p className="alert alert-danger">{usernameError}</p>}
                    </div>
                    <div className="form-floating">
                        <input value={password} onChange={e => setPassword(e.target.value)}
                            type="password" className={`form-control ` +
                                (!isFormValidated ? null : passwordError ? 'is-invalid' : 'is-valid')} id="password"
                            placeholder="Password">
                        </input>
                        <label htmlFor="floatingPassword">Password</label>
                        {passwordError && <p className="alert alert-danger ">{passwordError}</p>}
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Login</button>
                </form>
            </main>
            <Footer />
        </>
    )
}