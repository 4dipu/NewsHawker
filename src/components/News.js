import React, { Component } from "react";
import Spinner from "./Spinner";
import Newsitem from "./Newsitem.js";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'us',
    pagesize: 12,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Constructor this side.");
    this.state = {
        page: 1,
      articles: [],
      loading: false,
      totalResults: 0
    };
    document.title = `Newshawker - ${this.props.category}`
  }


  async componentDidMount() {
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=266237be57b947109958fd127054a3e9&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseddata = await data.json()
    console.log(parseddata);
    this.setState({articles: parseddata.articles, 
      totalResults: parseddata.totalResults,
    loading: false})
    this.props.setProgress(100);
  }

  fetchmoredata = async () =>{
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=266237be57b947109958fd127054a3e9&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parseddata = await data.json()
    this.setState({
        articles : this.state.articles.concat(parseddata.articles),
        totalResults: parseddata.totalResults
    })
  }
  
  render() {
    return (
      <div className="container">
        <h1 className='text-center' style={{marginTop:'90px'}}> News Hawker - Top {this.capitalizeFirstLetter(this.props.category)} headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchmoredata}
          hasMore={this.state.articles.length !== this.totalResults}
          // loader = {<Spinner/>}
          >
            <div className="container m-0">
              <div className="row my-4">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <Newsitem
                        title={element.title ? element.title.slice(0, 50) : " "}
                        description={
                          element.description ? element.description.slice(0, 95) : " "
                        }
                        imageurl={element.urlToImage}
                        url={element.url}
                        author={element.author?element.author:"Unknown"}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                )})}
              </div>
              </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
