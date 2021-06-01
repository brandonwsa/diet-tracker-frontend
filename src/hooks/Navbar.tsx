
const Navbar: React.FC<{}> = () => {

    return(
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand me-0 px-3" href="/">Diet Tracker</a>
            <a className="show-all-users me-0 px-3" href="/users/show-all">Show all users</a>
            <a className="show-all-foods me-0 px-3" href="/foods/show-all">Show all foods</a>
            <a className="edit-users me-0 px-3" href="/users/edit">Edit users</a>
            <a className="edit-foods me-0 px-3" href="/foods/edit">Edit foods</a>
            <a className="portfolio me-0 px-3" href="https://brandonwsa.github.io/">My Portfolio</a>
        </header>
    );
}

export default Navbar;