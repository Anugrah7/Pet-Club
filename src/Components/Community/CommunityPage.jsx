import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { createPostAPI, getAllPostsAPI, postCommentAPI } from '../../../Services/allAPI';

function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState({});  // State to store new comments for each post
  const [loading, setLoading] = useState(false);

  // Fetch all community posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPostsAPI();
        if (response?.status === 200) {
          setPosts(response.data);
        } else {
          console.error('Error fetching posts:', response);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async () => {
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      const response = await createPostAPI({ question: newPost });

      if (response?.status === 201) {
        setPosts([response.data, ...posts]); // Add new post to top
        setNewPost(''); // Clear input field
      } else {
        console.error('Failed to create post:', response);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    try {
      const response = await postCommentAPI(postId, { text: commentText });

      if (response?.status === 201) {
        // Update the comments for the specific post
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, comments: response.data.comments } : post
        );
        setPosts(updatedPosts); // Set the updated posts with new comment
        setNewComment((prev) => ({ ...prev, [postId]: '' })); // Clear comment input for this post
      } else {
        console.error('Failed to add comment:', response);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-[15%] flex-1 container mx-auto p-6">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Community Forum</h2>

          {/* New Post Section */}
          <div className="mb-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              rows="4"
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <button
              className="mt-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
              onClick={handlePostSubmit}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>

          {/* Posts Section */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="mb-2">
                    <span className="font-bold text-indigo-600">{post.owner?.username || 'Anonymous'}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{post.question}</p>

                  {/* Display Comments (Replies) */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700">Replies:</h3>
                    <div className="space-y-2 mt-2">
                      {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                          <div key={comment._id} className="p-2 bg-gray-100 rounded-lg">
                            <p className="text-sm text-amber-600">{comment.owner?.username || 'Anonymous'}</p>
                            <span className="text-sm text-gray-400 ml-2">
                            {new Date(post.createdAt).toLocaleString()}
                          </span>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No replies yet.</p>
                      )}
                    </div>

                    {/* Add a new comment */}
                    <div className="mt-4">
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        rows="3"
                        placeholder="Add a reply..."
                        value={newComment[post._id] || ''}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [post._id]: e.target.value,
                          }))
                        }
                      ></textarea>
                      <button
                        className="mt-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
                        onClick={() => handleCommentSubmit(post._id)}
                        disabled={loading}
                      >
                        {loading ? 'Replying...' : 'Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No posts yet. Be the first to ask a question!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;