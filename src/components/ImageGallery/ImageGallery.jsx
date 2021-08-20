import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ hits, onImageClick }) => {
    return (
        <ul className="ImageGallery">
            {hits.map(hit => (
                <ImageGalleryItem
                    largeImage={hit.largeImageURL}
                    key={hit.id}
                    src={hit.webformatURL}
                    alt={hit.tags}
                    onImageClick={onImageClick}
                />
            ))}
        </ul>
    );
};

export default ImageGallery;
