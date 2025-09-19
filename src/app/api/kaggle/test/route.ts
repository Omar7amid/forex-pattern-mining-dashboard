// Test endpoint for verified Kaggle API integration

import { NextRequest, NextResponse } from 'next/server';
import { KaggleApiClient } from '@/lib/kaggle-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'test';

  // Use verified working credentials
  const username = 'netszy';
  const apiKey = '60a515ec7742c89c180861c1ec823493';

  try {
    const client = new KaggleApiClient(username, apiKey);

    if (action === 'test') {
      console.log('Testing Kaggle API connection...');
      const isConnected = await client.testConnection();
      
      return NextResponse.json({
        success: true,
        data: {
          connected: isConnected,
          username: username,
          message: isConnected ? 'Kaggle API connection successful!' : 'Kaggle API connection failed',
          timestamp: new Date().toISOString()
        }
      });
    }

    if (action === 'submit') {
      console.log('Testing job submission...');
      const mockParams = {
        currencyPair: { base: 'EUR', quote: 'USD', symbol: 'EURUSD' },
        timeFrame: { value: '1h', label: '1 Hour', minutes: 60 },
        windowSize: 20,
        minSupport: 0.05,
        minConfidence: 0.7,
        dataPoints: 5000
      };

      const result = await client.submitPatternMiningJob(mockParams);
      
      return NextResponse.json({
        success: true,
        data: {
          jobId: result.jobId,
          message: 'Test job submitted successfully!',
          parameters: mockParams
        }
      });
    }

    if (action === 'status') {
      const jobId = searchParams.get('jobId') || 'test-job-id';
      const status = await client.getJobStatus(jobId);
      
      return NextResponse.json({
        success: true,
        data: status
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action. Use: test, submit, or status'
    }, { status: 400 });

  } catch (error) {
    console.error('Kaggle API test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}