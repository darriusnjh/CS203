"use client"

import { useState, useEffect } from "react"

export default function TestForumPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Test page useEffect triggered')
    const fetchData = async () => {
      try {
        console.log('Fetching categories...')
        const response = await fetch('http://localhost:8080/api/forum/categories')
        console.log('Response:', response.status, response.statusText)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const result = await response.json()
        console.log('Data received:', result)
        setData(result)
      } catch (err: any) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Forum API Test</h1>
      
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          <p>Loading...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}
      
      {data && (
        <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
          <p className="text-green-800">Success! Received data:</p>
          <pre className="mt-2 text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      
      <button
        onClick={async () => {
          try {
            console.log('Manual test button clicked')
            const response = await fetch('http://localhost:8080/api/forum/categories')
            const result = await response.json()
            console.log('Manual fetch result:', result)
            alert('Check console for results')
          } catch (err) {
            console.error('Manual fetch error:', err)
            alert('Error: ' + err)
          }
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Manual Test
      </button>
    </div>
  )
}
