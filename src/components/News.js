import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(false);
    const [page, setpage] = useState(1);
    const [total, settotal] = useState(0);
    




    const handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=48dead0adfe2465db1d524ce2e9e731f&page=${page - 1}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(parsedData.articles);
        setloading(false);
        setpage(page - 1);
        settotal(parsedData.totalResults)

    }

    const handleNextClick = async () => {
        if (page + 1 > Math.ceil(total / props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=48dead0adfe2465db1d524ce2e9e731f&page=${page + 1}&pageSize=${props.pageSize}`;
            setloading(true)
            let data = await fetch(url);
            let parsedData = await data.json();
            setarticles(parsedData.articles);
        setloading(false);
        setpage(page + 1);
        settotal(parsedData.totalResults)
        }

    }

    const updateNews=async ()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=48dead0adfe2465db1d524ce2e9e731f&page=1&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles);
        setloading(false);
        settotal(parsedData.totalResults)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News App`;
        updateNews();
    }, [])

    const fetchMoreData = async() => {
        setpage(page+1);
            
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=48dead0adfe2465db1d524ce2e9e731f&page=${page + 1}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        setloading(false);
        settotal(parsedData.totalResults)
        
      };

        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{ margin: "30px",marginTop:"90px" }}>
                    Top Headlines from {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
                </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!=total}
                    loader={<Spinner />}
                >
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 110) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}
                                source={element.source.name} />
                        </div>
                    })}
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={page + 1 > Math.ceil(total / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }


News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News