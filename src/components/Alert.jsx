import React, {Component} from "react";
import {userContext} from '../context/user-context';

class Alert extends Component {
    static contextType = userContext;
    render() {
        const style = this.context.modal.isAlertModalOpen ? 
            {display: 'block'} : 
            {display: 'none'};
        return(
            <div className="modal-wrapper" style={style}>
                <div className="modal-form-wrapper">
                    <div className="modal alert-modal">
                        <div className="modal-header">
                            <h3 className="alert-title">Alert</h3>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure delete this user?</p>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-danger"
                                onClick={this.context.deleteUser}
                            >
                                Yes
                            </button>
                            <button 
                                className="btn btn-close" 
                                onClick={this.context.toggleAlertModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alert;