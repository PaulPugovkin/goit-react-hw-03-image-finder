const ImageGalleryItem = ({ src, alt, id }) => {
    return (
        <>
            <li className="ImageGalleryItem" key={id}>
                <img
                    src={src}
                    alt={alt}
                    width="300"
                    height="300"
                    className="ImageGalleryItem-image"
                />
            </li>
        </>
    );
};

export default ImageGalleryItem;
