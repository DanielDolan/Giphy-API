import React, { Component } from "react";
import Search from "./SearchField";
import axios from "axios";
import ReactDOM from 'react-dom';

class Giphy extends Component {
    constructor(props) {
      super(props);
     this.state = { 
       gifs: [], 
       searchInput: "hamster" ,
       currentLink:"http://api.giphy.com/v1/gifs/trending?",
       limit: "&limit=20",
       searchState: "trending"
    };
    }                  
  

    componentDidMount(){
        axios
        .get(this.state.currentLink + this.state.searchInput +"&api_key=" + 
        process.env.REACT_APP_GIPHY_API_KEY + this.state.limit)
        .then((response) =>{            
            this.setState({gifs:response.data.data});
            if(this.state.searchState === "trending" || 
            this.state.searchState === "search"){
              this.printTrendingOrSearchGifs();
            }
            else if (this.state.searchState === "random")
            {
            }        
                 
        })
        .catch((err) => console.log(err)); //send an error message to the console 
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