import './App.css';
import './'
import React from 'react';
import logo from './assets/Pilgrim-header.png';
import './fonts/Cabin/Cabin-SemiBold.otf';
import './fonts/Raleway/Raleway-SemiBold.ttf';
import './fonts/Raleway/Raleway-Regular.ttf';
import './fonts/Raleway/Raleway-Medium.ttf';
import articles from './stubs/articles.json'
import MainBlock from './components/MainBlock';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    
    this.dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };
    this.state = {
      articleItems: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.showArticles()}
      </div>
    );
  }
  
  //Fetch data as JSON
  getData = () => {
    let temp = [];
    articles?.articles.map((item) => {
      temp.push(item);
      return;
    });
    this.setState({ articleItems: temp });
  }

  //Articles
  showArticles = () => {
    let today = new Date();
    let weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    let weekEnd = new Date();
    let tempArticles = this.state.articleItems;
    let articles;
    let title;
    let renderArray = [];
    let key = 0;
    while(tempArticles.length > 0) {
      articles = tempArticles.filter((item) => (new Date(item.date) > weekStart) && (new Date(item.date) <= weekEnd));
      tempArticles = tempArticles.filter( ( item ) => !articles.includes( item ) );
      // console.log("length is " + tempArticles.length)
      title = (today >= weekStart) && (today <= weekEnd) ? "THIS WEEK" : `${weekStart.toLocaleString('en-GB', this.dateFormat)} - ${weekEnd.toLocaleString('en-GB', this.dateFormat)}`;
      renderArray.push(<MainBlock articles={articles} title={title} key={key++}/>);
      // console.log(weekStart + " " + weekEnd);
      weekStart.setDate(weekStart.getDate() - 7);
      weekEnd.setDate(weekEnd.getDate() - 7);
    }
    return renderArray; 
  }
}

export default HomePage;
