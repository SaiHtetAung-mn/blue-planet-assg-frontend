import React, {Component} from 'react';
import {userContext} from '../context/user-context';

class AddUser extends Component {
    static contextType = userContext;
    
    render() {
        const style = this.context.modal.isAddModalOpen ? 
            {display: 'block'} : 
            {display: 'none'};

        return(
            <div className="modal-wrapper" style={style}>
                <div className="modal-form-wrapper">
                    <div className="modal">
                        <div className="modal-header">
                            <h3 className="modal-title">Add new user</h3>
                            <span 
                                className="modal-close" 
                                onClick={this.context.toggleAddUserModal}
                            >
                                &times;
                            </span>
                        </div>
                        <div className="modal-body">
                            <div className="form-gp">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter Name'
                                />
                            </div>
                            <div className="form-gp">
                                <label>Phone number</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter phone number'
                                />
                            </div>
                            <div className="form-gp">
                                <label>Age</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter age'
                                />
                            </div>
                            <div className="form-gp">
                                <label>City</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter city'
                                />
                            </div>
                            <div className="form-gp">
                                <label>Address</label>
                                <input 
                                    type="textarea" 
                                    className='form-input'
                                    placeholder='Enter address'
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-primary'>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUser;