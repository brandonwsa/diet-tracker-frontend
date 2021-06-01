import { FormEvent, useState } from 'react';
import {User} from '../interfaces/user';

const UpdateUser: React.FC<{user: User | undefined}> = ({children, user}) => {

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitSuccess(false);
        setNewUsername(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //do what we define here instead of what it normally does.

        if (newUsername?.length < 3){
            alert("Please enter a valid username 3 characters or longer.");
        }
        else {
            //make the PUT request
            const putUser = async () => {
                const url: string = "http://localhost:5000/users/update/"+user?._id;
                const settings: {} = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: newUsername})
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
                    alert("Error when updating username.");
                }
                
            }

            putUser();      
            
            //wait a few seconds then redirect back to same page
            setTimeout(() => {
                window.location.replace('/users/edit');
            }, 1000);
   
        }
        
    }

    return(
        <div>
            <div className="content-section">
                {submitSuccess === true ? (
                        <h3>Username {user?.username} updated to {newUsername}!</h3>
                ):(
                    <div className="content-section">
                        <form onSubmit={handleSubmit}>
                            <label>Enter Username:
                                <input type="text" className="form-control" required value={newUsername} onChange={e => handleChange(e)}/>
                            </label>
                            <input className="form-control" type="submit" value="Update"/>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UpdateUser;