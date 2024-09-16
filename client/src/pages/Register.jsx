import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Register() {
    return (
        <>
            <Header />
            <main className="form-signin container w-50">
                <form className="row-12">
                    <h1 className="h3 mb-3 fw-normal">Register</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label htmlFor="floatingInput">User name</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Register</button>
                </form>
            </main>
            <Footer />
        </>
    )
}