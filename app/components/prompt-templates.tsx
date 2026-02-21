// components/prompt-templates.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Copy } from 'lucide-react';

export function PromptTemplates() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    const response = await fetch('/api/prompts');
    const data = await response.json();
    setPrompts(data);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prompt Templates</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setCategory}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value={category} className="space-y-4">
            {prompts
              .filter(p => category === 'all' || p.category === category)
              .map(prompt => (
                <div key={prompt.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{prompt.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(prompt.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{prompt.content}</p>
                  <div className="mt-2 flex gap-2">
                    {prompt.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}