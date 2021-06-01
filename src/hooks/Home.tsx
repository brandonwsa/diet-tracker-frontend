

const Home: React.FC<{}> = () => {

    return(

        <div className="App-body">
            <h2>Welcome to Diet Tracker!</h2>

            <div className="content-section">
            <a href="/users/new" className="btn btn-secondary">Create New Username</a>
            </div>

            <div className="content-section">
            <a href="/foods/new" className="btn btn-secondary">Add New Food</a>
            </div>
        </div>

    );
}

export default Home;