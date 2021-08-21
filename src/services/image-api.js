export const fetchOptions = {
    API_KEY: '22215457-d2e131747f34337528d5fbfaa',
    MAIN_URL: 'https://pixabay.com/api/',
    PAGE: 1,
    ITEMS_PER_PAGE: 12,
};

async function fetchImages(value) {
    const fetching = await fetch(
        `${fetchOptions.MAIN_URL}?key=${fetchOptions.API_KEY}&q=${value}&page=${fetchOptions.PAGE}&image_type=photo&orientation=horizontal&per_page=${fetchOptions.ITEMS_PER_PAGE}`,
    );
    const result = await fetching.json();
    return result;
}

export default fetchImages;
