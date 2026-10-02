import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
  setPosts: (posts) => set({posts}),
  addComment: (postId, Comment) => set(state => ({
    posts: state.posts.map(post => {
      if(post.id == postId){
        return {
          ...post,
          comments: [...post.comments,Comment]
        }
      }
      return post;
    })
  }))
}));

export default usePostStore;