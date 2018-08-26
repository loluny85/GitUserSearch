import React, { Component } from 'react';
import '../styles/search.css';
import Output from './output';
import Fetchdata from '../utilities/fetchData';

class Search extends Component {

    searchInputRef = React.createRef();

    state = {
        searchInput: '', //State of the search input box
        searchOutput: [], //search data response from api
        searchType: '', //1)search all users 2)custom search 3)single user details
        searchResult: true //If any user data fetched or not?
    }

    searchInputChange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    clearSearch = () => {
        this.searchInputRef.current.value = '';
        this.setState({
            searchInput: ''
        })
    }

    checkEnterHit = (e) => {
        if(e.key === 'Enter') {
            this.searchGitUsers();
        }
    }

    searchGitUsers = () => {
        let url;
        this.setState({
            searchOutput: []
        })
        if(this.state.searchInput) {
            url = `https://api.github.com/search/users?q=${this.state.searchInput}`;
            this.setState({
                searchType: 'searchUsers'
            })
        }
        else {
            url = `https://api.github.com/users`;
            this.setState({
                searchType: 'allUsers'
            })
        }
        Fetchdata(url).then((data)=>{
            this.setState({
                searchOutput: data
            })
            if(data.total_count === 0) {
                this.setState({
                    searchResult: false
                })
            }
            else {
                this.setState({
                    searchResult: true
                })
            }
        })
    }

    fetchUser = (evt, userName) => {
        evt.preventDefault();
        let url = `https://api.github.com/users/${userName}`;
        this.setState({
            searchOutput: []
        })
        Fetchdata(url).then((userInfo)=>{
            this.setState({
                searchType: 'singleUser',
                searchOutput: userInfo
            })
        })
    }

    render() {
        return (
            <div className='searchBar'>
                <input type='text' ref={this.searchInputRef} onKeyPress={this.checkEnterHit} placeholder='Github User Search' onChange={this.searchInputChange}/>
                <span className='clearSearch' onClick={this.clearSearch}>x</span>
                <button onClick={this.searchGitUsers}>Search</button>
                <Output fetchUser={this.fetchUser} searchResult={this.state.searchResult} searchType={this.state.searchType} data={this.state.searchOutput}/>
            </div>
        )
    }
}

export default Search;