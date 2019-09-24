import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

// Component defined for single Oauth reference (Not typical Redux conventional practice)
// Google authentication object for console -> gapi.auth2.getAuthInstance()

class GoogleAuth extends React.Component {
    

    componentDidMount() {
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: '188973888228-1q7nmeuplfees3filtl9k5k490jgfpg6.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //Update auth state inside of redux store
                this.onAuthChange(this.auth.isSignedIn.get());
                //Wait for authentication status to change
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
       if(isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId());
       } else {
        this.props.signOut();
       }
    };

    //Defined event handlers for ease-of-reading
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
    )(GoogleAuth);