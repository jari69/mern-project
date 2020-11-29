import React, { Component } from 'react'

export class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        };
        this.baseState = this.state;
        
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen(){
        this.setState({ isDialogOpen: !this.state.isDialogOpen});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpen}>+ Create Journal Entry</button>

            </div>
        )
    }
}

export default ProfilePage
