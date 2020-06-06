import React, { Component } from "react";
import SearchField from "./SearchField";
import "./style.css"
import axios from "axios";
import ReactDOM from 'react-dom';

class Giphy extends Component {
    constructor(props) {
      super(props);

     // NOT SURE IF RIGHT 
     this.state = {        
       gifs: [], 
       searchInput: "",
       currentLink: "http://api.giphy.com/v1/gifs/trending?",       
       limitValue: 20,
       limit: "&limit=20", 
       searchState: "trending",
       serachField: SearchField, 
      };    
    }                  
  

  componentDidMount(){
    axios
    .get(this.state.currentLink + this.state.searchInput +"&api_key=" + 
    process.env.REACT_APP_GIPHY_API_KEY + this.state.limit)
    .then((response) =>{            
        this.setState({gifs:response.data.data});  

        if(this.state.searchState === "trending")
        {
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
                 
    })
    .catch((err) => console.log(err)); //send an error message to the console     
  }


  getJSON = () =>{    
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
        this.setState({gifs: data},
          this.decidePrint);
      })        
    .catch((err) => console.log(err)); //send an error message to the console
  }

  decidePrint = () => {
    if(this.state.searchState === "trending")
    {
      this.printTrendingOrSearchGifs();
    }
    else if(this.state.searchState === "random"){
      this.printRandomSearchGifs();
    }
  }

  printTrendingOrSearchGifs = () => { 
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

  printRandomSearchGifs = () => {         

    let output = []; //output collector
    //map and select query results
    output = (
      <div className="query-result">                
          <div className="query-data-box">
              <div className="gif-image">                        
                  <img src ={this.state.gifs.image_url}/>
              </div>
          </div>         
      </div>);   
    ReactDOM.render(output,
      document.getElementsByClassName("results-output")[0]);
   
  }


 render()
  {
    if(this.state.searchState === "search")
    {
      return(
        <>
        <h1>GIPHY API Accessor</h1>

        <div className = "buttons">           
          <button 
          className="button-find"
          onClick={() => {
            //change everything related to search
            this.setState(
              {
              searchState:"search",                  
              }               
              
              );                    
          }}>
            Find                    
          </button>

          <button 
          className="button-trending"
          onClick={() => {
            this.setState(
              {currentLink:"http://api.giphy.com/v1/gifs/trending?",
              searchState:"trending",
              searchInput: "",
              limit: "&limit=20"
              },             
              this.setGif
              );
                                  
          }}>
            Trending                    
          </button>           

          <button 
          className="button-random"
          onClick={() => {                 
            this.setState(
            {currentLink:"http://api.giphy.com/v1/gifs/random?",
            searchState:"random",
            searchInput: "",
            limit: "",
            limitValue: 20
            },             
            this.setGif
            );          
                                                
          }}>
            Random                    
          </button>
        </div>
        
          
          <div>
             <SearchField/>
          </div>

        </>

      );


      
    }
    else if(this.state.searchState === "trending")
    {
        return(
          <>
          <h1>GIPHY API Accessor</h1>          
            <div className = "buttons">           
              <button 
              className="button-find"
              onClick={() => {
                //change everything related to search
                this.setState(
                  {
                  searchState:"search",                  
                  }               
                  
                  );               
              }}>
                Find                    
              </button>

              <button 
              className="button-trending"
              onClick={() => {
                this.setState(
                  {currentLink:"http://api.giphy.com/v1/gifs/trending?",
                  searchState:"trending",
                  searchInput: "",
                  limit: "&limit=20"
                  },             
                  this.setGif
                  );
                                      
              }}>
                Trending                  
              </button>           

              <button 
              className="button-random"
              onClick={() => {                 
                this.setState(
                {currentLink:"http://api.giphy.com/v1/gifs/random?",
                searchState:"random",
                searchInput: "",
                limit: "",
                limitValue: 20
                },             
                this.setGif
                );          
                                                    
              }}>
                Random                    
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
              <div>Trending GIFs:</div>   
              <br></br> 
              

              
            
            <div className="results-output">
                
            </div>
            
          </>
      );
    }
    else if(this.state.searchState === "random"){
      return(
        <>
          <h1>GIPHY API Accessor</h1>
          <div className = "buttons">           
            <button 
            className="button-find"
            onClick={() => {
              //change everything related to search
              this.setState(
                {
                searchState:"search",                  
                }               
              );                    
            }}>
              Find                    
            </button>

            <button 
            className="button-trending"
            onClick={() => {
              this.setState(
                {currentLink:"http://api.giphy.com/v1/gifs/trending?",
                searchState:"trending",
                searchInput: "",
                limit: "&limit=20"
                },             
                this.setGif
                );
                                    
            }}>
              Trending                    
            </button>           

            <button 
            className="button-random"
            onClick={() => {                 
              this.setState(
              {currentLink:"http://api.giphy.com/v1/gifs/random?",
              searchState:"random",
              searchInput: "",
              limit: ""
              },             
              this.setGif
              );          
                                                  
            }}>
              Random                    
            </button>
          </div>
            
            <div className="limit-field">
              
            </div>
            
            <br></br>
            <div>Random GIF:</div> 
            <br></br>
            
          
          <div className="results-output">
              
          </div>
          
        </>
    );

    }
    

   
    
  }
}

export default Giphy;