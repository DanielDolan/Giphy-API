import React, { Component } from "react";
import axios from "axios";
class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            results: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.ActionLink = this.ActionLink.bind(this);
    }
    
    ActionLink(e) {
        e.preventDefault();
        const searchInput = this.state.term;
        const API_Key = process.env.REACT_APP_GIPHY_API_KEY;
        const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_Key}&limit=9`;
        axios
            .get(url)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({
                    results: data.data
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(e) {
        this.setState({
            term: e.target.value,
        });
    }
    render() {
        let display;
        if (!this.state.term) {
            display = <></>;
        } else {
            display = (
                <>
                    <div>
                        {this.state.results.map((gif, index) => {
                            return (<video key={index} loop autoPlay>
                                <source src={gif.images.looping.mp4} alt="gifImage"
                                    width={250} height={250} />
                            </video>);
                        })}
                    </div>
                </>
            );
        }
        return (
            <div>
                <input
                    type="text"
                    name="term"
                    defaultValue={this.state.term}
                    onChange={(e) => this.handleChange(e)} >
                </input>
                <button onClick={this.ActionLink}>
                    Search
                </button>
                <div className="term">{display}</div>
            </div>
        );
    }
}
export default SearchCard;
