import React from 'react';
import ReactDOM from 'react-dom';
import BlogContainer from './BlogContainer';
import './index.css';
import Actions from './BlogActions';

ReactDOM.render(
  <BlogContainer />,
  document.getElementById('root')
);

setInterval(function(){
  Actions.doIncrement()
  }
,10000);


Actions.fetchArticles();