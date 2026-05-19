/**
 * ╔══════════════════════════════════════╗
 * ║  ✅ useEffect MASTERY LAB ✅          ║
 * ╚══════════════════════════════════════╝
 */

import { useState, useEffect, useRef } from "react";

// =============================================
// EXERCISE 1: Basic Mounting + Cleanup
// =============================================
export function WindowSizeTracker() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // TODO: Track window resize + cleanup listener
  useEffect(() => {
    const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
        window.removeEventListener("resize", handleResize)
    }

  }, []);

  return <p>Window Size: {size.width} x {size.height}</p>;
}

// =============================================
// EXERCISE 2: Timer with Proper Cleanup
// =============================================
export function LiveClock() {
  const [time, setTime] = useState(new Date());

  // TODO: Update every second + cleanup interval
  useEffect(() => {
    const interval = setInterval(() => {
        setTime(new Date())
    }, 1000)

    return () => clearInterval(interval);
    
  }, []);

  return <h2>Current Time: {time.toLocaleTimeString()}</h2>;
}

// =============================================
// EXERCISE 3: Search with Debounce + Race Condition
// =============================================
export function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // TODO: 
  // 1. Debounce the search (don't fetch on every keystroke)
  // 2. Use AbortController to cancel previous requests
  useEffect(() => {
    abortRef.current?.abort();

    if(!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal
    })
    .then((res) => res.json())
    .then((data) => {
        setResults(data.products || [])
        setLoading(false)
    })
    .catch((err) => {
        if(err.name !== "AbortError") {
           console.log(err)
            setLoading(false);
        }
    });

    return () => controller.abort();
    
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {loading && <p>Searching...</p>}
      <ul>
        {results.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

// =============================================
// EXERCISE 4: Multi-fetch with Dependencies
// =============================================
export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Fetch user + their posts when userId changes
  // Bonus: Use Promise.all and proper loading state
  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();

    // Fetch user + posts in parallel
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal: controller.signal }),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { signal: controller.signal })
    ])
    .then(async ([userRes, postRes]) => {
        const userData = await userRes.json()
        const postsData = await postRes.json()

        setUser(userData)
        setPosts(postsData)
    })
    .catch((err) => {
        if(err.name !== "AbortError") console.log(err);
    })
    .finally(() => setLoading(false))

    return controller.abort();
  }, [userId]);

  if (loading) return <p>Loading user profile...</p>;

  return (
    <div>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
      <h4>Posts: {posts.length}</h4>
    </div>
  );
}

// =============================================
// EXERCISE 5: Advanced - Chat Simulation
// =============================================
export function ChatSimulator() {
  // TODO: 
  // 1. Simulate incoming messages every 1.5s when connected
  // 2. Cleanup interval when component unmounts or disconnected
  // 3. Log "Chat disconnected" on cleanup
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  // Fixed: Use ReturnType or number for setInterval in browser
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isConnected) {
      intervalRef.current = window.setInterval(() => {
        const newMessage = `New message at ${new Date().toLocaleTimeString()}`;
        setMessages(prev => [...prev, newMessage].slice(-10));
      }, 1500) as unknown as number;
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        console.log("Chat disconnected (cleanup)");
      }
    };
  }, [isConnected]);
  return (
    <div>
      <button onClick={() => setIsConnected(!isConnected)}>
        {isConnected ? "Disconnect" : "Connect"}
      </button>
      <div style={{ height: "300px", overflow: "auto", border: "1px solid gray" }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}