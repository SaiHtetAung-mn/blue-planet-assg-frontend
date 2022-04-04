import React, {Component} from 'react';
import {userContext} from '../context/user-context';
import TableDataRow from './TableDataRow';

class Table extends Component {
    static contextType = userContext;

    render() {
        return(
            <table className='table' border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Phone no</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.context.users.map(user => {
                            return <TableDataRow {...user} key={user.id}/>
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Table;