import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { getAllPostsAPI } from '../../../Services/allAPI';

function CommunitySection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPostsAPI();

        // Validate response before setting state
        if (response?.status === 200 && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold">Community Updates</h2>
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{post.question}</p> {/* FIXED: Correct field */}
              <p className="text-xs text-gray-500 mt-1">
                Posted by: <span className="font-semibold">{post.owner?.username || 'Anonymous'}</span> {/* FIXED: Owner name */}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default CommunitySection;
