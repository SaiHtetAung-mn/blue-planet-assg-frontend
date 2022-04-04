import React, {Component} from "react";

let userContext = React.createContext();

class UserContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modal: {
                isAddModalOpen: false,
                isEditModalOpen: false,
                isAlertModalOpen: false,
                isFlashOpen: false
            }
        };
        this.user_id_to_delete = null;
        this.user_id_to_update = null;
        this.req_url = `/api/users`;
        this.flash_message = '';
        this.flash_type = '';
    }

    componentDidMount() {
        this.getAllUsers(null);
    }

    getAllUsers = async (query) => {
        let url = `${this.req_url}`;
        if(query) {
            url += `?query=${query}`;
        }
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }
        let res = await fetch(url, options);
        if(res.status >= 200 && res.status < 300) {
            const users = await res.json();
            let cur_state = this.state;
            cur_state.users = users;
            this.setState(cur_state);
        }
        else {
            const err_message = (await res.json()).error?.message || 'Server error';
            this.openFlashMessage(err_message, "error");
        }
    }

    addUser = async (name, phone, age, city, address) => {
        const new_user = {name, phone, age, city, address};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_user)
        }
        let res = await fetch(this.req_url, options);
        if(res.status >= 200 && res.status < 300) {
            let user = await res.json();
            let cur_state = this.state;
            cur_state.users.push(user);
            cur_state.modal.isAddModalOpen = false;
            this.setState(cur_state);
            this.openFlashMessage("One user added successfully", "success");
        }
        else {
            let err_message = (await res.json()).error?.message || 'Server error';
            this.openFlashMessage(err_message, "error");
        }
    }

    updateUser = async (id, name, phone, age, city, address) => {
        const user = {id, name, phone, age, city, address};
        const url = `${this.req_url}/${id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        let res = await fetch(url, options);
        if(res.status >= 200 && res.status < 300) {
            let user = await res.json();
            console.log(user);
            let cur_state = this.state;
            cur_state.users = cur_state.users.map(u => {
                if(u.id == id) {
                    u = user;
                }
                return u;
            });
            cur_state.modal.isEditModalOpen = false;
            this.setState(cur_state);
            this.openFlashMessage("Updated user successfully", "success");
        }
        else {
            let err_message = (await res.json()).error?.message;
            this.openFlashMessage(err_message, "error");
        }
        // reset to null
        this.user_id_to_update = null;
    }

    deleteUser = async () => {
        let url = `${this.req_url}/${this.user_id_to_delete}`;
        let options = {
            method: 'DELETE'
        };
        let res = await fetch(url, options);
        if(res.status >= 200 && res.status < 300) {
            let cur_state = this.state;
            cur_state.users = cur_state.users.filter(u => {
                return u.id != this.user_id_to_delete;
            });
            this.setState(cur_state);
            this.openFlashMessage("Deleted one user successfully", "success");
        }
        else {
            let err_message = (await res.json()).error?.message || 'Server error';
            this.openFlashMessage(err_message, "error");
        }

        this.toggleAlertModal();

        // reset to null
        this.user_id_to_delete = null;
    }

    openFlashMessage = (message, type) => {
        this.flash_message = message;
        this.flash_type = type;
        let cur_state = this.state;
        cur_state.modal.isFlashOpen = true;
        this.setState(cur_state);

        setTimeout(this.closeFlashMessage, 3000);
    }

    closeFlashMessage = () => {
        this.flash_message = '';
        let cur_state = this.state;
        cur_state.modal.isFlashOpen = false;
        this.setState(cur_state);
    }

    // called when user click delete button on particular record row
    setUserIdToDelete = (id) => {
        this.user_id_to_delete = id;
    }

    // called when user click edit button on particular record row
    setUserIdToUpdate = (id) => {
        this.user_id_to_update = id;
    }

    // called when user click edit button on particular record row and set 
    // initial values to fields on edit modal box
    getInitialValuesToUpdate = () => {
        if(this.user_id_to_update === null) {
            return {};
        }
        else {
            let user_to_update = this.state.users.filter(user => {
                return user.id === this.user_id_to_update;
            });

            return user_to_update.length > 0 ? user_to_update[0] : {};        
        }
    }

    toggleAlertModal = () => {
        let {modal, ...rest}  = this.state;
        modal.isAlertModalOpen = !modal.isAlertModalOpen;
        this.setState({...rest, modal});
    }

    toggleAddUserModal = () => {
        let cur_state = this.state;
        cur_state.modal.isAddModalOpen = !cur_state.modal.isAddModalOpen;
        this.setState(cur_state);
    }

    toggleEditUserModal = () => {
        let {modal, ...rest}  = this.state;
        modal.isEditModalOpen = !modal.isEditModalOpen;
        this.setState({...rest, modal});
    }

    render() {
        const data = {
            users: this.state.users,
            modal: this.state.modal,
            flash_message: this.flash_message,
            flash_type: this.flash_type,
            getAllUsers: this.getAllUsers,
            addUser: this.addUser,
            updateUser: this.updateUser,
            deleteUser: this.deleteUser,
            setUserIdToDelete: this.setUserIdToDelete,
            setUserIdToUpdate: this.setUserIdToUpdate,
            getInitialValuesToUpdate: this.getInitialValuesToUpdate,
            openFlashMessage: this.openFlashMessage,
            toggleAlertModal: this.toggleAlertModal,
            toggleAddUserModal: this.toggleAddUserModal,
            toggleEditUserModal: this.toggleEditUserModal
        };

        return(
            <userContext.Provider value={data}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}

export {userContext, UserContextProvider};