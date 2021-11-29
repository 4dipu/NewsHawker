import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, url, author, date, source} = this.props;

    return (
      <div>
        <div className="card mb-5 ">
          <div style={{
            display: 'flex',
            justifyContent: "flex-end",
            position: 'absolute',
            right: "0"
          }}>
            <span className="badge rounded-pill bg-danger">
              {source}
            </span>
            </div>
            <img
              src={
                imageurl
                  ? imageurl
                  : "https://techcrunch.com/wp-content/uploads/2021/11/GettyImages-1134831592.jpg?w=600"
              }
              className="card-img-top"
              alt=""
            />
            <div className="card-body ">
              <h5 className="card-title">{title}....</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By {author} on {new Date(date).toLocaleString()}
                </small>
              </p>
              <a
                rel="noreferrer"
                href={url}
                target="_blank"
                className="btn btn-danger"
              >
                Read full article here
              </a>
            </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
