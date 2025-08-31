'use client'

import { useState } from 'react'
import { Camera, Upload, Eye } from 'lucide-react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [context, setContext] = useState('')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setAnalysis(null)
        // Don't navigate automatically - let user analyze the image first
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage, context }),
      })
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error('Error analyzing image:', error)
      setAnalysis('Error analyzing image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearContext = () => {
    setContext('')
  }

  const clearImage = () => {
    setSelectedImage(null)
    setAnalysis(null)
    setContext('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-2xl text-white">
            PIXEL SAGE 
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl opacity-95 font-light text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Upload an image and get AI-powered analysis and insights
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {/* Image Upload Section */}
          <div className="bg-pink-500/20 shadow-2xl backdrop-blur-xl rounded-3xl border border-pink-300/30 p-6 md:p-8 transition-all duration-500 hover:bg-pink-500/25 hover:scale-[1.02]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">📸 Upload Your Image</h2>
            <div className="space-y-6">
              <label className="flex flex-col items-center justify-center w-full h-72 md:h-80 border-2 border-pink-300/50 border-dashed rounded-2xl cursor-pointer hover:bg-pink-300/15 hover:border-pink-300/70 transition-all duration-300 group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-56 md:max-h-64 max-w-full rounded-2xl shadow-2xl transition-all duration-500 opacity-100 hover:scale-105"
                    />
                  ) : (
                    <>
                      <Upload className="w-16 h-16 md:w-20 md:h-20 mb-4 text-white/90 group-hover:text-pink-200 transition-all duration-300 group-hover:scale-110" />
                      <p className="mb-3 text-lg md:text-xl text-white/90 font-medium">
                        <span className="font-bold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm md:text-base text-white/70">PNG, JPG or JPEG</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  aria-label="Upload image"
                />
              </label>
              
              {/* Chat-like Context Input */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <span className="text-white/80 font-medium">Ask me about your image...</span>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  <textarea
                    className="w-full bg-transparent text-white placeholder-white/50 focus:outline-none resize-none text-lg leading-relaxed"
                    rows={4}
                    placeholder="Describe what you see, ask questions, or share your thoughts about this image..."
                    value={context}
                    onChange={e => setContext(e.target.value)}
                    aria-label="Image context"
                  />
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/20">
                    <span className="text-white/60 text-sm">Your message will help me understand your image better</span>
                    <button 
                      onClick={clearContext}
                      className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              
              {selectedImage && (
                <div className="space-y-3">
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-4 rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 focus:ring-4 focus:ring-purple-300/50 hover:scale-105 disabled:scale-100 shadow-2xl"
                    aria-busy={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    ) : (
                      <Eye size={24} />
                    )}
                    <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Image ✨'}</span>
                  </button>
                  
                  <button
                    onClick={clearImage}
                    className="w-full flex items-center justify-center space-x-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  >
                    🗑️ Clear Image & Start Over
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-indigo-500/20 shadow-2xl backdrop-blur-xl rounded-3xl border border-indigo-300/30 p-6 md:p-8 transition-all duration-500 hover:bg-indigo-500/25 hover:scale-[1.02]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">🔍 AI Analysis Results</h2>
            {analysis ? (
              <div className="bg-indigo-600/40 rounded-2xl p-6 md:p-8 animate-fade-in border border-indigo-300/20">
                <p className="text-white leading-relaxed whitespace-pre-line text-lg">{analysis}</p>
              </div>
            ) : selectedImage ? (
              <div className="text-center text-white/80 py-16 md:py-20">
                <Eye size={64} className="mx-auto mb-6 text-white/60" />
                <p className="text-lg md:text-xl max-w-md mx-auto">
                  Click "Analyze Image" to get AI-powered insights about your uploaded image!
                </p>
              </div>
            ) : (
              <div className="text-center text-white/80 py-16 md:py-20">
                <Camera size={64} className="mx-auto mb-6 text-white/60" />
                <p className="text-lg md:text-xl max-w-md mx-auto">
                  Upload an image and ask questions to get AI-powered analysis and insights!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 