import './App.css';
import React from 'react';
import logo from './assets/Pilgrim-header.png';
import './fonts/Cabin/Cabin-SemiBold.otf';
import './fonts/Raleway/Raleway-SemiBold.ttf';
import './fonts/Raleway/Raleway-Regular.ttf';
import articles from './stubs/articles.json'

class HomePage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      tagItems: [],
      enabledTags: [],
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
          {/* <p className="text-logo">Pilgrim</p> */}
        </header>
        <div className="body font-face-cabinSB">
          <p className="parentTitle">THIS WEEK</p>
          <div className="parentContainer">
            <div className="tagContainer">
              {this.showTags()}
            </div>
            {this.state.enabledTags.length > 0 ? this.showArticles() : this.showEmptyContent()}
          </div>
        </div>
      </div>
    );
  }
  
  //Fetch data as JSON
  getData = () => {
    let temp = [];
    let tempTags = [];
    let tempEnable = [];
    articles?.articles.map((item) => {
      console.log('article item = ' + JSON.stringify(item))
      temp.push(item);
      item.tags.map((tag) => {
        if (!(tempTags.filter((item) => item.tag == tag).length > 0)) {
          tempTags.push({tag: tag, enabled: true});
          tempEnable.push(tag);
        }
        return;
      })
      return;
    });
    console.log(temp);
    this.setState({ articleItems: temp, tagItems: tempTags, enabledTags: tempEnable });
  }

  //Tags
  showTags = () => {
    console.log('tags are ' + JSON.stringify(this.state.tagItems));
    return this.state.tagItems.map((item) => <TagItem onClick={() => this.onTagClick(item)} tag={item.tag} enabled={item.enabled}/>);
  }

  onTagClick = (tagItem) => {
    let temp = this.state.enabledTags;
    let tempTags = this.state.tagItems;
    let index = temp.indexOf(tagItem.tag);
    tempTags.forEach((item) => {
      if(item.tag == tagItem.tag) {
        item.enabled = !item.enabled;
      }
    })
    if(index > -1){
      temp.splice(index, 1)
    }
    else {
      temp.push(tagItem.tag);
    }
    this.setState({enabledTags: temp, tagItems: tempTags});
    console.log("enabled = " + temp);
  }

  //Articles
  showArticles = () => {
    return this.state.articleItems
    .filter((item) => item.tags.some(tag => this.state.enabledTags.includes(tag)))
    .map((item) => <ArtItem url={item.url} title= {item.title} img={item.img} />);
  }

  //Incase no tags selected
  showEmptyContent = () => {
    return <p className="noTagsText font-face-raleway">select a tag to show content</p>
  }
}

class ArtItem extends React.Component {
  render() {
    return <div className="artContainer" onClick={() => window.open(this.props.url, "_blank")}>
      <img src={this.props.img} className='artImage' />
      <p className="artTitle font-face-ralewaySB">{this.props.title}</p>
      <p className="artContent font-face-raleway">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  }
}

class TagItem extends React.Component {
  render() {
    return <div onClick={this.props.onClick}   className={(this.props.enabled ? "tagItemEnabled " : "tagItemDisabled ") + "font-face-ralewaySB"}>
      <p style={{margin: 0}}>{this.props.tag}</p>
    </div>
  }
}

export default HomePage;
