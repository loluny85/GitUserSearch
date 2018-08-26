import React, { Component } from 'react';
import '../styles/output.css';

class Output extends Component {
    render() {
        let searchOutputData = 'Loading...', userData;
        if(this.props.searchType==='searchUsers') {
           userData = this.props.data.items; 
        }
        else {
            userData = this.props.data; //for searchType is allUsers or singleUser
        }
        if(userData) {
            if(this.props.searchType==='singleUser') {
                searchOutputData = ( //Show single user details
                    <div>
                        <img src={userData.avatar_url} alt={userData.avatar_url} className='profilePic'/>  
                        <ul>
                            <h1>Name: {userData.name}</h1>
                            <li>Followers:{userData.followers} Following:{userData.following}</li>
                            <li>Company: {userData.company}</li>
                            <li>Location: {userData.location}</li>
                        </ul>
                    </div>
                );
             }
        else {
            searchOutputData = 
                    userData.map((user)=>{
                        return ( //Show list of git users
                            <div key={user.id}>
                                <img src={user.avatar_url} alt={user.avatar_url} className='listIcon'/>
                                <a href={user.login} onClick={(evt)=>this.props.fetchUser(evt, user.login)}>{user.login}</a>
                            </div>
                        )
                    })
            }
        }

        if(this.props.searchResult === false) {
            searchOutputData = 'No users available';
        }
        
        return (
           <div className='searchResult'>
                {searchOutputData}
           </div>
        )
    }
}

export default Output;