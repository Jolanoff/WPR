import React, { useEffect, useState } from "react";
import api from "../api";

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/blog");
                setPosts(response.data);
            } catch (err) {
                setError("Fout bij het laden van de blogposts");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const toggleExpand = (id) => {
        setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog & Tips</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="rounded-md w-full h-40 object-cover mb-3"
                            />
                        )}
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-600 text-sm">
                            Gepubliceerd op {new Date(post.createdAt).toLocaleDateString("nl-NL")}
                        </p>
                        <div className={`text-gray-700 break-words ${expandedPosts[post.id] ? "max-h-none" : "max-h-32 overflow-hidden"}`}>
                            {post.content}
                        </div>
                        {post.content.length > 100 && (
                            <button
                                onClick={() => toggleExpand(post.id)}
                                className="mt-2 text-blue-500 hover:underline"
                            >
                                {expandedPosts[post.id] ? "Toon minder" : "Lees meer"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogPage;
