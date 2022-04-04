import React, {Component} from "react";
import { userContext } from "../context/user-context";
import Table from './Table';
import AddUser from './AddUser';
import EditUser from "./EditUser";
import Alert from './Alert';

class Home extends Component {
    static contextType = userContext;
    render() {
        return(
            <>
                <Alert/>
                <EditUser/>
                <AddUser/>
                <div className="main">
                    <h1 className="heading">Dashboard</h1>
                    <div className="wrapper">
                        <h2 className="title">User management</h2>
                        <div className="section">
                            <button 
                                className="btn btn-primary"
                                onClick={this.context.toggleAddUserModal}
                            >
                                New user
                            </button>
                            <input 
                                type="search" 
                                className="user-search-box"
                                placeholder="Search user..."
                            />
                        </div>
                        <div className="table-wrapper">
                            <Table/>
                        </div>
                    </div>
                </div>
            </> 
        )
    }
}

export default Home;