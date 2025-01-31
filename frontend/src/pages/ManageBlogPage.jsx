import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuthStore } from "../store/authStore";

function ManageBlog() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const { userRoles } = useAuthStore();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get("/blog");
            setPosts(response.data);
        } catch (error) {
            console.error("Fout bij het laden van posts", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/blog", { title, content, imageUrl, isPublished, author: "Admin" });
            fetchPosts();
            setTitle("");
            setContent("");
            setImageUrl("");
            setIsPublished(false);
        } catch (error) {
            console.error("Fout bij het maken van post", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Weet je zeker dat je deze post wilt verwijderen?")) {
            await api.delete(`/blog/${id}`);
            fetchPosts();
        }
    };

    if (!userRoles.includes("FrontOfficeMedewerker")) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-red-500">
                    🚫 Je hebt geen toegang tot deze pagina.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">📌 Beheer Blogposts</h1>

            {/* Form for Creating Blog Posts */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">📝 Nieuwe Blogpost</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Titel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        placeholder="Inhoud"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md h-32 focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Afbeelding URL (optioneel)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <label className="text-gray-700">Publiceren</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        ✨ Plaatsen
                    </button>
                </form>
            </div>

            {/* Display Existing Blog Posts */}
            <h2 className="text-2xl font-semibold mb-4">📜 Bestaande Posts</h2>
            {posts.length === 0 ? (
                <p className="text-gray-500">Er zijn nog geen blogposts.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white shadow-lg rounded-lg p-5 relative">
                            {post.imageUrl && (
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="rounded-md w-full h-40 object-cover mb-3"
                                />
                            )}
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-600">
                                Gepubliceerd op {new Date(post.createdAt).toLocaleDateString("nl-NL")}
                            </p>
                            <p className="text-gray-700 break-words line-clamp-4">
                                {post.content.length > 100
                                    ? `${post.content.slice(0, 100)}...`
                                    : post.content}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className={`px-2 py-1 text-sm rounded-md ${post.isPublished ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                                    {post.isPublished ? "Gepubliceerd" : "Concept"}
                                </span>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    🗑 Verwijderen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManageBlog;
