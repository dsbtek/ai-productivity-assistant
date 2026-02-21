// components/ui/email-summarizer.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function EmailSummarizer() {
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/email/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Paste your email here..."
            value={email}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmail(e.target.value)}
            rows={6}
          />
          <Button type="submit" disabled={loading || !email}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Summarize
          </Button>
        </form>

        {summary && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p>{summary.summary}</p>
            </div>

            {summary.keyPoints && (
              <div>
                <h3 className="font-semibold mb-2">Key Points</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {summary.keyPoints.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {summary.sentiment && (
              <div className="text-sm text-muted-foreground">
                Sentiment: {summary.sentiment}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}