import React, { Component } from "react";
import Search from "./SearchField";
import axios from "axios";
import ReactDOM from 'react-dom';

class Giphy extends Component {
    constructor(props) {
      super(props);
     // NOT SURE IF RIGHT 
     this.state = { 
       word: "", 
       giphs: [], 
       searchInput: "Funny cats" };
    }                  
  

  componentDidMount(){
    axios
    .get("http://api.giphy.com/v1/gifs/search?q=" + this.state.searchInput +"&api_key=" + 
    process.env.REACT_APP_GIPHY_API_KEY +"&limit=20")
    .then((response) =>{            
        this.setState({giphs:response.data.data});
        let output = []; //output collector

        //map and select query results
        output = response.data.data.map(gvalue => 
        <div className="query-result">                
            <div className="query-data-box">
                <div className="gif-image">
                    <img src ={gvalue.images.original.url}/>
                </div>
            </div>         
        </div>);   
        ReactDOM.render(output,
          document.getElementsByClassName("results-output")[0]);        
    })
    .catch((err) => console.log(err)); //send an error message to the console 
  }


  printGiphs = () => {        
       
    let output = []; //output collector

    //map and select query results
    output = this.state.giphs.map(gvalue => 
    <div className="query-result">                
        <div className="query-data-box">
            <div className="query-data">
                <div>{console.log(gvalue)}</div>
            </div>
        </div>         
    </div>);       
    
    //render query results
    ReactDOM.render(
        output,
        document.getElementsByClassName("results-output")[0]
    );
  }

  render()
  {
    return(
        <>
          <div>           
            <button
                        className="button-find"
                        onClick={() => {
                            this.componentDidMount();                        
                        }}
                        >
                        Find
                    </button>
          </div>
          <div className="results-output">

          </div>
          
        </>
    );
  }
}

export default Giphy;