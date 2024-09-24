import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export function Dashboard() {
    const { isLoggedIn, role } = useContext(GlobalContext)
    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="">
                                    <h1>Dashboard</h1>
                                    {role === 'admin' && <Link to='/locations/new'> Add</Link>}
                                </div>
                                <p>page for loged in users</p>
                            </div>

                        </div>
                    </section>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <h1>401</h1>
                            <p>Need to be logged in to view this page </p>
                        </div>
                    </section>
                </main>
            }
            <Footer />
        </>
    )
}