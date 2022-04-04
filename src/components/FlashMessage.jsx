import React, {Component} from "react";
import {userContext} from '../context/user-context';

class FlashMessage extends Component {
    static contextType = userContext;
    render() {
        let style_class = "flash-msg-wrapper ";
        style_class += this.context.flash_type == "success" ? 
            "success-flash-msg" : "warning-flash-msg";
        let style = this.context.modal.isFlashOpen ? {top: 0} : {top: "-100%"};
        return(
            <div className={style_class} style={style}>
                <h4>{this.context.flash_message}</h4>
            </div>
        )
    }
}

export default FlashMessage;