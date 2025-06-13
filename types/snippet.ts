export type Snippet = {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  isPublic: true;
  author: {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
  };
  comments: [];
  upvotes: number;
  downvotes: number;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

// Mock data for snippets
//   const [snippets, setSnippets] = useState([
//     {
//       id: "1",
//       title: "React Custom Hook for API Calls",
//       description:
//         "A reusable custom hook for handling API requests with loading states and error handling",
//       language: "TypeScript",
//       code: `import { useState, useEffect } from 'react';

// const useApi = <T>(url: string) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch');
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// };

// export default useApi;`,
//       author: {
//         name: "John Doe",
//         avatar: "/placeholder.svg",
//       },
//       isPrivate: false,
//       votes: 24,
//       comments: 5,
//       createdAt: "2 days ago",
//       tags: ["react", "typescript", "hooks", "api"],
//     },
//     {
//       id: "2",
//       title: "Python Data Visualization",
//       description:
//         "Beautiful charts with matplotlib and seaborn for data analysis",
//       language: "Python",
//       code: `import matplotlib.pyplot as plt
// import seaborn as sns
// import pandas as pd
// import numpy as np

// # Set the style
// plt.style.use('seaborn-v0_8')
// sns.set_palette("husl")

// # Create sample data
// np.random.seed(42)
// data = {
//     'x': np.random.randn(100),
//     'y': np.random.randn(100) * 2 + 1,
//     'category': np.random.choice(['A', 'B', 'C'], 100)
// }
// df = pd.DataFrame(data)

// # Create the plot
// fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

// # Scatter plot
// sns.scatterplot(data=df, x='x', y='y', hue='category', ax=ax1)
// ax1.set_title('Scatter Plot by Category')

// # Box plot
// sns.boxplot(data=df, x='category', y='y', ax=ax2)
// ax2.set_title('Distribution by Category')

// plt.tight_layout()
// plt.show()`,
//       author: {
//         name: "Sarah Chen",
//         avatar: "/placeholder.svg",
//       },
//       isPrivate: false,
//       votes: 18,
//       comments: 3,
//       createdAt: "1 week ago",
//       tags: ["python", "matplotlib", "seaborn", "data-viz"],
//     },
//     {
//       id: "3",
//       title: "CSS Grid Layout Template",
//       description: "Responsive grid layout with modern CSS Grid properties",
//       language: "CSS",
//       code: `.container {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   grid-gap: 2rem;
//   padding: 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
// }

// .card {
//   background: white;
//   border-radius: 12px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
//   transition: transform 0.2s ease, box-shadow 0.2s ease;
// }

// .card:hover {
//   transform: translateY(-4px);
//   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
// }

// .card h3 {
//   margin: 0 0 1rem 0;
//   color: #2d3748;
//   font-size: 1.25rem;
//   font-weight: 600;
// }

// .card p {
//   color: #718096;
//   line-height: 1.6;
//   margin: 0;
// }

// @media (max-width: 768px) {
//   .container {
//     grid-template-columns: 1fr;
//     padding: 1rem;
//     grid-gap: 1rem;
//   }
// }`,
//       author: {
//         name: "Mike Johnson",
//         avatar: "/placeholder.svg",
//       },
//       isPrivate: true,
//       votes: 12,
//       comments: 2,
//       createdAt: "3 days ago",
//       tags: ["css", "grid", "responsive", "layout"],
//     },
//   ]);

// Initialize dark mode
