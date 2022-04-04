import React, {Component} from "react";
import { userContext } from "../context/user-context";
import Table from './Table';
import AddUser from './AddUser';
import EditUser from "./EditUser";
import Alert from './Alert';
import FlashMessage from "./FlashMessage";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: ''
        }
    }

    handleSearchBoxChange = (event) => {
        let cur_state = this.state;
        let queryName = event.target.value;
        cur_state[event.target.name] = queryName;
        this.setState(cur_state);
        this.context.getAllUsers(queryName);
    }

    static contextType = userContext;
    render() {
        return(
            <>
                <FlashMessage/>
                <Alert/>
                <EditUser/>
                <AddUser/>
                <div className="main">
                    <h1 className="heading">Dashboard</h1>
                    <div className="wrapper">
                        <h2 className="title">
                            User management
                            <span 
                                className="refresh"
                                onClick={() => this.context.getAllUsers(null)}
                            >
                                Refresh
                            </span>
                        </h2>
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
                                name="search_query"
                                value={this.state.search_query}
                                onChange={this.handleSearchBoxChange}
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