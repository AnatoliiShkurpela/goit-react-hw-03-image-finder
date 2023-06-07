import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemLi } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <ImageGalleryItemLi onClick={this.props.showModal}>
        <img src={this.props.smallImg} alt={this.props.alt} />
      </ImageGalleryItemLi>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

