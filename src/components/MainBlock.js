import '../styles/MainBlock.css'
import React from 'react';
import '../fonts/Cabin/Cabin-SemiBold.otf';
import '../fonts/Raleway/Raleway-SemiBold.ttf';
import '../fonts/Raleway/Raleway-Regular.ttf';

class MainBlock extends React.Component {
  constructor(props){
    super(props);
    
    this.articles = this.props.articles;
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
        <div className="body font-face-cabinSB">
          <p className="parentTitle">{this.props.title}</p>
          <div className="parentContainer">
            <div className="tagContainer">
              {this.showTags()}
            </div>
            {this.state.enabledTags.length > 0 ? this.showArticles() : this.showEmptyContent()}
          </div>
        </div>
    );
  }
  
  //Fetch data as JSON
  getData = () => {
    let temp = [];
    let tempTags = [];
    let tempEnable = [];
    this.articles?.map((item) => {
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
    this.setState({ articleItems: temp, tagItems: tempTags, enabledTags: tempEnable });
  }

  //Tags
  showTags = () => {
      let key = 0;
    return this.state.tagItems.map((item) => <TagItem onClick={() => this.onTagClick(item)} tag={item.tag} enabled={item.enabled} key={key++}/>);
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
  }

  //Articles
  showArticles = () => {
      let key = 0;
    return this.state.articleItems
    .filter((item) => item.tags.some(tag => this.state.enabledTags.includes(tag)))
    .map((item) => <ArtItem url={item.url} title= {item.title} img={item.img} content={item.content} key={key++}/>);
  }

  //Incase no tags selected
  showEmptyContent = () => {
    return <p className="noTagsText font-face-raleway">select a tag to show content</p>
  }
}

class ArtItem extends React.Component {
  render() {
    return <div className="artContainer" onClick={() => window.open(this.props.url, "_blank")}>
      <img src={this.props.img} className='artImage' alt={"article header"}/>
      <p className="artTitle font-face-ralewaySB">{this.props.title}</p>
      <p className="artContent font-face-raleway">{this.props.content}</p>
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

export default MainBlock;
