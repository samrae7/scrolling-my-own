import React, { Component } from "react";

import "./Scroller.css";

class Scroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      outfitsPageCount: 1
    };
    this.scrollContainerRef = React.createRef();
    this.fetchOutfits = this.fetchOutfits.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  get paginatedUrl() {
    return `https://www.thread.com/api/winter-outfits/98/${
      this.state.outfitsPageCount
    }`;
  }

  componentDidMount() {
    this.fetchOutfits();
  }

  fetchOutfits() {
    fetch(this.paginatedUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ outfits: [...this.state.outfits, ...data.outfits] });
      });
  }

  isScrolledToBottom({ scrollTop, clientHeight, scrollHeight }) {
    return scrollTop + clientHeight >= scrollHeight;
  }

  handleScroll() {
    if (this.isScrolledToBottom(this.scrollContainerRef.current)) {
      this.setState({
        outfitsPageCount: (this.state.outfitsPageCount += 1)
      });
      this.fetchOutfits();
    }
  }

  render() {
    const outfitsToRender = [];
    this.state.outfits.forEach((outfit, index) => {
      outfitsToRender.push(
        <div key={index}>
          <div>
            {outfit.items.map((item, index) => {
              return (
                <div key={index}>
                  <h5>{item.name}</h5>
                  <img src={item.image_url} alt={item.name} />
                </div>
              );
            })}
          </div>
          <div>
            <h3>{outfit.occasion}</h3>
            <p>{outfit.description}</p>
            <p>{outfit.when}</p>
          </div>
        </div>
      );
    });

    return (
      <div
        ref={this.scrollContainerRef}
        className="scroll-container"
        onScroll={this.handleScroll}
      >
        <header>
          <h1>Your latest outfits</h1>
          <h2>Styled by Shaunie</h2>
        </header>

        {outfitsToRender}
      </div>
    );
  }
}

export default Scroller;
