import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export function SecretContent({ dedicatedRole }) {
    const { isLoggedIn, role } = useContext(GlobalContext);
    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Content not reachable</h1>
                        {role !== dedicatedRole &&
                            <p>Need to login as "{dedicatedRole}"</p>
                        }
                        {!isLoggedIn &&
                            <Link to='/login' className="btn btn-primary">Login</Link>
                        }

                    </div>

                </div>


            </main>
        </>
    )
}