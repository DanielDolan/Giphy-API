import React, {Component} from "react";
import axios from "axios";
import "./style.css"
import ReactDOM from 'react-dom';

class SearchField extends Component {
  constructor(props){
    super(props);
    this.state = {        
      gifs: [], 
      searchInput: "",
      currentLink: "http://api.giphy.com/v1/gifs/search?q=",       
      limitValue: 20,
      limit: "&limit=20", 
      searchState: "trending",
      serachField: SearchField, 
     }; 
    
  }

  search= () => {
    return this.state.query;
  };
  
  getJSON = () =>{
    console.log(this.state.currentLink + this.state.searchInput +"&api_key=" + 
    process.env.REACT_APP_GIPHY_API_KEY + this.state.limit);
    return axios.get(this.state.currentLink + this.state.searchInput +"&api_key=" + 
    process.env.REACT_APP_GIPHY_API_KEY + this.state.limit).then(
      response => {
        return response.data.data;
      }
    )    
  }

  setGif = () =>{
    ReactDOM.render((<div>Loading...</div>),
      document.getElementsByClassName("results-output")[0]);
    this.getJSON().then(
      data => {
        console.log(data);        
        this.setState({gifs: data},
          this.printTrendingOrSearchGifs);
      })       
    .catch((err) => console.log(err)); //send an error message to the console
  }

  printTrendingOrSearchGifs = () => { 
    ReactDOM.render((<div>Loading...</div>),
      document.getElementsByClassName("results-output")[0]);
    let output = []; //output collector
    //map and select query results
    output = this.state.gifs.map(gvalue => 
      <div className="query-result">                
          <div className="query-data-box">
              <div className="gif-image">
                  <img src ={gvalue.images.original.url}/>
              </div>
          </div>         
      </div>);   
    ReactDOM.render(output,
      document.getElementsByClassName("results-output")[0]);
        
  }

  render(){
    return(
      <> 
      <div>
      <label className="limit-text">Search: </label>
      <input className="search-prompt-line" 
              type="text" 
              onChange={(event) => this.setState({ 
                searchInput: event.target.value                
              },
              
              )}             
              placeholder={this.state.searchInput}
              />
            <button 
            className="button-search" 
            onClick={() => {               
              this.setGif();                              
                                                                
            }}>
              Go                    
            </button>
          
      </div>         
          
          <div className="limit-field">
            <label className="limit-text">Limit Results: </label>
            <input
              className="display-prompt-line" 
              type="text" 
              onChange={(event) => this.setState({ 
                limitValue: event.target.value                
              })}             
              placeholder={this.state.limitValue}
            />

            <button 
            className="button-limit" 
            onClick={() => { 
              this.setState({limit: "&limit=" + this.state.limitValue},
              this.setGif  
              );                
                                                                
            }}>
              Go                    
            </button>
          </div>
          

          <div>Search Results: </div>  
        
        <div className="results-output">
            
        </div>
        
      </>
  );
  }


}

export default SearchField;