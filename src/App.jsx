import React, {useEffect, useState} from "react";
import SkeletonCard from "./components/SkeletonCard.jsx";
import Card from "./components/Card.jsx";

export default function App() {
    const [rssUrl, setRssUrl] = useState("");
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [urlError, setUrlError] = useState(null);
    useEffect(() => {
        const storedUrl = localStorage.getItem("rssUrl");
        if (storedUrl) {
            setRssUrl(storedUrl);
            (async () => {
                await fetchData(storedUrl);
            })();
        }
    }, []);


    async function fetchData(url) {
        const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

        if (!urlRegex.test(url)) {
            setUrlError("Invalid RSS URL. Please check the format.");
            return;
        }

        setUrlError(null);
        setIsLoading(true);
        localStorage.setItem("rssUrl", url);

        try {
            const res = await fetch(`https://api.allorigins.win/get?url=${url}`);
            const {contents} = await res.json();
            const feed = new window.DOMParser().parseFromString(contents, "text/xml");
            const items = feed.querySelectorAll("item");
            const feedItems = [...items].map((el) => {
                const link = el.querySelector("link")?.innerHTML || 'Link unavailable';
                const title = el.querySelector("title")?.innerHTML || 'Title unavailable';
                const description = el.querySelector("description")?.innerHTML || 'Description unavailable';
                const image = el.querySelector("[medium='image']")?.getAttribute('url') || null;

                if (!link || !title) {
                    return null; // Exclude if mandatory elements are missing
                }

                return { link, title, description, image };
            }).filter(Boolean);

            setItems(feedItems);
        } catch (error) {
            setErrorMessage("Error fetching RSS feed. Please try again.");
            setItems([]);
            console.error('Error fetching RSS', error);

        } finally {
            console.log('finally');
            setIsLoading(false);
        }
    }

    const getRss = async (e) => {
        e.preventDefault();
        await fetchData(rssUrl);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-4">My RSS Reader</h1>
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p>{errorMessage}</p>
                </div>
            )}

            <form onSubmit={getRss} className="flex flex-col gap-4 mb-8">
                <div>
                    <label htmlFor="rss-url" className="block text-gray-700 mb-2">RSS URL</label>
                    <input
                        id="rss-url"
                        type="text"
                        onChange={(e) => setRssUrl(e.target.value)}
                        value={rssUrl}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {urlError && (
                        <p className="text-red-600 mt-2">{urlError}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Fetch Feed
                </button>
            </form>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                        <Card
                            key={item.link}
                            title={item.title}
                            description={item.description}
                            link={item.link}
                            image={item.image}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
