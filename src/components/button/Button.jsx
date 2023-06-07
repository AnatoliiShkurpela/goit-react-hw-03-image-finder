import React, { Component } from 'react';
import { ButonLoadMore } from './Button.styled';

export class Button extends Component {
  render() {
    return (
      <ButonLoadMore
        onClick={this.props.onFindMore}
        type="button"
      >
        Load more
      </ButonLoadMore>
    );
  }
}
