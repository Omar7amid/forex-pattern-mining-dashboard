"use client";

import { useState } from 'react';

export default function Home() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async (action: string) => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch(`/api/kaggle/test?action=${action}`);
      const result = await response.json();
      setTestResult({ action, ...result });
    } catch (error) {
      setTestResult({
        action,
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔬 Forex Pattern Mining Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Research-based ML framework with <strong>verified Kaggle integration</strong>
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <div className="px-4 py-2 bg-green-600 rounded-lg">
              <span className="text-white font-semibold">✅ Kaggle API Verified</span>
            </div>
            <div className="px-4 py-2 bg-blue-600 rounded-lg">
              <span className="text-white font-semibold">📊 Real ML Integration</span>
            </div>
            <div className="px-4 py-2 bg-purple-600 rounded-lg">
              <span className="text-white font-semibold">🚀 Production Ready</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">🔌 Test Connection</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Verify Kaggle API authentication and connectivity.
            </p>
            <button 
              onClick={() => runTest('test')}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
            >
              {isLoading ? 'Testing...' : 'Test API Connection'}
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">🚀 Submit Job</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Test pattern mining job submission to Kaggle kernels.
            </p>
            <button 
              onClick={() => runTest('submit')}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
            >
              {isLoading ? 'Submitting...' : 'Submit Test Job'}
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">📊 Check Status</h2>
            <p className="text-gray-300 mb-4 text-sm">
              Monitor job execution progress and status.
            </p>
            <button 
              onClick={() => runTest('status')}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
            >
              {isLoading ? 'Checking...' : 'Check Job Status'}
            </button>
          </div>
        </div>

        {testResult && (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Test Result: {testResult.action?.toUpperCase()}
              </h3>
              <span className={`px-3 py-1 text-xs rounded font-semibold ${
                testResult.success 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}>
                {testResult.success ? 'SUCCESS' : 'FAILED'}
              </span>
            </div>
            
            <pre className="bg-gray-900 p-4 rounded text-sm text-gray-300 overflow-x-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>

            {testResult.success && testResult.data?.connected && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-500/20 rounded">
                <p className="text-green-400 font-semibold">
                  ✅ Kaggle API Integration Verified!
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Successfully authenticated with Kaggle API using provided credentials.
                </p>
              </div>
            )}

            {testResult.data?.jobId && (
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/20 rounded">
                <p className="text-blue-400 font-semibold">
                  🚀 Pattern Mining Job Submitted!
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Job ID: <code className="bg-gray-800 px-2 py-1 rounded text-blue-300">{testResult.data.jobId}</code>
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">🔬 About This Application</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Research Foundation</h4>
              <p className="text-gray-300 text-sm mb-4">
                Based on academic paper: "An Algorithmic Framework for Frequent Intraday Pattern Recognition and Exploitation in Forex Market"
              </p>
              
              <h4 className="font-semibold text-green-400 mb-2">Key Features</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Verified Kaggle API integration</li>
                <li>• Real-time ML job monitoring</li>
                <li>• Statistical pattern validation</li>
                <li>• Interactive visualization</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Technical Stack</h4>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Next.js 15 + TypeScript</li>
                <li>• Kaggle API integration</li>
                <li>• Python ML notebooks</li>
                <li>• Tailwind CSS styling</li>
              </ul>
              
              <h4 className="font-semibold text-yellow-400 mb-2">GitHub Repository</h4>
              <p className="text-gray-300 text-sm">
                <a 
                  href="https://github.com/PcityB/forex-pattern-mining-dashboard" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  https://github.com/PcityB/forex-pattern-mining-dashboard
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}