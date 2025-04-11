const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/))([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match && match[1];
};

export default getYouTubeVideoId;