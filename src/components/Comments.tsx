"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  replies: Comment[];
}

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");

  // Load comments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`comments-${postSlug}`);
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, [postSlug]);

  // Save comments to localStorage
  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem(`comments-${postSlug}`, JSON.stringify(newComments));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
      replies: [],
    };

    saveComments([newComment, ...comments]);
    setAuthor("");
    setContent("");
  };

  const handleReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyAuthor.trim() || !replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: replyAuthor.trim(),
      content: replyContent.trim(),
      date: new Date().toISOString(),
      replies: [],
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyTo(null);
    setReplyAuthor("");
    setReplyContent("");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Comments ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})
      </h2>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Leave a comment
          </h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Write your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comment list */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="py-8 text-center text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {comment.author}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(comment.date)}
                  </p>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-gray-700">
                {comment.content}
              </p>
              <button
                onClick={() =>
                  setReplyTo(replyTo === comment.id ? null : comment.id)
                }
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                {replyTo === comment.id ? "Cancel" : "Reply"}
              </button>

              {/* Reply form */}
              {replyTo === comment.id && (
                <form
                  onSubmit={(e) => handleReply(e, comment.id)}
                  className="mt-4 border-t border-gray-100 pt-4"
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      placeholder="Write your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      required
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    Post Reply
                  </button>
                </form>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 border-l-2 border-primary-100 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="pt-2">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                          {reply.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {reply.author}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(reply.date)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
