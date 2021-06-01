import {FormEvent, useState} from "react";


const NewUser: React.FC<{}> = () => {

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [user, setUser] = useState<{username: string}>({
        username: ""
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitSuccess(false);
        setUser({
            username: event.target.value
        });
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //do what we define here instead of what it normally does.

        if (user.username.length < 3){
            alert("Please enter a valid username 3 characters or longer.");
        }
        else {
            //make the POST request
            const postUser = async () => {
                const url: string = "http://localhost:5000/users/add";
                const settings: {} = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                };

                try {
                    const response = await fetch(url, settings);

                    //if successfully added username
                    if (response.ok){
                        setSubmitSuccess(true);
                    }

                    //if username already exists
                    if ((await response.text()).includes("Error: MongoError: E11000 duplicate key error collection: diet-tracker-db.users index: username_1 dup key:")){
                        alert("Username already exists.");
                    }

                } catch (error) {
                    setSubmitSuccess(false);
                    alert("Error when making new username.");
                }
                
            }

            postUser();       
   //         window.location.replace('/'); //navigate to home page
        }
        
    }



    return(
        <div className="App-body">
            {submitSuccess === true ? (
                <div>
                    <h3>Username {user.username} added!</h3>
                </div>
            ):(
                <div>
                    <h3>Add a new user!</h3>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>Enter Username:
                    <input type="text" className="form-control" required value={user.username} onChange={e => handleChange(e)}/>
                </label>
                <input className="form-control" type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default NewUser;