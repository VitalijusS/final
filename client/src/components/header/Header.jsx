import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/react.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
export function Header() {
    const { isLoggedIn, changeLoginStatus, username, role, likedLocations } = useContext(GlobalContext);
    const navigate = useNavigate();
    function logout() {
        fetch('http://localhost:5020/api/logout', {
            credentials: 'include'
        }).then(() => {
            changeLoginStatus(false);
            navigate('/');
        }).catch(err => console.log(err));
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to='/' className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <Link to='/' className="nav-link px-2 link-secondary">Pagrindinis</Link>
                    </li>
                    <li>
                        <Link to='/locations' className="nav-link px-2 ">Locations</Link>
                    </li>
                    <li>
                        <Link to='/404' className="nav-link px-2 ">404</Link >
                    </li>
                </ul>

                {!isLoggedIn && <div className="col-md-3 text-end">

                    <Link to='/login' className="btn btn-outline-primary me-2">Login</Link>
                    <Link to='/register' className="btn btn-primary">Register</Link>
                </div>}
                {isLoggedIn && <div className="col-md-3 text-end">
                    <p>{username} ({role}) </p>
                    <Link to='/dashboard'>Dashboard ({likedLocations.length})</Link>
                    <button type='button' className="btn btn-outline-primary me-2 ms-2" onClick={logout}>Log out</button>
                </div>}
            </header >
        </div >
    )
}