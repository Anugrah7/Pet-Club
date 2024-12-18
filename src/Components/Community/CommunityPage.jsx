import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'Does anyone have tips for training a stubborn puppy?',
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'What’s the best food for senior cats? Any recommendations?',
      time: '1 day ago',
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: posts.length + 1,
        author: 'You',
        content: newPost,
        time: 'Just now',
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 mr-1">
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
              className="mt-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>

          {/* Posts Section */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="mb-2">
                  <span className="font-bold text-indigo-600">{post.author}</span>
                  <span className="text-sm text-gray-500 ml-2">{post.time}</span>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
