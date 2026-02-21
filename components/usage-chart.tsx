"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function UsageChart({ data }: any) {
    const chartData = data
        .map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            tokens: item.tokensUsed,
        }))
        .reverse();

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Token Usage (last 30 days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip />
                            <Bar dataKey="tokens" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
