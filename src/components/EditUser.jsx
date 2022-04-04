import React, {Component} from 'react';
import {userContext} from '../context/user-context';

let did_modal_open = false;

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            phone: '',
            age: '',
            city: '',
            address: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    static contextType = userContext;

    handleOnChange(event) {
        let cur_value = this.state;
        cur_value[event.target.name] = event.target.value;
        this.setState(cur_value);
    }

    setInitialValues = () => {
        let user = this.context.getInitialValuesToUpdate();
        if(Object.keys(user).length > 0) {
            this.state = {
                id: user.id,
                name: user.name,
                phone: user.phone,
                age: user.age,
                city: user.city,
                address: user.address
            }
        }
    }

    updateUser = () => {
        if(!this.state.name || !this.state.phone || !this.state.age || !this.state.city || !this.state.address) {
            this.context.openFlashMessage("All fields are required", "error");
            return;
        }
        this.context.updateUser(
            this.state.id,
            this.state.name,
            this.state.phone,
            this.state.age,
            this.state.city,
            this.state.address
        )
    }

    closeModal = () => {
        did_modal_open = false;
        this.context.toggleEditUserModal();
    }

    render() {
        const style = this.context.modal.isEditModalOpen ? {display: 'block'} :
            {display: 'none'};

        if(this.context.modal.isEditModalOpen && !did_modal_open) {
            this.setInitialValues();
            did_modal_open = true;
        }

        return(
            <div className="modal-wrapper" style={style}>
                <div className="modal-form-wrapper">
                    <div className="modal">
                        <div className="modal-header">
                            <h3 className="modal-title">Add new user</h3>
                            <span 
                                className="modal-close" 
                                onClick={this.closeModal}
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
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="form-gp">
                                <label>Phone number</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter phone number'
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="form-gp">
                                <label>Age</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter age'
                                    name="age"
                                    value={this.state.age}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="form-gp">
                                <label>City</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter city'
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="form-gp">
                                <label>Address</label>
                                <input 
                                    type="textarea" 
                                    className='form-input'
                                    placeholder='Enter address'
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className='btn btn-primary'
                                onClick={this.updateUser}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditUser;