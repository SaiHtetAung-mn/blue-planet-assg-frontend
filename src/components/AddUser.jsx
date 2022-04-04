import React, {Component} from 'react';
import {userContext} from '../context/user-context';

class AddUser extends Component {
    static contextType = userContext;
    constructor(props) {
        super(props);

        this.nameRef = React.createRef();
        this.phoneRef = React.createRef();
        this.ageRef = React.createRef();
        this.cityRef = React.createRef();
        this.addressRef = React.createRef();
    }

    addUser = () => {
        let name = this.nameRef.current.value;
        let phone = this.phoneRef.current.value;
        let age = this.ageRef.current.value;
        let city = this.cityRef.current.value;
        let address = this.addressRef.current.value;

        if(!name || !phone || !age || !city || !address) {
            this.context.openFlashMessage("All fields are required", "error");
            return;
        }

        this.context.addUser(name, phone, age, city, address);
    }
    
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
                                    ref={this.nameRef}
                                />
                            </div>
                            <div className="form-gp">
                                <label>Phone number</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter phone number'
                                    ref={this.phoneRef}
                                />
                            </div>
                            <div className="form-gp">
                                <label>Age</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter age'
                                    ref={this.ageRef}
                                />
                            </div>
                            <div className="form-gp">
                                <label>City</label>
                                <input 
                                    type="text" 
                                    className='form-input'
                                    placeholder='Enter city'
                                    ref={this.cityRef}
                                />
                            </div>
                            <div className="form-gp">
                                <label>Address</label>
                                <input 
                                    type="textarea" 
                                    className='form-input'
                                    placeholder='Enter address'
                                    ref={this.addressRef}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className='btn btn-primary'
                                onClick={this.addUser}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUser;