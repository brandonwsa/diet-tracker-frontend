import { useState } from 'react';
import {User} from '../interfaces/user';

const DeleteUser: React.FC<{user: User | undefined}> = ({children, user}) => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {

        //make the DELETE request
        const deleteUser = async () => {
            const url: string = "http://localhost:5000/users/delete/"+user?._id;
            const settings: {} = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            };

            try {
                const response = await fetch(url, settings);

                //if successfully added username
                if (response.ok){
                    setConfirmDelete(true);
                }
                else {
                    alert("User couldnt be deleted.");
                }

            } catch (error) {
                setConfirmDelete(false);
                alert("Error when deleting user.");
            }
            
        }

        deleteUser();

        //wait a few seconds then redirect back to same page
        setTimeout(() => {
            window.location.replace('/users/edit');
        }, 1000);
        

    }

    return(
        <div>
            {confirmDelete === false ? (
                <div className="content-section">
                    <button className="button-align btn btn-danger" onClick={handleDelete}>Delete Now!</button>
                </div>
            ) : (
                <div className="content-section">
                    <h3>User Deleted!</h3>
                </div>
            )}
        </div>
        
    );

}
export default DeleteUser;