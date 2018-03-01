import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class StockNews extends Component {
    
    state = {
        showMore: false
    }
    
    render() {
        
        return (
            <div>
                {this.props.newsReady ? 

                    this.props.news.slice(1, 10).map((item => {
                        return <div>
                        
                        <div><Link to={`${item.url}`}>{item.title}</Link></div>
                        <div>{item.summary}</div>
                        
                        
                        </div>
                    }))
                : 
                null
                }
            </div>
        );
    }
}

export default StockNews;