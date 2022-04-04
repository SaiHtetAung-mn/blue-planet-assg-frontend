import React, {Component} from 'react';
import { userContext } from '../context/user-context';

class TableDataRow extends Component {
    static contextType = userContext;

    editUser = (id) => {
        this.context.setUserIdToUpdate(id);
        this.context.toggleEditUserModal();
    }

    deleteUser = (id) => {
        this.context.setUserIdToDelete(id);
        this.context.toggleAlertModal();
    }

    render() {
        let user = this.props;
        return(
            <tr>
                <td>1</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>{user.address}</td>
                <td>
                    <button 
                        className='btn btn-table btn-info'
                        onClick={() => this.editUser(user.id)}
                    >
                        Edit
                    </button>
                    <button 
                        className='btn btn-table btn-table-warning'
                        onClick={() => this.deleteUser(user.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default TableDataRow;