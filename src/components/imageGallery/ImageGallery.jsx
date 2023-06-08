import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { ImageGalleryUl, Container } from './ImageGallery.styled';
import { fetchGalleryImg } from '../../Api/fetchGalleryImg';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
    hiddenBnt: false,
  };

  onFindMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
      hiddenBnt: false,
    }));

    // Микрозадача => в макрозадачу
    // setTimeout(() => {
    //   fetchGalleryImg(this.props.searchQuery, this.state.page)
    //     .then(({ hits, totalHits }) => {
    //       if (hits.length === 0) {
    //         toast.error(
    //           'Sorry, there are no more images matching your search query. Please try again.'
    //         );
    //         this.setState({ hiddenBnt: true });
    //       } else
    //         this.setState(prevState => ({
    //           images: [...prevState.images, ...hits],
    //         }));
    //       if (12 * this.state.page > totalHits) {
    //         this.setState({ hiddenBnt: true });
    //         toast.error(
    //           'Sorry, there are no more images matching your search query.'
    //         );
    //       }
    //     })
    //     .catch(error => this.setState({ error }))
    //     .finally(() => this.setState({ loading: false }));
    // });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true, images: null, page: 1, hiddenBnt: false });

      // Микрозадача => в макрозадачу
      setTimeout(() => {
        fetchGalleryImg(this.props.searchQuery, this.state.page)
          .then(({ hits }) => {
            if (hits.length === 0) {
              toast.error(
                'Sorry, there are no images matching your search query. Please try again.'
              );
            } else this.setState({ images: hits });
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      });
    }
  }

  render() {
    return (
      <Container>
        {this.state.loading && <Loader />}

        {this.state.images && (
          <ImageGalleryUl>
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  showModal={() => this.props.showModal(image.largeImageURL)}
                  key={image.id}
                  smallImg={image.webformatURL}
                  alt={image.tags}
                />
              );
            })}
          </ImageGalleryUl>
        )}
        {this.state.images && this.state.hiddenBnt === false && (
          <Button onFindMore={() => this.onFindMore()} />
        )}
      </Container>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
