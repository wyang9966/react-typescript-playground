/**
 * ╔══════════════════════════════════════╗
 * ║  ✅ EDITABLE - EDIT THIS FILE ✅      ║
 * ╚══════════════════════════════════════╝
 */

import { useState, useEffect } from "react";

// ==================== BUG 1: Infinite Loop ====================
export function SearchBug() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // 🔴 TODO: Fix infinite requests when typing
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then(res => res.json())
            .then(data => setResults(data.products));
    }, [query]);

    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products..."
            />
            <p>Results: {results.length}</p>
        </div>
    );
}

// ==================== BUG 2: Stale Closure ====================
export function CounterBug() {
    const [count, setCount] = useState(0);

    // 🔴 TODO: Fix timer stuck at 0 (classic stale closure)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <h2>Timer: {count}s</h2>;
}

// ==================== BUG 3: Missing Cleanup ====================
export function MouseTrackerBug() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // 🔴 TODO: Add proper cleanup to prevent memory leak
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMove);

        return () => {
            removeEventListener("mousemove", handleMove);
        }
    }, []);

    return <p>Mouse Position: ({position.x}, {position.y})</p>;
}

// ==================== BUG 4: Race Condition ====================
export function UserSwitcherBug({ userId }: { userId: number }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // 🔴 TODO: Use AbortController so only latest request wins
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`{
            signal: controller.signal
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                if(err.name !== "AbortError") {
                    setLoading(false);
                }
            })
            return() => controller.abort();

    }, [userId]);

    return (
        <div>
            {loading ? <p>Loading user...</p> : <p>User: {user?.name}</p>}
        </div>
    );
}