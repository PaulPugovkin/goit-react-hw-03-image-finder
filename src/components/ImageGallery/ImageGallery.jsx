import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ hits }) => {
    return (
        <ul className="ImageGallery">
            {hits.map(hit => (
                <ImageGalleryItem
                    key={hit.id}
                    src={hit.webformatURL}
                    alt={hit.id}
                />
            ))}
        </ul>
    );
};

export default ImageGallery;
