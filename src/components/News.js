import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spiner from "./Spiner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  
  static defaultProps = {
    pageSize: 10,
    country:"in",
    category:"general"
  }

  static propTypes={
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  constructor(props) {
    super(props);
    this.state = {
      articles:[],
      loading:false,
      page:1      
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}`
  }

      async updatePage(){
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url)
        this.props.setProgress(30);
        let parsedData=await data.json()
        console.log(parsedData)
        this.props.setProgress(60);
        this.setState({
          articles:parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })
        this.props.setProgress(100);
      }

      fetchMoreData=async()=>{
        this.setState({page:this.state.page+1})
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData)
        this.setState({
          articles:this.state.articles.concat(parsedData.articles),
          totalResults:parsedData.totalResults,
          loading:false
        })
      }
      

      async componentDidMount(){
        this.updatePage();
      }

    //   handlePrev=async()=>{
    //     this.setState({page:this.state.page-1})
    //     this.updatePage();
    //   }

    //   handleNext=async()=>{
    //     this.setState({page:this.state.page+1})
    //     this.updatePage();
    // }

  render() {

    
    console.log("render")
    return (
      
      <div className="container my-5">
        <h2 className="text-center">Today's {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spiner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spiner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <Newsitems
                title={element.title?element.title.slice(0,40):""}
                description={element.description?element.description.slice(0,80):""}
                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}
              />
            </div>
          })}
        </div>
        </div>
        {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrev}> &larr; Previous</button>
        <button disabled ={(this.state.page+1>Math.ceil(this.state.totalResults/20))}type="button" className="btn btn-primary" onClick={this.handleNext}>  Next &rarr;</button>
        </div> */}
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
