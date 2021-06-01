import { useEffect, useState } from "react";
import {User} from "../interfaces/user";


const Users: React.FC<{}> = () => {

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
//    console.log(users);

    return(
        <div className="App-body grid">
            <table className="table table-striped table-sm table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Date Created</th>
                        <th>Date Updated</th>
                    </tr>
                </thead>
                <tbody style={{color: "white"}}>
                    {users.map(
                        (u: User) => {
                            return(
                                <tr key={u.username}>
                                    <td>{u._id}</td>
                                    <td>{u.username}</td>
                                    <td>{u.createdAt}</td>
                                    <td>{u.updatedAt}</td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;