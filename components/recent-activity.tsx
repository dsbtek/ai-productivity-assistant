import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity({ userId }: any) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <p>Activity timeline not fully implemented.</p>
                </div>
            </CardContent>
        </Card>
    );
}
