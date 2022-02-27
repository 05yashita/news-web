import React, { Component } from "react";

export class Newsitems extends Component {
    
  render() {
    
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
        <>
      <div className="container">
        <div className="card my-3" >
        <img src={!imageUrl?'https://images.moneycontrol.com/static-mcnews/2021/03/Trading-770x433.jpg':imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}... <span className="badge rounded-pill bg-secondary">{source}</span></h5>
            <p className="card-text">{description}
              some quick example text to build on the card title and make up the
              bulk of the card's content.</p>
              <p><small className="text-muted"><strong>Author :</strong> {author} <br /> {new Date(date).toGMTString()}</small></p>
             
            <a rel="noreferrer"  href={newsUrl} target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Newsitems;
