import { getByTitle } from '@testing-library/react'
import React from 'react'

const Newsitem =(props)=> {
        let { title, description, imageurl, newsurl, author, date, source } = props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "20rem" }}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                        {source}
                    </span>
                    <img src={imageurl ? imageurl : "https://media.cnn.com/api/v1/images/stellar/prod/220519191436-36-week-in-photos-0519.jpg?c=16x9&q=w_800,c_fill"} className="card-img-top" alt="..." />
                    
                    <div className="card-body">
                        <h5 className="card-title">{title}

                        </h5>

                        <p className="card-text">{description}...</p>
                        <a href={newsurl} target="_blank" className="btn btn-sm btn-dark" >Read More!</a>
                        <p className="card-text"><small>Written by {author ? author : 'unknown'} on {new Date(date).toGMTString()} </small></p>
                    </div>
                </div>
            </div>
        )
    }

export default Newsitem