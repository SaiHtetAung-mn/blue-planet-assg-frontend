import React, {Component} from "react";

let userContext = React.createContext();

class UserContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1, 
                    name: "Sai Htet Aung", 
                    phone: "09267030245", 
                    age: 22,
                    city: "Yangon",
                    address: "No(70), Kyimyindaing"
                }
            ],
            modal: {
                isAddModalOpen: false,
                isEditModalOpen: false,
                isAlertModalOpen: false
            }
        };
        this.user_id_to_delete = null;
        this.user_id_to_update = null;
    }

    addUser = (name, phone, age, city, address) => {
        this.toggleAddUserModal();
    }

    updateUser = (id, name, phone, age, city, address) => {
        alert(name);
        this.toggleEditUserModal();
    }

    deleteUser = () => {
        alert(this.user_id_to_delete);
        this.toggleAlertModal();
    }

    setUserIdToDelete = (id) => {
        this.user_id_to_delete = id;
    }

    setUserIdToUpdate = (id) => {
        this.user_id_to_update = id;
    }

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
            addUser: this.addUser,
            updateUser: this.updateUser,
            deleteUser: this.deleteUser,
            setUserIdToDelete: this.setUserIdToDelete,
            setUserIdToUpdate: this.setUserIdToUpdate,
            getInitialValuesToUpdate: this.getInitialValuesToUpdate,
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