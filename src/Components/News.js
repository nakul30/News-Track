import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  // i can make an update funcion and just all the simlar htings in compnent mound hanlde enxt in that as repention is there 
  // like async Updatenes(){} then i have pass update funcion in hose wriitend funciotn s
  static defaultProps={
    country :"in" , 
    pageSize : 6 , 
    category : 'general'
  }
  static propTypes = {
    country : PropTypes.string ,
    pageSize : PropTypes.number,
    category :PropTypes.string,
  }
  constructor(){
    super() ; 
    console.log("New app constructor is inn ") ; 
    this.state ={ 
      articles : [] , //as i have removed the written articles json else this.aritcles 
      loading : false ,
      page: 1 , 
      totalResults : 0 
    }
  }
  async updateNews(){ 
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f2081417314b18bceb37f613f451e4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true })
    let data = await fetch(url) ;
    let parsedData = await data.json() ;
    console.log(parsedData) ;
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults : parsedData.totalResults 
    }) ;

  }
  // .. works after render 
  async componentDidMount(){
    console.log("cdm") ; 

    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f2081417314b18bceb37f613f451e4&page=1&pageSize=${this.props.pageSize}`;
    
    // let data = await fetch(url) ;
    // let parsedData = await data.json() ;
    // console.log(parsedData) ;
    // this.setState({
    //   articles: parsedData.articles,
    //   loading: false
    // }) ;
    this.updateNews() ; 
  }
  handleNextClick=async()=>{
    console.log("Next") ; 
    // this.setState({loading : true })
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f2081417314b18bceb37f613f451e4&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  
    // let data = await fetch(url) ;
    // this.setState({loading : false })
    // let parsedData = await data.json() ;
    // console.log(parsedData) ;
    // // this.setState({articles: parsedData.articles}) ;
    this.setState({page : this.state.page + 1 })
    this.updateNews() ; 
  }
  handlePrevClick=async()=>{
    // console.log("prev") ; 
    // this.setState({loading:true})
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f2081417314b18bceb37f613f451e4&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
  
    // let data = await fetch(url) ;
    // let parsedData = await data.json() ;
    // this.setState({loading : false })
    // console.log(parsedData) ;
    // // this.setState({articles: parsedData.articles}) ;
    this.setState({
      page : this.state.page - 1 ,
      // articles: parsedData.articles,
    })
    this.updateNews() ; 
  }
  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1 }) 
    // this.updateNews()  it didnt workdd properly just shoeing spiiner for long at bootm 
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f2081417314b18bceb37f613f451e4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true })
    let data = await fetch(url) ;
    let parsedData = await data.json() ;
    console.log(parsedData) ;
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      loading: false ,
      totalResults : parsedData.totalResults 
    }) ;

  };

  render() {
    return (
      <>
      {/* // <div className="container my-3 text-center"> */}
        <h2 className='text-centre'>NewNew - Top Headlines </h2>
        {/* { this.state.loading && <Spinner/> } */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <  this.state.totalResults }
          loader={<Spinner/>}
        >
        <div className="container my-3 text-center">
        <div className="row">
            {this.state.articles.map((element) =>{
              return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title? element.title.slice(0 , 40 ):""} description={element.description?element.description.slice(0 , 77):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
            })}
          </div>
        </div>
          
        </InfiniteScroll>
        {/* <div className=' container d-flex justify-content-between'>
        <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button> 
        <button type="button" class="btn btn-dark"  onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      {/* // </div> */}
</>
    )
  }
}

export default News