import {useEffect, useState } from "react";
import {User} from "../interfaces/user";
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';


/**
 * Update or delete a user.
 * @returns html render
 */
const EditUser: React.FC<{}> = () => {


    const [changeUsername, setChangeUsername] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);

    const [user, setUser] = useState<User | undefined>({
        _id: "",
        username: "",
        createdAt: "",
        updatedAt: ""
    });

    const [users, setUsers] = useState<User[]>([{
        _id: "",
        username: "",
        createdAt: "",
        updatedAt: ""
    }]);

    useEffect(() => {
        const getUsers = async () => {
            const url: string = "http://localhost:5000/users/";
            const response: any = await fetch(url)
            const data = await response.json();
            

            setUsers(data);
            
        }
        
        getUsers();
        
        
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        //get the user from the users array
        const selectedUser: User | undefined = users.find(u => u._id === event.target.value);

        setUser(selectedUser);
    }

    const changeUsernameButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (changeUsername === false){
            setChangeUsername(true);
        }
        else {
            setChangeUsername(false);
        }
    }

    const deleteUserButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (deleteUser === false){
            setDeleteUser(true);
        }
        else {
            setDeleteUser(false);
        }
    }

    return (
        <div className="App-body">
            
            <h3>Select a user</h3>

            <div className="content-section">
                <select className="btn btn-secondary btn-sm btn-outline-dark dropdown-toggle" onChange={(e) => handleChange(e)}>
                    <option defaultValue=""></option>
                    {users.map(
                        (u: User) =>{
                            return(
                                <option key={u._id} value={u._id}>{u.username}</option>
                            );
                        }
                    )}
                    
                </select> 
            </div>

            <div className="content-section-user">
                <h3>ID: {user?._id}</h3> 
                <h3>Username: {user?.username}</h3>
                <h3>Date Created: {user?.createdAt}</h3>
                <h3>Date Updated: {user?.updatedAt}</h3>
            </div>

            <div>
                <button className="button-align btn btn-secondary" onClick={(e) => changeUsernameButtonClick(e)}>Change Username</button>
                <button className="button-align btn btn-danger" onClick={(e) => deleteUserButtonClick(e)}>Delete User</button>
            </div>

            <div>
                {changeUsername === true ? (
                    <UpdateUser user={user}/>
                ) : (
                    <div>
                        {deleteUser === true ? (
                            <div>
                                <DeleteUser user={user} />
                            </div>
                        ) : (
                            <div>
                            </div> 
                        )}
                    </div>
                )}
                
            </div>
            
        </div>
    );
}

export default EditUser;