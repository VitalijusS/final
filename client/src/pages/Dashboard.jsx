import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";

export function Dashboard() {
    const { isLoggedIn } = useContext(GlobalContext)
    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <h1>Dashboard</h1>
                    <p>page for loged in users</p>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <h1>401</h1>
                    <p>Need to be logged in to view this page </p>
                </main>
            }
            <Footer />
        </>
    )
}