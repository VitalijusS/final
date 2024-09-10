import style from './Header.module.css'
export function Header() {
    return (
        <header className={style.mainHeader}>
            <img className={style.logo} src="#" alt="Logo" />
            <nav className={style.mainNav}>
                <a className={style.link} href="/">Home</a>
                <a className={style.link} href="/">Home</a>
                <a className={style.link} href="/">Home</a>
                <a className={style.link} href="/">Home</a>
            </nav>
        </header>
    )
}