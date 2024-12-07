const fetch = require('node-fetch');

// Fetch fashion news
async function fetchFashionNews() {
    const apiKey = "###";
    const baseUrl = "https://newsapi.org/v2/everything";
    const query = "fashion";
    const url = `${baseUrl}?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const newsData = await response.json();
            return newsData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching fashion news:", error);
        return null;
    }
}

// Filter fashion news
function filterFashionNews(newsData) {
    const keywords = ["fashion"];
    const filteredNews = [];

    newsData.articles.forEach(article => {
        if (keywords.some(keyword => (article.title + " ").toLowerCase().includes(keyword))) {
            filteredNews.push(article);
        }
    });

    return filteredNews.slice(0, 4);
}

// Update HTML elements with news data
function updateNewsElements(fashionNews) {
    fashionNews.forEach((article, index) => {
        document.getElementById(`title${index + 1}`).textContent = article.title;
        document.getElementById(`news-url${index + 1}`).textContent = article.url;
        document.getElementById(`news-url${index + 1}`).href = article.url;
    });
}

// Main function to fetch and display news
async function main() {
    const newsData = await fetchFashionNews();
    if (newsData) {
        const fashionNews = filterFashionNews(newsData);
        updateNewsElements(fashionNews);
    }
}

// Run the main function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);
